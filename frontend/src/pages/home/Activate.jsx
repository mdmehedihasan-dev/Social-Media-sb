/* eslint-disable no-unused-vars */
import { ClockLoader } from "react-spinners"

// eslint-disable-next-line react/prop-types
const Activate = ({type,text,head,loading}) => {
  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen bg-blur">
        <div className="p-4 text-center bg-white shadow-lg w-96">
            <h3 className={`${type === "success" ? "text-green" : "text-red"} text-lg font-gilroyMedium`}>{head}</h3>
            <h5 className="mt-5 text-lg font-gilroyRegular">{text}</h5>
            <ClockLoader loading={loading} className="m-auto mt-5" color="#21D997" size={40} />

        </div>
        
    </div>
  )
}

export default Activate