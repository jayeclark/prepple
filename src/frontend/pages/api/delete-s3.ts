// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { s3 } from "../../scripts/s3"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const { authorization } = req.headers
  const { key } = req.query
  try {
    const response = await s3.deleteObject({ 
      Bucket: 'mydevinterview-videos',
      Key: key as string,
    }).promise()
    res.send({ response, deleted: key });
  } catch (e) {
    console.error(e);
  }

}
