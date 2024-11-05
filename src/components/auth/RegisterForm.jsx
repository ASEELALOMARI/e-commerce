import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  formContainerStyles,
  textFieldStyles,
  buttonStyles,
} from "../../styles/FormStyle";
import useAuthContext from "../../hooks/UseAuthContext";
import { registerUser } from "../../services/AuthServices";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../utility/ToastMessages";
import AuthLayout from "../layouts/AuthLayout";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(userData);
      if (response.statusCode == "201") {
        const successMessage = response.message;
        showSuccessMessage(successMessage);
        navigate("../login");
      }
    } catch (err) {
      const errorMessage = err.response.data.message;
      showErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
      await register(registerData);
    }
  };

  return (
    <AuthLayout
      image={
        "https://res.cloudinary.com/dligtpmdv/image/upload/v1730749737/Group_of_customers_shopping_in_online_store_and_huge_tablet_ynkuum.jpg"
      }
      title={"Join Us Today!"}
      message={
        "Create an account to enjoy exclusive benefits and a seamless shopping experience."
      }
    >
      <Box component="form" onSubmit={handleSubmit}>
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
    </AuthLayout>
  );
};

export default RegisterForm;
