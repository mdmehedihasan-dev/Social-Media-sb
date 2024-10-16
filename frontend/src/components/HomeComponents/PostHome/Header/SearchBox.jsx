import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../../../../svg/SearchIcon";

const SearchBox = () => {
  const [iconShow, setIconShow] = useState(true);
  const focusInput = useRef(null);

  useEffect(() => {
    focusInput.current.focus();
  }, []);

  return (
    <div className="w-[300px] z-10  bg-white rounded-md  min-h-[400px] px-[25px] py-2 max-h-[70vh] box-border shadow-md">
      <div className="flex items-center px-4 py-3 border rounded-full border-secondary_color gap-x-3">
        {iconShow && (
          <div
            onClick={() => focusInput.current.focus()}
            className="cursor-pointer text-secondary_color "
          >
            <SearchIcon />
          </div>
        )}
        <div>
          <input
            ref={focusInput}
            type="text"
            placeholder="Search"
            className="focus:outline-none font-gilroyRegular"
            onFocus={() => setIconShow(false)}
            onBlur={() => setIconShow(true)}
          />
        </div>
      </div>
      <div>
        <p className="m-2 text-base font-gilroyBold">Recent Searchs</p>
      </div>
    </div>
  );
};

export default SearchBox;
