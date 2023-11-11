import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@mui/material";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const isAuthenticated = useIsAuthenticated();

  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     navigate("/home");
  //   }
  //   // eslint-disable-next-line
  // }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (
        signIn({
          token: tokenResponse["access_token"],
          expiresIn: 60,
          tokenType: "Bearer",
        })
      ) {
        console.log(isAuthenticated());
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
