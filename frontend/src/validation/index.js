import * as Yup from "yup";
export const signUp = Yup.object({
  fName: Yup.string().min(3).max(15).required("First Name is required"),
  lName: Yup.string().min(3).max(15).required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().min(6).max(20).required("Password is required"),
  gender: Yup.string().required("gender is required"),
});

export const signIn = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().min(6).max(20).required("Password is required"),
});

export const findUser = Yup.object({
  email: Yup.string().required("Email is required"),
});

export const userCode = Yup.object({
  code: Yup.string().min("5","Code must be 5 characters").max("5","Code must be 5 characters").required("Code is required"),
});

export const newPassword = Yup.object({
  password: Yup.string().min(6).max(20).required("New Password is required"),
});



