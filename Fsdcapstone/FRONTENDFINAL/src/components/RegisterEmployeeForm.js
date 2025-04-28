// src/components/RegisterEmployeeForm.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import styled from "styled-components";
import { kanbanApi } from "./api";

const FormContainer = styled(Paper)`
  width: 80%;
  padding: 20px;
  background-color: #000 !important;
  color: white;
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

function RegisterEmployeeForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      await kanbanApi.post("/users/adduser", data);
      console.log("Employee Registered:", data);
      setSuccessMessage("Employee registered successfully");
      setErrorMessage("");
      // Close the form after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error registering employee:", err);
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" sx={{ color: "#39ff14", textAlign: "center" }}>
        Register New Employee
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ style: { color: "#39ff14" } }}
            sx={{
              input: { color: "white" },
              label: { color: "#39ff14" },
              "& fieldset": { borderColor: "#39ff14" },
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: "#39ff14" } }}
            sx={{
              input: { color: "white" },
              label: { color: "#39ff14" },
              "& fieldset": { borderColor: "#39ff14" },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                message:
                  "Password must contain letters, numbers, and special characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: "#39ff14" } }}
            sx={{
              input: { color: "white" },
              label: { color: "#39ff14" },
              "& fieldset": { borderColor: "#39ff14" },
            }}
          />
          {errorMessage && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body2" sx={{ color: "green" }}>
              {successMessage}
            </Typography>
          )}
          <NeonButton type="submit" fullWidth>
            Register
          </NeonButton>
          <Button
            onClick={onClose}
            fullWidth
            variant="outlined"
            sx={{ color: "#39ff14", borderColor: "#39ff14" }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </FormContainer>
  );
}

export default RegisterEmployeeForm;
