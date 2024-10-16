/* eslint-disable react/prop-types */
import { useRef } from "react";
import { LiveIcon } from "../../../svg/Live";
import { Media } from "../../../svg/Media";
import ShowPost from "./showPost";
const PostHome = ({ setVisiable, posts }) => {
  const removeFocus = useRef(null);

  const handleVisiable = () => {
    setVisiable(true);
    removeFocus.current.blur();
  };
  return (
    <>
      <div className="px-6 py-5 mt-5 rounded-md bg-white-100">
        <div className="flex items-center w-full p-2 mb-6 bg-white rounded-full gap-x-3">
          <div className="w-10 h-10 rounded-full bg-white-100 "></div>
          <input
            onClick={handleVisiable}
            ref={removeFocus}
            type="text"
            placeholder="What are you thinking about?"
            className="w-[90%] focus:outline-none"
          />
        </div>

        <div className="border-t-2 border-lnline_color">
          <div className="flex items-center justify-around mt-4">
            <div className="flex items-center w-1/3 gap-x-2">
              <LiveIcon />
              <span className="text-black font-gilroyMedium">Live Video</span>
            </div>
            <div className="flex items-center w-1/3 gap-x-2">
              <Media />
              <span className="text-black font-gilroyMedium">Image/Video</span>
            </div>
            <div className="flex items-center w-1/3 gap-x-2">
              <LiveIcon />
              <span className="text-black font-gilroyMedium">Live Video</span>
            </div>
          </div>
        </div>
      </div>
      {
            posts?.map((item,i)=>(
              <ShowPost key={i} post={item} />
            ))
          }

    </>
  );
};

export default PostHome;
