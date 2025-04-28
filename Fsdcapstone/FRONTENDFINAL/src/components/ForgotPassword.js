// src/components/ForgotPassword.js
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.post("/forgot-password", { email });
      setMessage(response.data);
    } catch (error) {
      setMessage("Error sending password reset email.");
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
          Forgot Password
        </Typography>
        <StyledTextField
          label="Enter your email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <NeonButton onClick={handleSubmit}>Send Reset Link</NeonButton>
        {message && (
          <Typography sx={{ mt: 2, color: "#39ff14" }}>{message}</Typography>
        )}
      </FormContainer>
    </Box>
  );
};

export default ForgotPassword;
