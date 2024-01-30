import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { useParams } from "react-router-dom";
import ImageCropper from "./ImageCropper";

const ShowImage = () => {
  const [wallpaper, setWallpaper] = useState<string>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
//   const navigate = useNavigate();

  const fetchImage = async () => {
    const storageRef = ref(storage, `images/${id}`);
    try {
      const url = await getDownloadURL(storageRef);
      setWallpaper(url);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleDownloadImage = (url: string | undefined) => {
    if (!url) {
      alert("Image URL is not available.");
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = "download.jpeg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <section className="flex justify-center items-center">
      <div className="mt-3 px-4 flex flex-col">
        {wallpaper && (
          <img
            src={wallpaper}
            alt={"image"}
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
              onClick={() => handleDownloadImage(wallpaper)}
            >
              Download Wallpaper
            </button>
            <button
              className="border px-3 h-12 rounded-md bg-orange-600 text-slate-200"
              onClick={() => {
                <ImageCropper src={wallpaper}/>
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
