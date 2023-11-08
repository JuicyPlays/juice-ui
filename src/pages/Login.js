import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const isAuthenticated = true;
      console.log("USER IS AUTHENTICATED", tokenResponse);

      if (isAuthenticated) {
        navigate("/home");
      }
    },
  });

  return (
    <div style={styles.container}>
      <Button onClick={() => login()}>Sign in with Google 🚀</Button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
};

export default Login;
