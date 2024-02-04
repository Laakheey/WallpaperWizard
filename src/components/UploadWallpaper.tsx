import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { v4 } from "uuid";

const UploadWallpaper = () => {
  const [uploadFile, setUploadFile] = useState<File | null>();
  const [uploadFileName, setUploadFileName] = useState<string>('');
  const [stopSubmitButton, setStopSubmitButton] = useState(false);
  const [imageURL, setImageURL] = useState('');

  const serverUri = "https://wallpaper-wizard-backend.onrender.com/api/wallpaper/post-wallpaper";

  const handleUpload = () => {
    if (!uploadFile) {
      alert('File must be selected')
      return
    };

    if(uploadFileName.trim() === '') {
      alert('File name is must')
      return
    };

    setStopSubmitButton(true);

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
          setImageURL('');
          setUploadFileName('');
          setStopSubmitButton(false);
          console.log('POST request successful:', data);
        })
        .catch(error => {
          console.error('Error during POST request:', error);
        });
      });
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setImageURL(url);
      };
      reader.readAsDataURL(file);
    }
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>
            ) => handleFileChange(e)}
        />
      </div>
      <button
        onClick={handleUpload}
        type="submit"
        className={`text-white bg-blue-700 hover:bg-blue-600 flex items-center gap-2 cursor-pointer px-5 py-2 rounded-md ${stopSubmitButton ? 'disabled' : ''}`}
      >
        Submit
        {
          stopSubmitButton && <img src="/assets/loader.svg" alt="" width={20} />
        }
      </button>

      {imageURL && <img className="mt-5 w-full mb-3" src={imageURL} alt="Selected" />}

    </div>
  );
};

export default UploadWallpaper;
