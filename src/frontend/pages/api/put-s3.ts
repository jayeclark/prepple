// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from "formidable"
import fs from 'fs'
import { s3 } from "../../scripts/s3"

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  let parsedFiles;
  const data: { err: Error, fields: formidable.Fields, files: formidable.Files} = await new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, fields, files) => {
      parsedFiles = files;
      if (err) reject({ err })
      resolve({ err, fields, files })
    })
  })
  
  const file = await data.files.file;
  const { id } = req.query;
  const timestamp = new Date(Date.now()).getTime();
  const key = id + "-" + timestamp + ".mp4";

  try {
    const response = await s3.putObject({ 
      Bucket: 'mydevinterview-videos',
      Key: key,
      Body: fs.createReadStream((file as formidable.File).filepath),
      ContentType: 'audio/mpeg'
    }).promise()
    res.send({ response, filename: key });
  } catch (e) {
    console.error(e);
  }

}
