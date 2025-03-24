export async function getWebcamCapabilities() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === "videoinput");

    if (videoDevices.length === 0) {
      console.log("No video input devices found");
      return null;
    }

    for (const deviceInfo of videoDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceInfo.deviceId } },
      });

      const videoTrack = stream.getVideoTracks()[0];

      const capabilities = videoTrack.getCapabilities();

      console.log(`Camera: ${deviceInfo.label}`);

      if (capabilities) {
        if (capabilities.width) {
          console.log(`Width range: ${capabilities.width.min} - ${capabilities.width.max}`);
        }

        if (capabilities.height) {
          console.log(`Height range: ${capabilities.height.min} - ${capabilities.height.max}`);
        }

        if (capabilities.frameRate) {
          console.log(`Frame rate range: ${capabilities.frameRate.min} - ${capabilities.frameRate.max}`);
        }
      } else {
        console.log("This browser doesn't support getCapabilities()");
      }

      stream.getTracks().forEach((track) => track.stop());
    }
  } catch (error) {
    console.error("Error getting webcam capabilities:", error);
  }
}
