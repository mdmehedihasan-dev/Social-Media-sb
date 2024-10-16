import { useState } from "react"
import { Logout } from "../../../../svg/Logout"
import { Moon } from "../../../../svg/Moon"
import DisplayMood from "./DisplayMood"
import { useDispatch } from "react-redux"
import { loggedOutUsers } from "../../../../features/user/authSlice"
import { useNavigate } from "react-router-dom"

const SettingOption = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    if(visible){
        return <DisplayMood setVisible={setVisible}/>
    }

    const handleLogOut =()=>{
        localStorage.removeItem("user")
        dispatch(loggedOutUsers())
        navigate('/')
    }



  return (
    <div className="w-[280px] bg-white shadow-md rounded-md p-3">
        <ul>
            <li onClick={()=>setVisible(true)} className="flex items-center mb-4 cursor-pointer gap-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-page_color">
                    <Moon/>
                </div>
                <div>
                    <p className="text-base transition-all duration-100 ease-linear font-gilroyBold hover:text-primary_bg">Display & Accessability</p>
                </div>
            </li>
            <li onClick={handleLogOut} className="flex items-center cursor-pointer gap-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-page_color">
                <Logout/>
            </div>
            <div>
                <p className="text-base transition-all duration-100 ease-linear font-gilroyBold hover:text-primary_bg">Logout</p>
            </div>
            </li>
        </ul>
    </div>
  )
}

export default SettingOption