/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { userCode } from "../../validation";
import { useVerifyCodeMutation } from "../../features/api/authApi";

const SecretCode = ({
  user,
  setSuccess,
  success,
  setVisibile,
  setError,
  error,
  setLoading,
}) => {
  const [verifyCode] = useVerifyCodeMutation();

  const initialState = {
    code: "",
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: userCode,
    onSubmit: async () => {
      await verifySecretCode();
    },
  });

  const verifySecretCode = async () => {
    try {
      setLoading(true);
      const result = await verifyCode({
        email: user.email,
        code: formik.values.code,
      }).unwrap();
      console.log(result);
      setSuccess(result.message);
      setError("");
      setTimeout(() => {
        setVisibile(3);
        setSuccess("");
      }, 3000);
    } catch (error) {
      setError(error.data.message);
      console.log(error);
    }
  };

  const { errors, touched } = formik;

  return (
    <div className="bg-white min-w-[320px] w-[520px] px-8 py-4 rounded-md ">
      <h2 className="pb-3 text-xl text-black border-b font-gilroyBold border-lnline_color">
        Verification Code
      </h2>
      <p className="mt-2 text-base font-gilroyMedium text-title_color">
        please enter the code that has been sent to your email
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="code"
          autoComplete="off"
          onBlur={formik.handleBlur}
          value={formik.values.code}
          onChange={formik.handleChange}
          placeholder="enter your verification code"
          className="w-full p-3 mt-5 text-sm border border-solid rounded-md border-lnline_color font-gilroyRegular focus:outline-none"
        />
        {errors.code && touched.code && (
          <p className="text-base text-red font-gilroyMedium">{errors.code}</p>
        )}
        {success && (
          <p className="text-base text-green font-gilroyMedium">{success}</p>
        )}
        {error && (
          <p className="text-base text-red font-gilroyMedium">{error}</p>
        )}
        <div className="w-full h-[1px] bg-lnline_color mt-2 "></div>
        <Link to={"/login"}>
          <button className="bg-[#f0f2f5] p-3 md:px-5 md:py-2 mt-4 rounded-md mr-3 font-gilroyRegular text-sm md:text-base">
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="bg-[#3c7dde] text-white p-3 md:px-5 md:py-2 mt-4 rounded-md mr-3 font-gilroyRegular text-sm md:text-base"
        >
          continue
        </button>
      </form>
    </div>
  );
};

export default SecretCode;
