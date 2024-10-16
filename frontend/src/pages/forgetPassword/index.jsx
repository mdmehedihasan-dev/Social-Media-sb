/* eslint-disable no-unused-vars */
import { Helmet } from "react-helmet-async";
import FindAccount from "../../components/resetPassword/FindAccount";
import { useState } from "react";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import SecretCode from "../../components/resetPassword/SecretCode";
import ChangePassword from "../../components/resetPassword/ChangePassword";

const ForgetPassword = () => {
  const [visible, setVisibile] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState();

  const renderComponent = () => {
    switch (visible) {
      case 0:
        return (
          <FindAccount
            setLoading={setLoading}
            setVisibile={setVisibile}
            setError={setError}
            error={error}
            setUser={setUser}
          />
        );
      case 1:
        if (user) {
          return (
            <ResetPassword
              user={user}
              setSuccess={setSuccess}
              success={success}
              setVisibile={setVisibile}
              setError={setError}
              error={error}
            />
          );
        }
        setVisibile(0);
        return null;
      case 2:
        if (user) {
          return <SecretCode 
           user={user}
          setSuccess={setSuccess}
          success={success}
          setVisibile={setVisibile}
          setError={setError}
          setLoading={setLoading}
          error={error} />;
        }
        setVisibile(0);
        return null;

      case 3:
        if (user) {
          return <ChangePassword 
          user={user}
          setSuccess={setSuccess}
          success={success}
          setVisibile={setVisibile}
          setError={setError}
          error={error}
          />;
        }
        setVisibile(0);
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-main_bg to-pink-100 via-cyan-100 ">
        {renderComponent()}
      </div>
    </>
  );
};

export default ForgetPassword;
