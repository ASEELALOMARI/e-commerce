import React, { useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Register function
  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await registerUser(userData);
      if (response.statusCode === 201) {
        showSuccessMessage(response.message);
        navigate("../login");
      }
    } catch (err) {
      showErrorMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isValidationInput = () => {
    const errors = {};

    if (!formData.username.trim() || formData.username.length < 3) {
      errors.username = "Username must be at least 3 characters long.";
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 7) {
      errors.password = "Password must be at least 7 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (
      formData.address &&
      (formData.address.length < 10 || formData.address.length > 500)
    ) {
      errors.address = "Address must be between 10 and 500 characters.";
    }
    if (formData.phoneNumber && !/^\d{10,11}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10-11 digits.";
    }
    setErrorMessage(errors);
    return Object.keys(errors).length === 0;
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
      image="https://res.cloudinary.com/dligtpmdv/image/upload/v1731436010/_81802c20-49b1-4724-9cfd-6fdce5bb4b06-removebg-preview_kw4yg6.png"
      title="Join Us Today!"
      message="Create an account to enjoy exclusive benefits and a seamless shopping experience."
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        {[
          { label: "Username", name: "username", type: "text", required: true },
          { label: "Email", name: "email", type: "email", required: true },
          {
            label: "Password",
            name: "password",
            type: "password",
            required: true,
          },
          {
            label: "Confirm Password",
            name: "confirmPassword",
            type: "password",
            required: true,
          },
          { label: "Address", name: "address", type: "text", required: true },
          {
            label: "Phone Number",
            name: "phoneNumber",
            type: "text",
            required: true,
          },
        ].map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required={field.required}
            type={field.type}
            sx={{ mb: 2 }}
            error={Boolean(errorMessage[field.name])}
            helperText={errorMessage[field.name] || ""}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress color={'secondary'} size={24} /> : "Register"}
        </Button>
      </Box>
    </AuthLayout>
  );
};

export default RegisterForm;
