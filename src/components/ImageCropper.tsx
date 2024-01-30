import { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper = ({ src }: { src: string | undefined }) => {
  const [crop, setCrop] = useState<Crop>();
  return (
    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
      <img src={src} />
    </ReactCrop>
  );
};

export default ImageCropper;
