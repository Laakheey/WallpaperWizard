import { getDownloadURL, list, ref } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { UploadContext } from "../UploadContext";
import { useNavigate } from "react-router-dom";

type FileToUrl = {
  fileUrl: string;
  fileTitle: string;
  fileId: string
};

const FetchImage = () => {
  const [files, setFiles] = useState<FileToUrl[]>([]);
  const {isUploadSuccess, setIsUploadSuccess} = useContext(UploadContext);
  const navigate =  useNavigate();

  const fetchFile = async () => {
    const storageRef = ref(storage, 'images/');
    const allFiles = await list(storageRef, { maxResults: 20 });
    console.log(allFiles.items[0].name);
    const currentFile: FileToUrl[] = await Promise.all(
      allFiles.items.map(async (item) => ({
        fileUrl: await getDownloadURL(item),
        fileTitle: item.name.split('-GUID-')[0],
        fileId: item.name.split('-GUID-')[1]
      }))
    );
    setFiles(currentFile);
    setIsUploadSuccess(false);
  };

  useEffect(()=>{
    fetchFile();
  },[isUploadSuccess]);

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 small:grid-cols-3 m-7">
        {files.map((file) => (
          <div key={file.fileId} className="flex flex-col items-center">
            <img src={file.fileUrl} alt="image" className="cursor-pointer w-full h-64 bg-blue-300" onClick={()=> navigate(`/show-image/${file.fileTitle}-GUID-${file.fileId}`)}/>
            <span className="mt-2 p-2">{file.fileTitle}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FetchImage;
