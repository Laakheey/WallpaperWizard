const NavBar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        <a href="/" className="flex flex-wrap ml-8 py-4 gap-3 items-center">
          <img src="/assets/react.svg" alt="Home" />
          <span className="text-white lg:text-2xl text-xl hidden md:block">
            WallpaperWizard
          </span>
        </a>

        <div className="mr-8 flex flex-wrap">
          <input
            type="text"
            className="h-8 px-3 py-5 placeholder-gray-950 focus:outline-none"
            placeholder="Search"
          />
          <button className="bg-blue-600 px-3  active:bg-blue-400 ease">
            <img
              src="/assets/search.svg"
              alt="search"
              className="invert"
              width={20}
              height={15}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
