import 'react-image-crop/dist/ReactCrop.css'
import { useState } from "react";
import { SearchContext } from "./UploadContext";
import { Route, Routes } from "react-router-dom";
import { NavBar, UploadWallpaper, ShowImage, ImageCropper } from "./components";
import WallpaperImage from "./components/WallpaperImage";

function App() {
  const [searchString, setSearchString] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ searchString, setSearchString }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<WallpaperImage />} />
          {
            localStorage.getItem('admin') && (
              <Route path="/upload-wallpaper"  element={<UploadWallpaper />} />
            )
          }
          <Route path="/show-image/:id" element={<ShowImage />} />
          <Route path="/crop-wallpaper/:id" element={<ImageCropper/>} />
          <Route path="*" element={<WallpaperImage />} />
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
