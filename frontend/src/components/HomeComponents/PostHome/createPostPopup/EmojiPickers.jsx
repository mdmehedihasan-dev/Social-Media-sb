/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Feeling from "../../../../svg/Feeling";
import EmojiPicker from "emoji-picker-react";
import { postBackground } from "./postbackground";

const EmojiPickers = ({
  setBackground,
  background,
  textRef,
  text,
  setText,
  changePart,
}) => {
  const [curserPosition, setCursorPosition] = useState("");
  const [emojiShow, setEmojiShow] = useState(false);
  const [backgroundShow, setBackgroundShow] = useState(false);
  const bgRef = useRef(null);

  const handelEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };

  useEffect(() => {
    textRef.current.selectionEnd = curserPosition;
  }, [curserPosition]);

  // console.log(changePart);

  const handleClickBackground = (index) => {
    // console.log(index)
    bgRef.current.style.backgroundImage = `url(${postBackground[index]})`;
    setBackground(postBackground[index]);
    bgRef.current.classList.add("bgPost");
    textRef.current.focus();
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove("bgPost");
    textRef.current.focus();
  };

  return (
    <div>
      <div
        className={`${
          changePart ? "flex  justify-center items-center  mt-2" : "mt-5"
        }`}
      >
        <div
          className={`${changePart ? "w-full mb-2" : "mt-5 mb-2"}`}
          ref={bgRef}
        >
          <textarea
            ref={textRef}
            value={text}
            maxLength={100}
            onChange={(e) => setText(e.target.value)}
            placeholder="What are you thinking about?"
            className={`${
              changePart
                ? "w-full p-2   outline-none font-gilroyRegular "
                : "w-full p-2 min-h-28   outline-none font-gilroyRegular bg-transparent "
            }`}
            style={{
              paddingTop: `${
                background
                  ? Math.abs(textRef.current.value.length * 0.1 - 25)
                  : "0"
              }%`,
            }}
          />
        </div>

        {changePart && (
          <div className="relative mt-1 cursor-pointer">
            <div onClick={() => setEmojiShow((prev) => !prev)}>
              <Feeling />
            </div>
            {emojiShow && (
              <div className="absolute top-0 left-8">
                <EmojiPicker onEmojiClick={handelEmoji} />
              </div>
            )}
          </div>
        )}
      </div>
      {!changePart && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center justify-center gap-x-1">
            <div
              onClick={() => setBackgroundShow((pre) => !pre)}
              className="w-8 h-8 rounded-md cursor-pointer bg-gradient-to-tr from-cyan-100 to-purple-100"
            ></div>

            {backgroundShow && (
              <>
                <div
                  onClick={() => removeBackground()}
                  className="w-8 h-8 border-2 border-solid rounded-md bg-white-100 "
                ></div>
                {postBackground.map((item, index) => (
                  <img
                    onClick={() => handleClickBackground(index)}
                    key={index}
                    src={item}
                    alt=""
                    className="w-8 h-8 rounded-md"
                  />
                ))}
              </>
            )}
          </div>

          <div className="relative cursor-pointer">
            <div onClick={() => setEmojiShow((prev) => !prev)}>
              <Feeling />
            </div>
            {emojiShow && (
              <div className="absolute -top-80 left-8">
                <EmojiPicker onEmojiClick={handelEmoji} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickers;
