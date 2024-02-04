import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  makeAspectCrop,
  type Crop,
  centerCrop,
  convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useParams } from "react-router-dom";
import { WallpaperType } from "./WallpaperImage";
import setCanvasPreview from "../constants/setCanvasPreview";

const ASPECT_RATIO = 1;
const MIN_DIMENSIONAL = 150;

const ImageCropper = () => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState<Crop>();
  const [wallpaper, setWallpaper] = useState<WallpaperType>();
  const [showButton, setShowButton] = useState(false);
  const [croppedImageUrl, setcroppedImageUrl] = useState('')

  const { id } = useParams();

  const fetchImageUrl =
    "https://wallpaper-wizard-backend.onrender.com/api/wallpaper/get-wallpaper-by-id";

  const fetchImage = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${fetchImageUrl}/${id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return console.log("error fetching the data");
        }
        return response.json();
      })
      .then((data: WallpaperType) => {
        setWallpaper(data);
      });
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      ASPECT_RATIO,
      width,
      height
    );

    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
    setShowButton(true);
  };

  const handleSaveCroppedImage = () => {
    console.log(croppedImageUrl);
    const link = document.createElement('a');
    link.href = croppedImageUrl;
    link.download = 'wallpaper-wizard-cropped-image.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center mt-5 flex-col gap-3">
        <ReactCrop
          keepSelection
          crop={crop}
          minWidth={MIN_DIMENSIONAL}
          onChange={(_, precentCrop) => setCrop(precentCrop)}
        >
          <img
            ref={imgRef}
            src={wallpaper?.imageUri}
            width={570}
            onLoad={onImageLoad}
            crossOrigin="anonymous"
          />
        </ReactCrop>
        {showButton && (
          <div className="flex justify-between gap-3">
            <button
              className="bg-orange-600 p-3 rounded-md cursor-pointer"
              onClick={() => {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop || {},
                    (imgRef.current as any).width,
                    (imgRef.current as any).height
                  )
                );
                const canvasElement =
                  previewCanvasRef.current as HTMLCanvasElement | null;
                if (canvasElement) {
                  const dataUrl = canvasElement.toDataURL();
                  setcroppedImageUrl(dataUrl);
                }
              }}
            >
              Crop Image
            </button>

            <button className="bg-blue-600 p-3 rounded-md cursor-pointer" onClick={handleSaveCroppedImage}>
              Download Cropped Image
            </button>
          </div>
        )}

        {crop && (
          <canvas
            ref={previewCanvasRef}
            className="mt-4 border-2 border-black object-fill w-[150px] h-[150px]"
          ></canvas>
        )}
      </div>
    </>
  );
};

export default ImageCropper;
