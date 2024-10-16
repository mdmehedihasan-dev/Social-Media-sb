import { Outlet } from "react-router-dom";
import LeftPart from "../components/HomeComponents/LeftPart";
import RightPart from "../components/HomeComponents/RightPart";
import Header from "../components/HomeComponents/PostHome/Header";

const RootLayOut = () => {
  return (
    <div className="grid gap-x-5 mx-5 grid-cols-1 xl:mx-10 mt-5 lg:grid-cols-[70px,1fr] xl:grid-cols-[1fr,3fr,1fr] ">
      <div className="hidden lg:block">
        <LeftPart />
      </div>
      <div>
        <div>
          <Header />
        </div>
      <Outlet />
      </div>
      <div  className="hidden xl:block">
        <RightPart />
      </div>
    </div>
  );
};

export default RootLayOut;
