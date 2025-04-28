import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const PageContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
  color: white;
`;

const RoleSelectionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-color: #000;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(57, 255, 20, 0.6);
`;

const NeonButton = styled(Button)`
  && {
    background-color: #39ff14;
    color: #000;
    font-weight: bold;
    width: 200px;
    &:hover {
      background-color: #2fd310;
    }
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <RoleSelectionContainer>
        <Typography variant="h4" sx={{ color: "#39ff14" }}>
          Select Your Role
        </Typography>
        <NeonButton onClick={() => navigate("/manager/signin")}>
          Manager
        </NeonButton>
        <NeonButton onClick={() => navigate("/employee/signin")}>
          Employee
        </NeonButton>
      </RoleSelectionContainer>
    </PageContainer>
  );
};

export default LandingPage;
