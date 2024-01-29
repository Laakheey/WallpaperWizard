import { Dispatch, SetStateAction, createContext } from "react";

export const UploadContext = createContext<{
  isUploadSuccess: boolean;
  setIsUploadSuccess: Dispatch<SetStateAction<boolean>>;
}>({
  isUploadSuccess: false,
  setIsUploadSuccess: () => {},
});
