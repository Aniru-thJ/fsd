import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { authApi } from "./api";
import { UserContext } from "./UserContext";

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

const NeonTextField = styled(TextField)`
  && {
    label {
      color: #39ff14;
    }
    input {
      color: white;
    }
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #39ff14;
      }
      &:hover fieldset {
        border-color: #2fd310;
      }
      &.Mui-focused fieldset {
        border-color: #39ff14;
      }
    }
  }
`;

const ManagerSignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email to include "manager"
    if (!formData.email.toLowerCase().includes("manager")) {
      setError("Manager email must contain the word 'manager'.");
      return;
    }

    try {
      const response = await authApi.post("/login", formData);
      const token = response.data;
      const managerData = {
        name: "Manager",
        email: formData.email,
        role: "manager",
      };
      login(managerData, token);
      navigate("/manager/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#121212"
    >
      <FormContainer>
        <Typography variant="h5" sx={{ color: "#39ff14", textAlign: "center" }}>
          Manager Sign In
        </Typography>
        {error && <Typography color="red">{error}</Typography>}
        <NeonTextField
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <NeonTextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <NeonButton fullWidth onClick={handleSubmit}>
          Sign In
        </NeonButton>
      </FormContainer>
    </Box>
  );
};

export default ManagerSignIn;
