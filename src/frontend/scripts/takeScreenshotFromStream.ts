export async function loadImageCapture() {
  if (typeof window !== 'undefined') {
    const ImageCapture = require("image-capture");
    return ImageCapture;
  }
}

export async function takeScreenshotFromMediaStream(previewStream: MediaStream, ImageCapture: any) {
  const track = previewStream?.getVideoTracks()[0];
  if (typeof window !== 'undefined') {
    let imageCapture = new ImageCapture(track);
    console.log(imageCapture);
    const processPhoto = (blob: Blob) => {
      return window.URL.createObjectURL(blob);
    }
    return await imageCapture.takePhoto().then(processPhoto);
  }
}