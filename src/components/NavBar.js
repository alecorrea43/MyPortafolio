import React, { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Hidden from "@mui/material/Hidden";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import GitHubIcon from '@mui/icons-material/GitHub';

import LinkedInIcon from "@mui/icons-material/LinkedIn";

export function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDownloadCV = () => {
    // Lógica para descargar el currículum
    const downloadLink = document.createElement("a");
    downloadLink.href = "/pdf/Profile (7).pdf"; // Reemplazar con tu ruta real
    downloadLink.download = "aljandro-correa-cv.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleLinkedIn = () => {
    // Lógica para la opción de LinkedIn
    window.open(
      "https://www.linkedin.com/in/alejandro-correa-6910b1251/",
      "_blank"
    );
    handleClose();
  };

  const handleGitHub = () => {
    // Lógica para la opción de GitHub
    window.open("https://github.com/alecorrea43", "_blank");
    handleClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#C84810" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              My Portfolio
            </Typography>
            <Hidden smUp>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-describedby={id}
                onClick={handleClick}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  onClick={handleLinkedIn}
                  sx={{ "&:hover": { backgroundColor: "#ddd" } }}
                >
                  LinkedIn
                </MenuItem>
                <MenuItem
                  onClick={handleGitHub}
                  sx={{ "&:hover": { backgroundColor: "#ddd" } }}
                >
                  GitHub
                </MenuItem>
                <MenuItem
                  onClick={handleDownloadCV}
                  sx={{ "&:hover": { backgroundColor: "#ddd" } }}
                >
                  CV
                </MenuItem>
              </Menu>
            </Hidden>
            <Hidden smDown>
              <IconButton color="inherit" onClick={handleLinkedIn}>
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleGitHub}>
                <GitHubIcon />
              </IconButton>
              <Button
                color="inherit"
                onClick={handleDownloadCV}
                sx={{ backgroundColor: "#ff4926", color: "#ffffff" }}
              >
                CV
              </Button>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default NavBar;