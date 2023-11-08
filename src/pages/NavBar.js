import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { pages } from "../common/constants";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Divider, ListItemIcon } from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";

const titleStyles = {
  mr: 2,
  display: { xs: "none", md: "flex" },
  fontFamily: "monospace",
  fontWeight: 1000,
  letterSpacing: ".3rem",
  color: "inherit",
  textDecoration: "none",
};

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log(navigator.userAgent);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ padding: "20px 0" }}>
      <Container maxWidth="">
        <Toolbar disableGutters>
          <Typography
            variant="h5" // Adjust the font size as needed
            noWrap
            component="a"
            href="/home"
            sx={titleStyles}
          >
            JuicyPlays
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {Array.from(pages).map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/${page.link}`}
                    >
                      {page.title}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RenderNavLinks closeNavMenu={handleCloseNavMenu} />

          {/* The profile, settings, and logout buttons */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon onClick={handleMenuClick} />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Account</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/">
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

class RenderNavLinks extends React.Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {Array.from(pages).map((page) => (
          <Button
            key={page.title}
            onClick={this.props.closeNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/${page.link}`}
            >
              {page.title}
            </Link>
          </Button>
        ))}
      </Box>
    );
  }
}

export default NavBar;
