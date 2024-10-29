import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

import { formContainerStyles, textFieldStyles, buttonStyles } from "../../styles/FormStyle";
//import useAuth from "../../hooks/UseAuthContext";

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  //const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registered = register(formData);
    if (registered) {
      toast.success("User registered successfully!");
      navigate("login");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formContainerStyles}>
      <Typography variant="h5" mb={2}>Register</Typography>

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
        required
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
        required
        type="phone"
        sx={textFieldStyles}
      />

      <Button type="submit" variant="contained" color="primary" sx={buttonStyles}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;
