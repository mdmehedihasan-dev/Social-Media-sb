/* eslint-disable react/prop-types */
import { useState } from "react";
import { useReVerificitionMutation } from "../../features/api/authApi";

const ReAuth = ({ userInfo }) => {
  const [reVerification] = useReVerificitionMutation();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const resendCode = async () => {
    try {
      let result = await reVerification(userInfo.token).unwrap();
      setSuccess(result.message);
    console.log(result)
    } catch (error) {
      setError(error.data.message);
    console.log(error.data.message)

    }
  };

  return (
    <>
      <div className="w-full p-4 mt-5 bg-white rounded-md shadow-md">
        <h4 className="text-base text-black font-gilroyRegular">
          Your account is not verified. Please verifiy your account before it
          gets delete after an hour of creating
        </h4>
        <button
          onClick={resendCode}
          className="text-base cursor-pointer font-gilroyMedium text-blue hover:underline"
        >
          Click here re-send verification link
        </button>

        {success && (
          <p className="text-base font-gilroyMedium text-green">{success}</p>
        )}

        {error && (
          <p className="text-base font-gilroyMedium text-red">{error}</p>
        )}
      </div>
    </>
  );
};

export default ReAuth;
