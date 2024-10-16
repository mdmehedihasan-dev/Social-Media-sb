/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { findUser } from "../../validation";
import { useMatchUserMutation } from "../../features/api/authApi";
const FindAccount = ({ setLoading, setError, error, setUser, setVisibile }) => {
  const [matchUser] = useMatchUserMutation();

  const initialState = {
    email: "",
  };
  const formik = useFormik({
    initialValues: initialState,
    validationSchema: findUser,
    onSubmit: () => {
      findUserResult();
    },
  });

  const findUserResult = async () => {
    try {
      setLoading(true);
      let result = await matchUser(formik.values.email).unwrap();
      setUser(result);
      setVisibile(1);
      setError("");
    } catch (error) {
      setError(error.data.message);
      console.log(error);
    }
  };

  let { errors, touched } = formik;
  return (
    <div className="bg-white min-w-[320px] w-[520px] px-8 py-4 rounded-md ">
      <h2 className="pb-3 text-xl text-black border-b font-gilroyBold border-lnline_color">
        Find Your Account
      </h2>
      <p className="mt-2 text-base font-gilroyMedium text-title_color">
        please enter your email address or phone number to find your account
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
          name="email"
          type="email"
          placeholder="email address or phone number"
          className="w-full p-3 mt-5 text-sm border border-solid rounded-md border-lnline_color font-gilroyRegular focus:outline-none"
        />
        {errors.email && touched.email && (
          <p className="text-base text-red font-gilroyMedium">{errors.email}</p>
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
          Search
        </button>
      </form>
    </div>
  );
};

export default FindAccount;
