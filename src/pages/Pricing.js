import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";

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

export default function Pricing() {
  const openLink = (url) => {
    window.open(url, "_blank");
  };

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
                  onClick={() => openLink(tier.link)}
                  fullWidth
                  variant={tier.buttonVariant}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
