import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type WallpaperType = {
  title: string;
  imageUri: string;
  _id: string;
};

const WallpaperImage = () => {
  const fetchImageUrl = "https://wallpaper-wizard-backend.onrender.com/api/wallpaper/get-wallpapers";

  const [files, setFiles] = useState<WallpaperType[]>([]);

  const navigate = useNavigate();

  const fetchImage = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    };
    fetch(fetchImageUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return console.log("error fetching the data");
        }
        return response.json();
      })
      .then((data: WallpaperType[]) => {
        setFiles(data)
      });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 small:grid-cols-3 m-7">
      {files.map((file) => (
        <div key={file._id} className="flex flex-col items-center">
          <img
            src={file.imageUri}
            alt="image"
            className="cursor-pointer w-full h-64 bg-blue-300"
            onClick={()=> navigate(`/show-image/${file._id}`)}
          />
          <span className="mt-2 p-2">{file.title}</span>
        </div>
      ))}
    </div>
  );
};

export default WallpaperImage;
