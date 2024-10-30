import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  formContainerStyles,
  textFieldStyles,
  buttonStyles,
} from "../../styles/FormStyle";
import useAuth from "../../hooks/UseAuth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  const { register, AuthError, AuthSuccess, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isValidationInput = () => {
    const newErrors = {};
    if (!formData.username.trim() || formData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }
    //todo complete the validation

    setErrorMessage(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidationInput()) {
      const registerData = {
        userName: formData.username,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      };
      const registered = await register(registerData);
      if (registered) {
        toast.success(`User registered successfully!${AuthSuccess}`);
        navigate("../login");
      } else {
        toast.error(`Invalid credentials.${AuthError} Please try again.`);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formContainerStyles}>
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        sx={textFieldStyles}
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        type="email"
        sx={textFieldStyles}
      />
      <TextField
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        required
        type="password"
        sx={textFieldStyles}
      />
      <TextField
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        type="text"
        sx={textFieldStyles}
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        type="phone"
        sx={textFieldStyles}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={buttonStyles}
      >
        Register
      </Button>
      {isLoading && (
        <Box m={2}>
          <CircularProgress color="primary" />
        </Box>
      )}
    </Box>
  );
};

export default RegisterForm;
