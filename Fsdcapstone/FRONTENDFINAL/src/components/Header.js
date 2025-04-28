// src/components/Header.js
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)`
  background-color: #000 !important;
  padding: 10px;
`;

const TitleText = styled(Typography)`
  color: #39ff14;
  font-weight: bold;
  cursor: pointer;
`;

const UserButton = styled(Button)`
  color: #39ff14 !important;
  font-weight: bold;
  text-transform: none;
`;

function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  // New function to handle clicking on the logo
  const handleLogoClick = () => {
    if (user) {
      // Assuming user.role exists; adjust if needed.
      if (user.role === "manager") {
        navigate("/manager/dashboard");
      } else if (user.role === "employee") {
        navigate("/kanban");
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TitleText variant="h6" onClick={handleLogoClick}>
            KanbanBoard
          </TitleText>
          {user ? (
            <>
              <UserButton onClick={handleMenuOpen}>
                Signed in as: {user.email}
              </UserButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Typography variant="body1" sx={{ color: "#39ff14" }}>
              Not Signed In
            </Typography>
          )}
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;
