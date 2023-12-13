import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { useAuthUser, useSignIn } from "react-auth-kit";
import { useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { paths } from "../common/constants";
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

      if (getAdditionalUserInfo(result).isNewUser) {
        const requestBody = {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
        };

        await axios.post(paths.createNewUserPath + user.uid, requestBody);
        console.log("created new user ->", user.displayName);
      }

      if (
        signIn({
          token: user.accessToken,
          expiresIn: 60,
          tokenType: "Bearer",
          authState: {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          },
        })
      ) {
        navigate("/home");
      }

      console.log("User signed in", user.displayName);
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

  // useEffect(() => {
  //     navigate("/home");
  //   // eslint-disable-next-line
  // }, []);

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
