import React, { Component, useEffect } from "react";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAuthUser } from "react-auth-kit";

const Home = () => {
  const user = useAuthUser();

  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome {user().name}!
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

class RenderHome extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Home />
        <Footer />
      </>
    );
  }
}

export default RenderHome;
