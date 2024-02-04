import { useContext, useState } from "react";
import { UploadContext } from "../UploadContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 } from "uuid";

const UploadWallpaper = () => {
  const [uploadFile, setUploadFile] = useState<File | null>();
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const { setIsUploadSuccess } = useContext(UploadContext);
  const serverUri = "https://wallpaper-wizard-backend.onrender.com/api/wallpaper/post-wallpaper";

  const handleUpload = () => {
    if (!uploadFile || !uploadFileName) return;

    const imageRef = ref(storage, `images/${v4()}`);
    uploadBytes(imageRef, uploadFile).then((imageUrl) => {
      getDownloadURL(imageUrl.ref).then((url: string) => {
        let postData = {
          title: uploadFileName,
          imageUri: url
        }
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        };

        fetch(serverUri, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('POST request successful:', data);
        })
        .catch(error => {
          console.error('Error during POST request:', error);
        });
      });

      setIsUploadSuccess(true);
    });
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5">
        <input
          type="text"
          className="border pl-4 mt-5 bg-slate-900 text-slate-300 h-12 w-[24rem] rounded"
          placeholder="Title"
          value={uploadFileName}
          onChange={(e) => setUploadFileName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          type="file"
          accept="image/*"
          onChange={(e) => setUploadFile(e.target.files?.[0])}
        />
      </div>
      <button
        onClick={handleUpload}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  );
};

export default UploadWallpaper;
