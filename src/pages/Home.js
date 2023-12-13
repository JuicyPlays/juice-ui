import React, { Component, useEffect } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { styled } from "@mui/material/styles";
import { Box, Button, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { paths } from "../common/constants";
import { middlesColumnsV1, middlesColumnsV2 } from "../common/columns";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MySelect from "./ReactSelect";
import {
  useAuthUser,
  useIsAuthenticated,
  withIsAuthenticated,
} from "react-auth-kit";
import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

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
            Welcome {auth().name}!
          </Typography>

          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Tools We Offer
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              ✔️ Middling ✔️ Correlation
            </Typography>
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Sports We Track
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              ✔️ NFL ✔️ NBA ✔️ COD ....
            </Typography>
          </Typography>
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Sports Books We Track
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              ✔️ Prize Picks ✔️ Under Dog
            </Typography>
          </Typography>
          {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}></Grid>
      </Container>
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

export default withIsAuthenticated(RenderHome);
