import { useState } from "react";
import FetchImage from "./components/FetchImage";
import NavBar from "./components/NavBar";
import { UploadContext } from "./UploadContext";
import { Route, Routes } from "react-router-dom";
import UploadWallpaper from "./components/UploadWallpaper";
import ShowImage from "./components/ShowImage";

function App() {
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  return (
    <>
      <UploadContext.Provider value={{ isUploadSuccess, setIsUploadSuccess }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<FetchImage />} />
          {
            localStorage.getItem('admin') && (
              <Route path="/upload-wallpaper"  element={<UploadWallpaper />} />
            )
          }
          <Route path="/show-image/:id" element={<ShowImage />} />
        </Routes>
      </UploadContext.Provider>
    </>
  );
}

export default App;
