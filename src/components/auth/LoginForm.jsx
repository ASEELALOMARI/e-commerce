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
import { loginUser } from "../../services/AuthServices";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../utility/ToastMessages";
import AuthLayout from "../layouts/AuthLayout";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setToken, setIsLoggedIn, setIsAdmin } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const loginData = {
        Email: email,
        Password: password,
      };
      const response = await loginUser(loginData);

      if (response.statusCode == "200") {
        const { token, username, userId, isAdmin } = response.data;
        // Set state and localStorage
        const userInfo = { username, userId };
        setUser(userInfo);
        setToken(token);
        setIsLoggedIn(true);
        setIsAdmin(isAdmin);

        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");

        const successMessage = response.message;
        showSuccessMessage(successMessage);
        navigate("/");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <AuthLayout
      image={
      'https://res.cloudinary.com/dligtpmdv/image/upload/v1731436010/_81802c20-49b1-4724-9cfd-6fdce5bb4b06-removebg-preview_kw4yg6.png'
      }
      title={"Welcome Back"}
      message={"Please log in to your account to continue"}
    >
      <Box component="form" onSubmit={handleSubmit}>
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
        {isLoading && (
          <Box m={2}>
            <CircularProgress color="primary" />
          </Box>
        )}
      </Box>
    </AuthLayout>
  );
};

export default LoginForm;
