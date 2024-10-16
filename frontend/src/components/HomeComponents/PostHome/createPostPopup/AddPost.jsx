/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CircleProfileIcon } from "../../../../svg/Circleprofile"
import { LiveIcon } from "../../../../svg/Live"
import { Media } from "../../../../svg/Media"

const AddPost = ({show,setShow}) => {
  return (
    <>
    <div className="px-2 py-1 border rounded-md border-lnline_color">
        <div className="flex items-center justify-between">
            <span className="text-black font-gilroyMedium text-bases">Add New Post</span>
            <div className="flex items-center gap-x-1">
                <div onClick={()=>setShow(true)}  className={`flex items-center justify-center w-10 h-10 p-2 transition-all duration-100 ease-linear rounded-full cursor-pointer hover:bg-lnline_color ${show && "w-10 h-10 bg-lnline_color" } `}>
                  <Media  />
                </div>
                <div className="flex items-center justify-center w-10 h-10 p-2 transition-all duration-100 ease-linear rounded-full cursor-pointer hover:bg-lnline_color">
                <LiveIcon/>
                </div>
                <div className="flex items-center justify-center w-10 h-10 p-2 transition-all duration-100 ease-linear rounded-full cursor-pointer hover:bg-lnline_color">
                <CircleProfileIcon/>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddPost