
/* eslint-disable react/prop-types */
import { CircleCloseIcon } from "../../../../svg/CircleClose";
import AddPost from "./AddPost";
import { useRef, useState } from "react";
import EmojiPickers from "./EmojiPickers";
import ImgViewer from "./ImgViewer";
import OutSideClick from "../../../../functions/click";
import { useCreatePostMutation, useUploadImageMutation } from "../../../../features/api/authApi";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import PostError from "./PostError";
import dataURItoBlob from "../../../../helpers/dataURItoBlob";

const CreatePostPopUp = ({ setVisiable }) => {
  const [text, setText] = useState("");
  const { userInfo } = useSelector((state) => state.registration);
  const [background, setBackground] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState([]);
  const [createPost] = useCreatePostMutation();

  const [uploadImage] = useUploadImageMutation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const textRef = useRef(null);
  const popUpRef = useRef(null);

  OutSideClick(popUpRef, () => {
    setVisiable(false);
  });

  const handlePostSubmit = async () => {
    try {
      let response;
      setLoading(true);
      if (background) {
        response = await createPost({
          type: null,
          images: null,
          text,
          background,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
      } else if (image && image.length) {
        console.log(image)
        
        const postImages = image.map((item)=>dataURItoBlob(item))
        const path = `${userInfo.username}/post_images`
        let formData = new FormData()
        formData.append("path",path)
        postImages.forEach((img)=>{
          formData.append("file",img)
        })

        const responseImage = await uploadImage({
          formData,
          path,
          token:userInfo.token
        }).unwrap();
        
        response = await createPost({
          type: null,
          images: responseImage,
          text,
          background:null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();

        
      } else if (text) {
        response = await createPost({
          type: null,
          images: null,
          text,
          background: null,
          user: userInfo.id,
          token: userInfo.token,
        }).unwrap();
        
      } else {
        setError("choose the file");
        setLoading("");
        return;
      }
      if (response.status === "done") {
        setVisiable(false);
        setLoading("");
        setText("");
        setBackground("");
      }
    } catch (error) {
      console.log(error);
      setError(error.data.message );
    }
  };

  return (
    <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-screen bg-blur">
      <div ref={popUpRef} className="relative w-1/3 bg-white shadow-md ">
        {error && <PostError error={error} setError={setError} />}
        <div className="relative p-2 border-b border-white-100">
          <div
            onClick={() => setVisiable(false)}
            className="absolute cursor-pointer top-2 right-3 text-secondary_color"
          >
            <CircleCloseIcon />
          </div>
          <h3 className="text-lg text-center text-black font-gilroyBold">
            CreatePost
          </h3>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-x-4">
            <div className="w-10 h-10 rounded-full bg-primary_bg"></div>
            <h1 className="font-gilroySemiBold">Md Mehedi Hasan</h1>
          </div>

          {!show ? (
            <>
              <EmojiPickers
                background={background}
                setBackground={setBackground}
                text={text}
                setText={setText}
                textRef={textRef}
              />
            </>
          ) : (
            <>
              <ImgViewer
                text={text}
                setText={setText}
                textRef={textRef}
                image={image}
                setImage={setImage}
                setShow={setShow}
              />
            </>
          )}
          <div>
            <AddPost show={show} setShow={setShow} />
          </div>
          <div className="mt-2">
            {text == "" && image.length == 0 ? (
              <button
                disabled
                className="w-full py-1 rounded-md font-gilroyBold"
              >
                POST
              </button>
            ) : loading ? (
              <button
                disabled={loading}
                className="w-full py-1 transition-all duration-100 ease-linear rounded-md hover:text-white hover:bg-black bg-lnline_color font-gilroyBold"
              >
                <PulseLoader size={5} />
              </button>
            ) : (
              <button
                onClick={handlePostSubmit}
                className="w-full py-1 transition-all duration-100 ease-linear rounded-md hover:text-white hover:bg-black bg-lnline_color font-gilroyBold"
              >
                POST
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopUp;

