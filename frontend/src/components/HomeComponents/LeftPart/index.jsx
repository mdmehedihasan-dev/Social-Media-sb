import LeftMenu from "./LeftMenu";
import LeftProfile from "./LeftProfile";
import { LeftData } from "../LeftPart/Data";

const LeftPart = () => {
  return (
    <>
      <div>
        <div>
          <LeftProfile />
        </div>
        <div className="w-3/4 mx-auto mt-5">
          {LeftData.map((data, index) => (
            <LeftMenu key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftPart;
