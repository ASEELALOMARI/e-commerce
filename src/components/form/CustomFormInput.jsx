import React from "react";
import PropTypes from "prop-types";
import { TextField, Button, IconButton, Box, Typography } from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

function CustomFormInput({
  label,
  type,
  id,
  placeholder,
  value,
  name,
  onChange,
  error,
  options,
  handleImageChange,
  imageFile,
  setImageFile,
}) {
  if (type === "file") {
    return (
      <Box sx={{ width: "100%" }}>
        {!imageFile ? (
          <Button
            variant="contained"
            component="label"
            color="primary"
            startIcon={<PhotoCamera />}
            sx={{ width: "fit-content" }}
          >
            {label}
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        ) : (
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <img
              src={URL.createObjectURL(imageFile)}
              alt={label}
              style={{ width: "100%", maxWidth: 200, borderRadius: 8 }}
            />
            <IconButton
              onClick={() => setImageFile(null)}
              color="secondary"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        )}
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
    );
  } else if (type === "select") {
    return (
      <TextField
        select
        variant="standard"
        label={label}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error || ""}
        SelectProps={{
          native: true,
        }}
        sx={{ width: "100%" }}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    );
  }

  // Default text, number, etc. inputs
  return (
    <TextField
      variant="standard"
      label={label}
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error || ""}
      sx={{ width: "100%" }}
    />
  );
}

CustomFormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.array,
  handleImageChange: PropTypes.func,
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func,
};

export default CustomFormInput;
