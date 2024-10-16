/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../validation";
import { useLoggedInMutation } from "../../features/api/authApi";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { loggedInUsers } from "../../features/user/authSlice";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ toast }) => {
  const [logInUser, { isLoading }] = useLoggedInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    const signInMutation = await logInUser({
      email: formik.values.email,
      password: formik.values.password,
    });
    if (signInMutation?.error) {
      toast.error(signInMutation?.error?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        theme: "light",
      });
      return;
    }
    const { message, ...rest } = signInMutation.data;
    localStorage.setItem("user", JSON.stringify(rest));
    dispatch(loggedInUsers(rest));
    navigate("/");
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signIn,
    onSubmit: () => {
      login();
      formik.resetForm();
    },
  });

  const { errors, touched } = formik;

  return (
    <>
      <div className="w-full rounded-lg shadow-md p-7">
        <form onSubmit={formik.handleSubmit}>
          <input
            className={
              errors.email && touched.email
                ? "w-full px-4 py-2 border rounded-md border-lnline_color focus:outline-none"
                : "w-full px-4 py-2 mb-5 border rounded-md border-lnline_color focus:outline-none"
            }
            type="email"
            placeholder="example@gmail.com"
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {errors.email && touched.email && (
            <p className="my-2 text-red font-gilroyRegular">{errors.email} </p>
          )}

          <input
            className={
              errors.password && touched.password
                ? "w-full px-4 py-2 border rounded-md border-lnline_color focus:outline-none"
                : "w-full px-4 py-2 mb-5 border rounded-md border-lnline_color focus:outline-none"
            }
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {errors.password && touched.password && (
            <p className="my-2 text-red font-gilroyRegular">
              {errors.password}{" "}
            </p>
          )}

          <div className="items-center justify-between w-full mt-5 sm:flex">
            {isLoading ? (
              <button
                disabled
                type="submit"
                className="px-4 py-2 bg-black rounded-full text-page_color"
              >
                <BeatLoader color="#fff" />
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black rounded-full text-page_color"
              >
                Login
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 gap-x-2">
            <p className="text-xs lg:text-base sm:mt-0 font-gilroyMedium">
              Don't have an Account ?{" "}
              <Link
                className="text-single_color font-gilroyBold"
                to="/registration"
              >
                Sign Up
              </Link>
            </p>

            <Link
              className="text-xs text-red xl:text-lg sm:mt-0 font-gilroyMedium"
              to={"/forget"}
            >
              Forget Password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
