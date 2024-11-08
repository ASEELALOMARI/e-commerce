import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Container, Typography, Button } from "@mui/material";
import CustomFormInput from "./CustomFormInput";

function UpdatedFrom({ formTitle = "Form", fields, onSubmit, initialData = {} }) {
  // Set initial state with `initialData` if provided, or an empty object
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState();

  // Update formData with initialData whenever initialData changes
  useEffect(() => {
    setFormData(initialData);
    setImageURL(initialData && initialData.imageURL);
  }, []);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? event.target.files[0] : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      // Required field validation
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Text length validation
      if (field.type === "text" && value) {
        if (field.minLength && value.length < field.minLength) {
          newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
        }
        if (field.maxLength && value.length > field.maxLength) {
          newErrors[field.name] = `${field.label} must be no more than ${field.maxLength} characters`;
        }
      }

      // Minimum and maximum number validation
      if (field.type === "number" && value) {
        const numericValue = parseFloat(value);
        if (field.min !== undefined && numericValue < field.min) {
          newErrors[field.name] = `${field.label} must be at least ${field.min}`;
        }
        if (field.max !== undefined && numericValue > field.max) {
          newErrors[field.name] = `${field.label} must be no more than ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {formTitle}
      </Typography>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleFormSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 4,
          width: "100%",
        }}
      >
        {fields.map((field) => (
          <CustomFormInput
            key={field.name}
            label={field.label}
            type={field.type}
            id={field.id}
            placeholder={field.placeholder}
            value={formData[field.name] || ""}
            name={field.name}
            onChange={field.type === "file" ? handleImageChange : handleChange}
            error={errors[field.name]}
            options={field.options}
            handleImageChange={handleImageChange}
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageURL={imageURL}
            setImageURL={setImageURL}
          />
        ))}
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
}

UpdatedFrom.propTypes = {
  formTitle: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      name: PropTypes.string.isRequired,
      required: PropTypes.bool,
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      min: PropTypes.number,
      max: PropTypes.number,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object, // Optional initial data for pre-populating fields
};

export default UpdatedFrom;
