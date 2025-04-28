// src/components/Footer.js
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";
import styled from "styled-components";

const StyledFooter = styled(AppBar)`
  background-color: #000 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NeonText = styled(Typography)`
  color: #39ff14;
  font-weight: bold;
`;

function Footer() {
  return (
    <StyledFooter position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <NeonText variant="body2">
            © {new Date().getFullYear()} KanbanBoard
          </NeonText>
          <Box>
            <IconButton href="https://github.com" target="_blank">
              <GitHub sx={{ color: "#39ff14" }} />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank">
              <LinkedIn sx={{ color: "#39ff14" }} />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank">
              <Twitter sx={{ color: "#39ff14" }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </StyledFooter>
  );
}

export default Footer;
