import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../App";
import { useSignOut } from "react-auth-kit";

const Logout = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    async function handleSignout() {
      await supabase.auth.signOut();
      signOut();
      navigate("/");
    }

    handleSignout();
  }, [navigate, signOut]);

  return <></>;
};

export default Logout;
