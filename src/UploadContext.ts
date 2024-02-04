import { Dispatch, SetStateAction, createContext } from "react";

export const SearchContext = createContext<{
  searchString: string;
  setSearchString: Dispatch<SetStateAction<string>>;
}>({
  searchString: "",
  setSearchString: () => {},
});

