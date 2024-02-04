import { useContext, useState } from "react";
import { SearchContext } from "../UploadContext";

const NavBar = () => {
  const { setSearchString } = useContext(SearchContext);

  const [inputString, setInputString] = useState('');

  const handleSearchButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchString(inputString);
  }

  return (
    <nav className="bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        <a href="/" className="flex flex-wrap ml-8 py-4 gap-3 items-center">
          <img src="/assets/favicon.svg" className="h-14" alt="Home" />
          <span className="text-white lg:text-2xl text-xl hidden md:block">
            WallpaperWizard
          </span>
        </a>

        <form className="mr-8 flex flex-wrap">
          <input
            type="text"
            className="h-8 px-3 py-5 placeholder-gray-950 focus:outline-none"
            placeholder="Search"
            onChange={(e)=> setInputString(e.target.value)}
          />
          <button className="bg-blue-600 px-3  active:bg-blue-400 ease" onClick={(e) => handleSearchButton(e)}>
            <img
              src="/assets/search.svg"
              alt="search"
              className="invert"
              width={20}
              height={15}
            />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
