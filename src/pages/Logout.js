import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    signOut();
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return <></>;
};
export default Logout;
