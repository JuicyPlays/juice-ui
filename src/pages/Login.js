import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useSignIn } from "react-auth-kit";
import { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { getAdditionalUserInfo } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (
        signIn({
          token: token,
          expiresIn: 60,
          tokenType: "Bearer",
        })
      ) {
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("token", token);
        localStorage.setItem("expiresIn", 60);
        localStorage.setItem("tokenType", "Bearer");
        navigate("/home");
      }
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      // You can handle the signed-in user information or perform additional actions here.
      console.log("Successfully signed in with Google:", user);
    } catch (error) {
      // // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData?.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      // You can also display an error message to the user or perform other error handling.
      console.error("Error signing in with Google:", errorMessage);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresIn = localStorage.getItem("expiresIn");
    const tokenType = localStorage.getItem("tokenType");

    if (token && expiresIn && tokenType) {
      // Perform authentication with the stored token
      signIn({ token, expiresIn, tokenType });
      navigate("/home");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div style={styles.container}>
      <Button onClick={signInWithGoogle}>Sign in with Google 🚀</Button>
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
