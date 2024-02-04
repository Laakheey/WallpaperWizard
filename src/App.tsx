import { useState } from "react";
import { UploadContext } from "./UploadContext";
import { Route, Routes } from "react-router-dom";
import { NavBar, FetchImage, UploadWallpaper, ShowImage } from "./components";
import WallpaperImage from "./components/WallpaperImage";

function App() {
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  return (
    <>
      <UploadContext.Provider value={{ isUploadSuccess, setIsUploadSuccess }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<WallpaperImage />} />
          {
            localStorage.getItem('admin') && (
              <Route path="/upload-wallpaper"  element={<UploadWallpaper />} />
            )
          }
          <Route path="/show-image/:id" element={<ShowImage />} />
          <Route path="*" element={<FetchImage />} />
        </Routes>
        {/* <WallpaperImage/> */}
      </UploadContext.Provider>
    </>
  );
}

export default App;
