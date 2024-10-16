/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useSendCodeMutation } from "../../features/api/authApi";

const ResetPassword = ({
  user,
  setSuccess,
  success,
  setVisibile,
  setError,
  error,
}) => {
  const [sendCode] = useSendCodeMutation();

  const handleSendCode = async () => {
    try {
      let result = await sendCode(user.email).unwrap();
      console.log(result);
      setSuccess(result.message);
      setError("");
      setTimeout(() => {
        setVisibile(2);
      }, 3000);
      setSuccess("");
    } catch (error) {
      setError(error.data.message);
    }
  };
  return (
    <div className="bg-white min-w-[320px] w-[520px] px-8 py-4 rounded-md ">
      <h2 className="pb-3 text-xl text-black border-b font-gilroyBold border-lnline_color">
        Reset Password
      </h2>
      <p className="mt-2 text-sm font-gilroyMedium text-title_color">
        How do you want to receive the code to reset your password ?
      </p>
      <div className="w-16 h-16 mx-auto mt-5 rounded-full bg-single_color">
        <img src={user.profilePicture} alt="" />
      </div>
      <div className="flex items-center justify-center mt-3 gap-x-3 ">
        <input type="radio" defaultChecked={true} />
        <span className="text-sm text-black font-gilroyMedium">
          {user.email}
        </span>
      </div>
      <div className="text-center">
        {success && (
          <p className="mt-2 text-sm font-gilroyMedium text-green">{success}</p>
        )}
         {error && (
          <p className="text-base text-red font-gilroyMedium">{error}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Link to={"/login"}>
          <button className="bg-[#f0f2f5] p-3 md:px-5 md:py-2 mt-4 rounded-md mr-3 font-gilroyRegular text-sm md:text-base">
            Not Your ?
          </button>
        </Link>
        <button
          onClick={handleSendCode}
          type="submit"
          className="bg-[#3c7dde] text-white p-3 md:px-5 md:py-2 mt-4 rounded-md mr-3 font-gilroyRegular text-sm md:text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
