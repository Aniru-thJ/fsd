// src/components/ResetPassword.js
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "./api";
import StyledTextField from "./StyledTextField";

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  padding: 30px;
  background-color: #000;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(57, 255, 20, 0.6);
`;

const NeonButton = styled(Button)`
  && {
    background-color: #39ff14;
    color: #000;
    font-weight: bold;
    &:hover {
      background-color: #2fd310;
    }
  }
`;

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Get token from query params
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/reset-password", {
        token,
        newPassword,
      });
      setMessage(response.data);
      setTimeout(() => navigate("/employee/signin"), 2000);
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#121212"
    >
      <FormContainer>
        <Typography variant="h5" sx={{ color: "#39ff14", textAlign: "center" }}>
          Reset Password
        </Typography>
        <StyledTextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <NeonButton onClick={handleSubmit}>Reset Password</NeonButton>
        {message && (
          <Typography sx={{ mt: 2, color: "#39ff14" }}>{message}</Typography>
        )}
      </FormContainer>
    </Box>
  );
};

export default ResetPassword;
