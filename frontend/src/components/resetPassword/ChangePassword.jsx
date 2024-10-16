/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { newPassword } from "../../validation";
import { useChangePasswordMutation } from "../../features/api/authApi";

const ChangePassword = ({
  user,
  setSuccess,
  success,
  setVisibile,
  setError,
  error,
}) => {
  const navigate = useNavigate()

  const [changePassword] = useChangePasswordMutation()

  const initialState = {
    password: "",
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: newPassword,
    onSubmit: async () => {
      await changeOldPassword();
    },
  });

  const changeOldPassword = async ()=>{
    try {
       let result = await changePassword({
        email:user.email,
        password:formik.values.password
       }).unwrap()
       setSuccess(result.message)
       setError("")
       console.log(result)
       setTimeout(()=>{
        navigate("/login")
       },2000)
       setSuccess("")
    } catch (error) {
      setError(error.data.message)
    }
  }

  let { errors, touched } = formik;
  return (
    <div className="bg-white min-w-[320px] w-[520px] px-8 py-4 rounded-md ">
      <h2 className="pb-3 text-xl text-black border-b font-gilroyBold border-lnline_color">
        Change Password
      </h2>
      <p className="mt-2 text-base font-gilroyMedium text-title_color">
        Pick a Strong Password
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          name="password"
          type="password"
          placeholder="enter your new password"
          className="w-full p-3 mt-5 text-sm border border-solid rounded-md border-lnline_color font-gilroyRegular focus:outline-none"
        />
        {errors.password && touched.password && (
          <p className="text-base text-red font-gilroyMedium">
            {errors.password}
          </p>
        )}
         {success &&  (
          <p className="text-base text-red font-gilroyMedium">
            {success}
          </p>
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
