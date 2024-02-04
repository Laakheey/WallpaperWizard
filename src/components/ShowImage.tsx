import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageCropper } from "./";
import { WallpaperType } from "./WallpaperImage";

const ShowImage = () => {
  const [wallpaper, setWallpaper] = useState<WallpaperType>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchImageUrl = "https://wallpaper-wizard-backend.onrender.com/api/wallpaper/get-wallpaper-by-id";

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
        setWallpaper(data)
      });
  };

  const handleDownloadImage = (url: string | undefined) => {
    if (!url) return;
    const xhr = new XMLHttpRequest();
    debugger
  
    xhr.responseType = 'blob';
  
    xhr.onload = () => {
      const blob = xhr.response;
  
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'Wallpaper-Wizard.jpeg';
      downloadLink.click();
    };
  
    xhr.onerror = () => {
      console.error('Image download failed.');
    };
  
    xhr.open('GET', url);
    xhr.send();
  };
  
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <section className="flex justify-center items-center">
      <div className="mt-3 px-4 flex flex-col">
        {wallpaper && (
          <img
            src={wallpaper.imageUri}
            alt={wallpaper.title}
            width={800}
            onLoad={() => setLoading(false)}
            
          />
        )}
        {!loading ? (
          <div className="flex justify-center gap-5 px-5 mt-5">
            <button className="border px-3 h-12 rounded-md bg-green-700 text-slate-100">
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
                <ImageCropper src={wallpaper?.imageUri}/>
            }}
            >
              Crop Wallpaper
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-5 px-5 mt-5">Loading...</div>
        )}
      </div>
    </section>
  );
};

export default ShowImage;
