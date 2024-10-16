import FriendsRightPart from "./FriendsRightPart";
import Stories from "./stories/Stories";

const RightPart = () => {
  return (
    <div>
      <div>
        <FriendsRightPart />
      </div>
      <div className="mt-5">
        <Stories />
      </div>
    </div>
  );
};

export default RightPart;
