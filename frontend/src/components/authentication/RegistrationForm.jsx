/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signUp } from "../../validation";
import { useState } from "react";
import DateOfBirth from "./DateOfBirth";
import Gender from "./Gender";
import { useAddUserMutation } from "../../features/api/authApi";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";


const initialState = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  bYear: new Date().getFullYear(),
  bMonth: new Date().getMonth() + 1,
  bDay: new Date().getDate(),
  gender: "",
};

const RegistrationForm = ({ toast }) => {
  const [ageError, setAgeError] = useState("");
  const [addUser, { isLoading }] = useAddUserMutation();
  const navigate = useNavigate()

  // data fetching
  const registration = async () => {
    const signUpMutation = await addUser({
      fName: formik.values.fName,
      lName: formik.values.lName,
      email: formik.values.email,
      password: formik.values.password,
      bYear: formik.values.bYear,
      bMonth: formik.values.bMonth,
      bDay: formik.values.bDay,
      gender: formik.values.gender,
    });
    if (signUpMutation?.data) {
      toast.success(signUpMutation?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        theme: "light",
      });
      setTimeout(()=>{
        navigate("/login")
      },2000)
    } else if (signUpMutation?.error) {
      toast.error(signUpMutation?.error?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        theme: "light",
      });
    }
  };

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: signUp,
    onSubmit: () => {
      const currentDate = new Date();
      const picked_Date = new Date(
        formik.values.bYear,
        formik.values.bMonth - 1,
        formik.values.bDay
      );
      const adult = new Date(1970 + 18, 0, 1);
      const tooOld = new Date(1970 + 70, 0, 1);
      if (currentDate - picked_Date < adult) {
        return setAgeError("Underage you are not 18");
      } else if (currentDate - picked_Date > tooOld) {
        return setAgeError("more than 70");
      }
      registration();
      formik.resetForm();
      setAgeError("")
     
      
    },
  });

  const { errors, touched } = formik;

  const tempYears = new Date().getFullYear();

  const years = Array.from(new Array(105), (val, index) => tempYears - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const day = () => {
    return new Date(formik.values.bYear, formik.values.bMonth, 0).getDate();
  };

  const getDates = Array.from(new Array(day()), (val, index) => 1 + index);

  return (
    <>
      <div className="w-full rounded-lg shadow-md p-7">
        <form onSubmit={formik.handleSubmit}>
          <input
            className={
              errors.fName && touched.fName
                ? "w-full px-4 py-2 border rounded-md border-lnline_color focus:outline-none"
                : "w-full px-4 py-2 mb-5 border rounded-md border-lnline_color focus:outline-none"
            }
            type="text"
            placeholder="First Name"
            onChange={formik.handleChange}
            name="fName"
            value={formik.values.fName}
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {errors.fName && touched.fName && (
            <p className="my-2 text-red font-gilroyRegular">{errors.fName} </p>
          )}
          <input
            className={
              errors.lName && touched.lName
                ? "w-full px-4 py-2 border rounded-md border-lnline_color focus:outline-none"
                : "w-full px-4 py-2 mb-5 border rounded-md border-lnline_color focus:outline-none"
            }
            type="text"
            placeholder="Last Name"
            onChange={formik.handleChange}
            name="lName"
            value={formik.values.lName}
            autoComplete="off"
            onBlur={formik.handleBlur}
          />
          {errors.lName && touched.lName && (
            <p className="my-2 text-red font-gilroyRegular">{errors.lName} </p>
          )}

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
          {/* date of birth component===================  */}
          <DateOfBirth
            formik={formik}
            years={years}
            months={months}
            getDates={getDates}
            ageError={ageError}
          />
          {/* Gender inputs===================  */}
          <Gender formik={formik} touched={touched} errors={errors} />

          <div className="items-center justify-between mt-5 sm:flex">
            {isLoading ? (
              <button
                disabled
                type="submit"
                className="px-4 py-2 bg-black rounded-full text-page_color"
              >
                 <BeatLoader color="#fff"/>
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-black rounded-full text-page_color"
              >
                Submit
              </button>
            )}

            <p className="mt-5 text-sm lg:text-base xl:text-lg sm:mt-0 font-gilroyMedium">
              Already have an Account ?{" "}
              <Link className="text-single_color font-gilroyBold" to="/login">
                Sing In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
