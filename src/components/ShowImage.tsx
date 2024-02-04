import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { WallpaperType } from "./WallpaperImage";
import PreviewImage from "./PreviewImage";

const ShowImage = () => {
  const [wallpaper, setWallpaper] = useState<WallpaperType>();
  const [loading, setLoading] = useState(true);
  const [previewWallpaper, setPreviewWallpaper] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

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

  const handleDownloadImage = (url: string | undefined) => {
    if (!url) return;
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = () => {
      const blob = xhr.response;
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "Wallpaper-Wizard.jpeg";
      downloadLink.click();
    };
    xhr.onerror = () => {
      console.error("Image download failed.");
    };
    xhr.open("GET", url);
    xhr.send();
  };

  const handlePreviewImage = (url: string | undefined) => {
    if (!url) return;
    setPreviewWallpaper(!previewWallpaper);
  };

  const closePreviewModal = () => setPreviewWallpaper(false)

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <section className="flex justify-center items-center">
        <div className="mt-3 px-4 flex flex-col">
          {wallpaper && (
            <div className="flex justify-center">
              <img
                className="w-[60%] h-[40%]"
                src={wallpaper.imageUri}
                alt={wallpaper.title}
                onLoad={() => setLoading(false)}
              />
            </div>
          )}
          {!loading ? (
            <div className="flex justify-center gap-5 px-5 mt-5">
              <button
                className="border px-3 h-12 rounded-md bg-green-700 text-slate-100"
                onClick={() => handlePreviewImage(wallpaper?.imageUri)}
              >
                Preview Wallpaper
              </button>
              <button
                className="border px-3 h-12 rounded-md bg-blue-600 text-slate-200"
                onClick={() => handleDownloadImage(wallpaper?.imageUri)}
              >
                Download Wallpaper
              </button>
              <button
                className="border px-3 h-12 rounded-md bg-orange-600 text-slate-200"
                onClick={() => {
                  navigate(`/crop-wallpaper/${id}`)
                }}
              >
                Crop Wallpaper
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-5 px-5 mt-5">
              <img
                src="/assets/loader.svg"
                alt="Loading..."
                className="invert h-full"
              />
            </div>
          )}
        </div>
      </section>
      <PreviewImage imageUrl={wallpaper?.imageUri} onClose={closePreviewModal} visible={previewWallpaper}/>
    </>
  );
};

export default ShowImage;
