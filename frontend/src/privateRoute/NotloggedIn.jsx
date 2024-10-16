import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const NotloggedIn = () => {
    const {userInfo} = useSelector((state)=>state.registration)
    console.log(userInfo)

  return (
    userInfo ? <Navigate to={"/"}/> : <Outlet/>
  )
}

export default NotloggedIn