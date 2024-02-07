import 'react-image-crop/dist/ReactCrop.css'
import React, { useState } from "react";
import { SearchContext } from "./UploadContext";
import { Route, Routes } from "react-router-dom";
import { NavBar, UploadWallpaper, ShowImage, ImageCropper } from "./components";

const HomePage = React.lazy(() => import('./components/WallpaperImage'))

function App() {
  const [searchString, setSearchString] = useState("");
  return (
    <>
      <SearchContext.Provider value={{ searchString, setSearchString }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {
            localStorage.getItem('admin') && (
              <Route path="/upload-wallpaper"  element={<UploadWallpaper />} />
            )
          }
          <Route path="/show-image/:id" element={<ShowImage />} />
          <Route path="/crop-wallpaper/:id" element={<ImageCropper/>} />
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
