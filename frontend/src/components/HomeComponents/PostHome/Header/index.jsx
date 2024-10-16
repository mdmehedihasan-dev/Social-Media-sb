import { useRef, useState } from "react";
import { SearchIcon } from "../../../../svg/SearchIcon";
import SearchBox from "./SearchBox";
import OutSideClick from "../../../../functions/click";
import { LeftData } from "../../LeftPart/Data";
import LeftMenu from "../../LeftPart/LeftMenu";

const Header = () => {
  const [show, setShow] = useState(false);
  const clickOutSide = useRef(null);

  OutSideClick(clickOutSide, () => {
    setShow(false);
  });

  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="hidden text-4xl lg:block font-gilroyBold">Feeds</h4>
        <div className="block mx-auto rounded-full w-14 h-14 lg:hidden bg-cyan-100"></div>
      </div>

      <div className="flex items-center lg:hidden lg:gap-x-4">
        {LeftData.map((data, index) => (
          <LeftMenu key={index} data={data} />
        ))}
      </div>

      <div className=" w-10 lg:w-[28%] xl:w-[32%]  relative">
        <div
          onClick={() => setShow(true)}
          className="flex items-center justify-center border rounded-full xl:w-[260px] lg:w-[230px] w-11 h-11 lg:px-4 lg:py-3 border-secondary_color gap-x-3"
        >
          <div className="cursor-pointer text-secondary_color ">
            {" "}
            <SearchIcon />{" "}
          </div>
          <div className="hidden lg:block">
            <input
              type="text"
              placeholder="Search"
              className="w-full focus:outline-none font-gilroyRegular"
            />
          </div>
        </div>
        <div
          className=" -top-2  lg:-left-[30px] -left-64  absolute"
          ref={clickOutSide}
        >
          {show && <SearchBox />}
        </div>
      </div>
    </div>
  );
};

export default Header;
