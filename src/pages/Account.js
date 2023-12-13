// https://billing.stripe.com/p/login/test_dR6g2g6mg6W1bcY4gg

import { Component } from "react";
import NavBar from "./NavBar";
import { Button } from "@mui/material";
import {
  useAuthUser,
  useIsAuthenticated,
  withIsAuthenticated,
} from "react-auth-kit";

const Account = () => {
  const auth = useAuthUser();
  const openLink = (url) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <Button
        onClick={() =>
          openLink(
            "https://billing.stripe.com/p/login/test_dR6g2g6mg6W1bcY4gg?prefilled_email=" +
              auth().email
          )
        }
      >
        Manage Account
      </Button>
    </>
  );
};

class RenderAccount extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Account />
      </>
    );
  }
}

export default RenderAccount;
