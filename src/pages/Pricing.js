import { Button } from "@mui/material";
import React, { Component, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import NavBar from "./NavBar";
import axios from "axios";
import {
  useAuthUser,
  useIsAuthenticated,
  withIsAuthenticated,
} from "react-auth-kit";
import { paths } from "../common/constants";

const Pricing = () => {
  const [subscribed, setSubscribed] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Start Subscription");
  const auth = useAuthUser();
  const openLink = (url) => {
    window.open(url, "_blank");
  };

  function isUserSubscribed() {
    return false;
  }

  const tiers = [
    {
      title: "Monthly",
      price: "20",
      description: ["Fantasy Screen", "Correlation Tool"],
      buttonText: "Start Subscription",
      buttonVariant: "outlined",
      link: "https://buy.stripe.com/test_3csbKi0lU9WD0KIaEE",
    },
    {
      title: "Yearly",
      subheader: "Save 25% ($180 billed yearly)",
      price: "15",
      description: ["Fantasy Screen", "Correlation Tool"],
      buttonText: "Start Subscription",
      buttonVariant: "outlined",
      link: "https://buy.stripe.com/test_9AQ01AgkSecT6526oq",
    },
    {
      title: "Quarterly",
      subheader: "Save 15% ($51 billed quarterly)",
      price: "17",
      description: ["Fantasy Screen", "Correlation Tool"],
      buttonText: "Start Subscription",
      buttonVariant: "outlined",
      link: "https://buy.stripe.com/test_9AQaGe8Sq2ub6523cd",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await axios.get(paths.getUserPath + auth().uid);
        const isSubscribed = user.data.subscribed;

        if (isSubscribed) {
          setButtonText("Manage Account");
          setSubscribed(true);
        } else {
          setSubscribed(false);
          setButtonText("Start Subscription");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [auth]);

  return (
    <Container maxWidth="md" component="main" sx={{ paddingTop: 15 }}>
      <Grid container spacing={5} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                action={tier.title === "Pro" ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Typography
                  align="center"
                  variant="h4"
                  component="div"
                  sx={{ paddingBottom: 3 }}
                >
                  ${tier.price}/mo
                </Typography>
                {tier.description.map((line) => (
                  <Typography
                    component="li"
                    variant="subtitle1"
                    align="center"
                    key={line}
                  >
                    {line}
                  </Typography>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  onClick={() =>
                    openLink(
                      subscribed
                        ? "https://billing.stripe.com/p/login/test_dR6g2g6mg6W1bcY4gg?prefilled_email=" +
                            auth().email
                        : tier.link +
                            "?client_reference_id=" +
                            auth().uid +
                            "&prefilled_email=" +
                            auth().email
                    )
                  }
                  fullWidth
                  variant={tier.buttonVariant}
                >
                  {buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

class RenderPricing extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Pricing />
      </>
    );
  }
}

export default RenderPricing;
