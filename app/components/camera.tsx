import React, { useState, useRef } from "react";
import { Camera, CameraType } from "react-camera-pro";

const CameraComponent = () => {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<any>(null); // TODO: strictly type

  const errorMessages = {
    noCameraAccessible:
      "No camera device accessible. Please connect a camera or try a different browser.",
    permissionDenied:
      "Permission denied. Please refresh and give camera permissions.",
    switchCamera:
      "It is not possible to switch camera to different one because there is only one video device accessible.",
    canvas: "Canvas is not supported.",
  };

  const takePhoto = () => {
    if (camera.current) {
      let photo = null;
      photo = camera.current.takePhoto();
      setImage(photo);
    }
  };

  return (
    <div>
      <Camera ref={camera} errorMessages={errorMessages} />
      <button onClick={takePhoto}>Take photo</button>
      {image && <img src={image} alt="Taken photo" />}
    </div>
  );
};

export default CameraComponent;

export const errorMessages = {
  noCameraAccessible:
    "No camera device accessible. Please connect a camera or try a different browser.",
  permissionDenied:
    "Permission denied. Please refresh and give camera permissions.",
  switchCamera:
    "It is not possible to switch camera to different one because there is only one video device accessible.",
  canvas: "Canvas is not supported.",
};
