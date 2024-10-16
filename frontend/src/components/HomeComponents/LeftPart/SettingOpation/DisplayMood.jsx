/* eslint-disable react/prop-types */
import { BackIcon } from "../../../../svg/backIcon";
import { Moon } from "../../../../svg/Moon";

const DisplayMood = ({setVisible}) => {
  return (
    <div className="w-[300px] bg-white shadow-md rounded-md p-2">
      <div onClick={()=>setVisible(false)} className="flex items-center gap-x-5">
        <div className="flex items-center transition-all ease-linear duration-100 justify-center w-8 h-8 rounded-full cursor-pointer bg-page_color hover:bg-[#cecdcd]">
          <BackIcon />
        </div>
        <h4 className="text-base transition-all duration-100 ease-linear cursor-pointer font-gilroyBold hover:text-primary_bg">Display & Accessability</h4>
      </div>
      <div className="flex justify-between gap-x-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-page_color">
          <Moon />
        </div>

        <div className="w-4/5 mt-2">
          <h4 className="text-base transition-all duration-100 ease-linear cursor-pointer font-gilroyBold hover:text-primary_bg">Dark Mood</h4>
          <p className="font-gilroyRegular text-secondary_bg">
            Lorem ipsum dolor sit amet consectetur Corporis
          </p>
          <div className="">
            <div className="flex items-center justify-between ">
                <label htmlFor="white" className="text-base font-gilroyBold">On</label>
                <input name="darkmood"  id="white" type="radio"  />
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="dark" className="text-base font-gilroyBold">Off</label>
                <input name="darkmood" id="dark" type="radio"  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMood;
