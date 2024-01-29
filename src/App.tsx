import { useState } from "react";
import FetchImage from "./components/FetchImage";
import NavBar from "./components/NavBar";
import { UploadContext } from './UploadContext'

function App() {
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  return (
    <>
      <UploadContext.Provider value={{ isUploadSuccess, setIsUploadSuccess }}>
        <NavBar/>
        <main>
          <FetchImage/>
        </main>
      </UploadContext.Provider>
    </>
  )
}

export default App
