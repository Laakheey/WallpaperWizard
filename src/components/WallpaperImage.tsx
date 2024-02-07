import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../UploadContext";
// import Footer from "./Footer";

export type WallpaperType = {
  title: string;
  imageUri: string;
  _id: string;
};

const WallpaperImage = () => {
  const fetchImageUrl = "https://wallpaper-wizard-backend.onrender.com/api/wallpaper/get-wallpapers";
  const [files, setFiles] = useState<WallpaperType[]>([]);
  const [loading, setLoading] = useState(true);
  const [_, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  // const pageNumber = 0;
  const { searchString } = useContext(SearchContext);
  const navigate = useNavigate();

  const fetchImage = () => {
    const searchObject = {
      pageNumber: pageNumber,
      searchString: searchString
    };
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchObject),
    };

    fetch(fetchImageUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          return console.log("error fetching the data");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          setFiles((prevFiles) => [...prevFiles, ...data]);
          
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handelInfiniteScroll = async () => {
    try {
      console.log('hyy');
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchImage();
  }, [searchString]);

  useEffect(() => {
    document.addEventListener("scroll", handelInfiniteScroll)
  }, [])

  return (
    <>
      {loading ? (
        <div className="justify-center flex mt-5 h-16">
          <img src="/assets/loader.svg" alt="Loading..." className="invert h-full" />
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 small:grid-cols-3 m-7">
          {files.map((file) => (
            <div key={file._id} className="flex flex-col items-center">
              <img
                src={file.imageUri}
                alt="image"
                className="cursor-pointer w-full h-64 bg-blue-300"
                onClick={() => navigate(`/show-image/${file._id}`)}
              />
              <span className="mt-2 p-2">{file.title}</span>
            </div>
          ))}
        </div>
      )}
      {/* <Footer/> */}
    </>
  );
};

export default WallpaperImage;
