/* eslint-disable react/prop-types */

const LeftAuth = ({title,description,icon }) => {
  return (
    <div >
        <div>
          {icon}
          {/* <img src="../../../public/registration.png" alt="" /> */}
        </div>
        <h2 className="text-4xl xl:text-7xl font-gilroyBold text-single_color">{title}</h2>
        <p className="mt-5 text-lg font-gilroyRegular ">{description}</p>
    </div>
  )
}

export default LeftAuth