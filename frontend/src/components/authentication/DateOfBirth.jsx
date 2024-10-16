/* eslint-disable react/prop-types */

const DateOfBirth = ({ formik, years, months, getDates, ageError }) => {
  return (
    <>
      <div className="flex gap-x-5">
        <select
          onChange={formik.handleChange}
          autoComplete="off"
          onBlur={formik.handleBlur}
          value={formik.values.bYear}
          name="bYear"
          className="p-2 border rounded-md border-lnline_color font-gilroyRegular w-[33%]"
        >
          <option value=""> Year</option>
          {years.map((year, index) => (
            <option key={index}>{year}</option>
          ))}
        </select>

        <select
          onChange={formik.handleChange}
          autoComplete="off"
          onBlur={formik.handleBlur}
          name="bMonth"
          value={formik.values.bMonth}
          className="p-2 border rounded-md border-lnline_color font-gilroyRegular w-[33%]"
        >
          <option value=""> Month</option>

          {months.map((month, index) => (
            <option key={index}>{month}</option>
          ))}
        </select>

        <select
          onChange={formik.handleChange}
          name="bDay"
          value={formik.values.bDay}
          autoComplete="off"
          onBlur={formik.handleBlur}
          className="p-2 border rounded-md border-lnline_color font-gilroyRegular w-[33%]"
        >
          <option value=""> Date</option>

          {getDates.map((date, index) => (
            <option key={index}>{date}</option>
          ))}
        </select>
      </div>
      {ageError && (
        <p className="my-2 text-red font-gilroyRegular">{ageError}</p>
      )}
    </>
  );
};

export default DateOfBirth;
