/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import SettingOption from "./SettingOpation/SettingOption";
import OutSideClick from "../../../functions/click";

const LeftMenu = ({ data }) => {
  const ItemIcon = data.icon;
  const [show, setShow] = useState(false);

  const clickOutSide = useRef(null);

  OutSideClick(clickOutSide, () => {
    setShow(false);
  });

  const SeparationSettings = data.title == "Settings" && (
    <>
      <div className="relative">
        <div
          onClick={() => setShow(true)}
          className={`flex w-10 h-10 xl:w-auto xl:h-auto justify-center xl:justify-normal items-center xl:px-6 xl:py-3 xl:mb-5 transition-all duration-200 ease-linear rounded-full cursor-pointer hover:bg-black ${show && "bg-black"} item-center xl:gap-x-5 group`}
        >
          <div className={`group-hover:text-white ${show && "text-white"}`}>
            <ItemIcon />
          </div>
          <div className={`text-base hidden xl:block font-gilroySemiBold group-hover:text-white ${show && "text-white"}`}>
            {data.title}
          </div>
        </div>
        {show && (
          <div ref={clickOutSide} className="absolute lg:left-0 -left-2/4 -translate-x-[62%] lg:translate-x-0 top-10 xl:top-16 ">
            <div>
              <SettingOption />
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {SeparationSettings ? (
        SeparationSettings
      ) : (
        <NavLink
          to={data.to}
          className="flex items-center justify-center w-10 h-10 transition-all duration-200 ease-linear rounded-full cursor-pointer xl:justify-normal xl:flex xl:px-6 xl:py-3 lg:mb-5 xl:mb-7 hover:bg-black item-center xl:gap-x-5 group xl:w-auto xl:h-auto"
        >
          <div className="group-hover:text-white ">
            <ItemIcon />
          </div>
          <div className="hidden text-base xl:block font-gilroySemiBold group-hover:text-white">
            {data.title}
          </div>
        </NavLink>
      )}
    </>
  );
};

export default LeftMenu;
