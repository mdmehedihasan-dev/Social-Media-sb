/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";
import PostHome from "../../components/HomeComponents/PostHome";
import ReAuth from "../../components/reAuth";
import { useSelector } from "react-redux";

const Home = ({setVisiable,posts}) => {
  const { userInfo } = useSelector((state) => state.registration);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {userInfo.verified == false && <ReAuth userInfo={userInfo} />}
      <PostHome setVisiable={setVisiable} posts={posts} />
    </>
  );
};

export default Home;
