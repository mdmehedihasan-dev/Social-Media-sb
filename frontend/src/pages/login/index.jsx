import { Helmet } from "react-helmet-async"
import { ToastContainer ,toast } from "react-toastify"
import LoginForm from "../../components/authentication/LoginForm"
import LeftAuth from "../../components/authentication/LeftAuth"
import LoginIcon from "../../svg/LoginIcon"

const Login = () => {
  return (
    <>
    <ToastContainer/>
    <Helmet>
      <title> Login</title>
    </Helmet>

    <div className="relative">
      <div className=" z-[-1] hidden md:block w-[400px] h-[400px] rounded-full -top-36 -left-36 bg-page_color absolute">
       
      </div>
      <div className="container flex items-center justify-center h-screen gap-x-6">
        <div className="hidden z-10 md:block w-[50%]  ">
          <LeftAuth
            icon={<LoginIcon/>}
            title="Login to Access"
            description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo nulla eligendi quos veniam illum labore inventore iste cumque explicabo corrupti.Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, suscipit!
"
          />
        </div>
        <div className="w-full md:w-[50%] lg:w-[40%] ">
          <LoginForm toast={toast} />
       
        </div>
      </div>
    </div>
  </>
  )
}

export default Login