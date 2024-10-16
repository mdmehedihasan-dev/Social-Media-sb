import { Helmet } from "react-helmet-async";
import PostHome from "../../components/HomeComponents/PostHome";
import Activate from "./Activate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useVerifiedUserMutation } from "../../features/api/authApi";
import { loggedInUsers } from "../../features/user/authSlice";

const ActivatePage = () => {
  const navigate = useNavigate()
  const [verifiedUser] = useVerifiedUserMutation()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const {userInfo} = useSelector((state)=>state.registration)
  const {token} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    activateUser()
  },[])

  const activateUser = async ()=>{
    try {
      setLoading(true)
      const result = await verifiedUser({
        token,userToken:userInfo.token,}).unwrap()
        setSuccess(result.message)
        setError("")
        localStorage.setItem("user",JSON.stringify({...userInfo,verified:true}))
        dispatch(loggedInUsers({...userInfo,verified:true}))
        setTimeout(()=>{
          setSuccess("")
          navigate("/")
        },3000)
    } catch (error) {
      setError(error.data.message);
      setTimeout(()=>{
        setLoading(false)
        navigate("/")
      },3000)
    }
  }
  

  return (
    <>
      <Helmet>
        <title>ActivatePage</title>
      </Helmet>
      {success && (
        <Activate
          text={success}
          loading={loading}
          type="success"
          head="Account Successfully Activated"
        />
      )}

      {error && (
        <Activate
          text={error}
          loading={loading}
          type="error"
          head="Account Activation Failed"
        />
      )}
      <PostHome />
    </>
  );
};

export default ActivatePage;
