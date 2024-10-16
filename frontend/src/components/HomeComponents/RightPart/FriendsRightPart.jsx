import { Link } from "react-router-dom"
import { textReducer } from "../../../functions/textReducer"

const FriendsRightPart = () => {
    const orginalName = "Mohammed Azmir Uddin Alif"
    const reduceText = textReducer(orginalName,15)
  return (
    <div>
        <div className="flex items-center justify-between">
        <div>
            <h2 className="text-lg font-gilroyBold">Friends Request</h2>
        </div>
        <div>
            <Link className="px-4 py-2 transition-all duration-100 ease-linear border rounded-full font-gilroyMedium hover:bg-black hover:text-white" to={"/friends"}>See All </Link>
        </div>
        </div>
        {/* ================= */}
        <div>
            <div className="flex items-center justify-between mt-5 gap-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary_color"></div>
                <div className="w-1/2">
                    <h4 className="text-sm font-gilroySemiBold">{reduceText}</h4>
                    <p className="text-xs font-gilroyRegular text-single_color">2 hours ago</p>
                </div>
                <div className="flex w-1/3 gap-x-2">
                    <button className="px-3 py-2 text-xs text-white bg-black rounded-full">Accpet</button>
                    <button className="px-3 py-2 text-xs text-white rounded-full bg-red">Reject</button>
                </div>
            </div>


            <div className="flex items-center justify-between mt-5 gap-x-2">
                <div className="w-8 h-8 rounded-full bg-secondary_color"></div>
                <div className="w-1/2">
                    <h4 className="text-sm font-gilroySemiBold">{reduceText}</h4>
                    <p className="text-xs font-gilroyRegular text-single_color">2 hours ago</p>
                </div>
                <div className="flex w-1/3 gap-x-2">
                    <button className="px-3 py-2 text-xs text-white bg-black rounded-full">Accpet</button>
                    <button className="px-3 py-2 text-xs text-white rounded-full bg-red">Reject</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendsRightPart