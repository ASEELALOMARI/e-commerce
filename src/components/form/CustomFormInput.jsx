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
  imageURL,
  setImageURL,
}) {
  if (type === "file") {
    return (
      <div>
        {!imageFile ? (
          // Case 1: No image file, show button or imageURL preview if available
          imageURL ? (
            // Display image from imageURL if it exists
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <img
                src={imageURL}
                alt={label}
                style={{ width: "100%", maxWidth: 200, borderRadius: 8 }}
              />
              <IconButton
                onClick={() => {
                  setImageFile(null);
                  setImageURL(null);
                }}
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
          ) : (
            // Display upload button if no imageURL
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
          )
        ) : (
          // Case 2: Image file is present, show preview of the uploaded file
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
      </div>
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
