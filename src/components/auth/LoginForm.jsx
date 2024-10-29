import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  formContainerStyles,
  textFieldStyles,
  buttonStyles,
} from "../../styles/FormStyle";  
//import useAuth from "../../hooks/UseAuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  //const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const loggedIn = login(formData.email, formData.password);
    if (loggedIn) {
      toast.success("Logged in successfully!");
      navigate("/");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formContainerStyles}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>

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

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={buttonStyles}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
