/* eslint-disable react/prop-types */

const Gender = ({ touched, errors, formik }) => {
  return (
    <>
      <div className="mt-5">
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value="male"
          autoComplete="off"
          type="radio"
          id="Male"
          name="gender"
        />
        <label htmlFor="Male" className="ml-2 font-gilroyRegular">
          Male
        </label>

        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value="female"
          autoComplete="off"
          type="radio"
          id="Female"
          name="gender"
          className="ml-5"
        />
        <label htmlFor="Female" className="ml-2 font-gilroyRegular">
          Female
        </label>
      </div>
      {errors.gender && touched.gender && (
        <p className="my-2 text-red font-gilroyRegular">{errors.gender} </p>
      )}
    </>
  );
};

export default Gender;
