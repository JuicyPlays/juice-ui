import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const isAuthenticated = true;
    console.log("USER IS AUTHENTICATED", event);

    if (isAuthenticated) {
      navigate("/home");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h2" variant="h5">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleSubmit(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </Typography>
      </Box>
    </Container>
  );
}
