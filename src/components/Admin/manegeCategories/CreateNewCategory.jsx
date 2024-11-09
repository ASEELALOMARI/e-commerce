import React, { useState } from "react";
import CustomForm from "../../form/CustomForm";
import { Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import UseCategoriesContext from "../../../hooks/UseCategoriesContext";
import useAuthContext from "../../../hooks/UseAuthContext";
import { createNewCategory } from "../../../services/CategoriesServices";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import { uploadImageToCloudinary } from "../../../utility/UploadImage";

const fields = [
  {
    label: "Category Name",
    type: "text",
    id: "Category-name",
    name: "CategoryName",
    placeholder: "Category Name",
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  {
    label: "Image",
    type: "file",
    id: "Product-image",
    name: "image",
    required: true,
  },
];

function CreateNewCategory() {
  const [isLoading, setIsLoading] = useState();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { addCategory } = UseCategoriesContext();

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const ImageURL = await uploadImageToCloudinary(formData.image);

      const requestData = {
        CategoryName: formData.CategoryName,
        imageURL: ImageURL,
      };

      const response = await createNewCategory(requestData, token);
      addCategory(response.data);
      showSuccessMessage(response.message);
      navigate("../manage-categories");
    } catch (error) {
      showErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        boxShadow: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomForm
          formTitle="Add New Category"
          fields={fields}
          onSubmit={handleSubmit}
        />
        {isLoading && <CircularProgress />}
      </Box>
    </Paper>
  );
}

export default CreateNewCategory;
