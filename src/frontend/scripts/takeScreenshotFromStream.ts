let ImageCapture: NodeRequire; 

if (typeof window !== 'undefined') {
ImageCapture = require("image-capture");
} 

export async function takeScreenshotFromMediaStream(previewStream: MediaStream,) {
  const track = previewStream?.getVideoTracks()[0];
  console.log(Object.keys(ImageCapture));
  if (ImageCapture) {
  let imageCapture = new ImageCapture(track);
  console.log(imageCapture);
  const processPhoto = (blob: Blob) => {
    return window.URL.createObjectURL(blob);
  }
  return await imageCapture.takePhoto().then(processPhoto);
  }

}