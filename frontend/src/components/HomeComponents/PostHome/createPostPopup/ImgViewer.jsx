/* eslint-disable react/prop-types */
import { useRef } from "react";
import EmojiPickers from "./EmojiPickers";
import { CircleCloseIcon } from "../../../../svg/CircleClose";
import { Media } from "../../../../svg/Media";
import { CrossIcon } from "../../../../svg/Cross";

const ImgViewer = ({ text, setText, textRef, image, setImage,setShow }) => {
  const chooseFile = useRef(null);

  const handleImageUpload = (e) => {
    const file = Array.from(e.target.files);
    file.forEach((img) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        console.log("image not supported");
      }
      const renderFiles = new FileReader();
      renderFiles.readAsDataURL(img);
      renderFiles.onload = (renderImage) => {
        setImage((images) => [...images, renderImage.target.result]);
      };
    });
  };
  console.log(image);

  return (
    <>
      <EmojiPickers
        text={text}
        setText={setText}
        textRef={textRef}
        changePart
      />
      <div className="p-1 mb-2 border rounded-md border-lnline_color">
        <div className="w-full rounded-md h-[300px] bg-white-100  ">
          <input
            type="file"
            multiple
            accept="image/jpeg , image/png , image/webp , image/gif"
            className="hidden"
            ref={chooseFile}
            onChange={handleImageUpload}
          />

          {image && image.length ? (
            <div className="relative w-full h-full overflow-hidden ">
              <div
                className="absolute opacity-55 flex items-center p-2 cursor-pointer gap-x-1 bg-blur top-1.5 rounded-xl left-2"
                onClick={() => chooseFile.current.click()}
              >
                <Media />
                <span className="text-xs font-gilroyMedium">
                  Add more photos/videos
                </span>
              </div>
              <div onClick={()=>setImage([])} className="absolute flex items-center justify-center w-8 h-8 transition-all duration-100 ease-linear rounded-full cursor-pointer top-2 right-2 hover:bg-white">
                <CrossIcon />
              </div>
              <div
                className={`${
                  image.length === 1
                    ? "w-full h-full overflow-hidden"
                    : image.length === 2
                    ? "overflow-hidden h-full w-full grid grid-cols-2 gap-2"
                    : image.length === 3
                    ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                    : image.length === 4
                    ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                    : image.length >= 5
                    ? "w-full h-full overflow-hidden grid grid-cols-2 gap-2"
                    : "overflow-hidden"
                }`}
              >
                {image.slice(0, 4).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="images"
                    className={`object-cover w-full h-full ${
                      image.length === 3
                        ? "[&:nth-of-type(1)]:row-start-1 [&:nth-of-type(1)]:row-end-3"
                        : image.length === 4 &&
                          "[&:nth-of-type(1)]:row-start-2 [&:nth-of-type(1)]:row-end-3"
                    }`}
                  />
                ))}
              </div>
             {
              image.length >= 5 &&
              <div className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-white-100 bottom-20 right-24 opacity-65 ">
              <span className="text-base font-gilroyBold">
                +{image.length - 4}
              </span>
            </div>
             }
            </div>
          ) : (
            <div className="relative flex items-center justify-center h-full">
              <div onClick={()=>setShow(false)} className="absolute cursor-pointer top-2 right-2 text-single_color ">
                <CircleCloseIcon />
              </div>
              <div
                className="flex flex-col items-center cursor-pointer "
                onClick={() => chooseFile.current.click()}
              >
                <div className="flex items-center justify-center w-10 h-10 transition-all duration-100 ease-linear rounded-full cursor-pointer hover:bg-black hover:text-white">
                  <Media />
                </div>
                <div>
                  <p className="text-base text-center font-gilroyMedium">
                    Add Photos / Videos
                  </p>
                  <p className="text-base text-center font-gilroyRegular">
                    or drag & drop
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImgViewer;
