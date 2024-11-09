import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CircularProgress, Paper } from "@mui/material";

import UseCategoriesContext from "../../../hooks/UseCategoriesContext";
import useAuthContext from "../../../hooks/UseAuthContext";
import {
  GetCategoryByID,
  updateCategory,
} from "../../../services/CategoriesServices";
import UpdatedFrom from "../../form/UpdatedForm";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import { urlToFile } from "../../../utility/imageURLtoFile";
import { uploadImageToCloudinary } from "../../../utility/UploadImage";

function UpdateCategory() {
  const [isLoading, setIsLoading] = useState();
  const [category, setCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { editCategory } = UseCategoriesContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const fields = [
    {
      label: "Category Name",
      type: "text",
      id: "category-Name",
      name: "categoryName",
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
    },
  ];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await GetCategoryByID(id);
        setCategory(categoryData.data);
      } catch (error) {
        showErrorMessage(`Error fetching Category details: ${error.message}`);
      }
    };

    fetchCategory();
  }, [id]);

  useEffect(() => {
    const convertImage = async () => {
      if (category) {
        const imageUrl = category.imageUrl;
        const file = await urlToFile(imageUrl, "image.jpg");
        setImageFile(file);
      }
    };

    convertImage();
  }, [category]);

  useEffect(() => {
    if (imageFile) {
      setCategory((prevState) => ({
        ...prevState,
        image: imageFile,
      }));
    }
  }, [imageFile]);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      if (formData && formData.image) {
        const imageURL = await uploadImageToCloudinary(formData.image);
        formData.imageURL = imageURL;

        const requestData = {
          categoryName: formData.categoryName,
          imageURL: formData.imageURL,
        };
        if (requestData) {
          const response = await updateCategory(id, requestData, token);
          editCategory(response.data);
          showSuccessMessage(response.message);
          navigate("../manage-categories");
        }
      }
    } catch (error) {
      showErrorMessage(error.response.data.message || error.response);
  
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
        {imageFile && (
          <UpdatedFrom
            formTitle="Update Category"
            fields={fields}
            initialData={category}
            onSubmit={handleSubmit}
          />
        )}
        {isLoading && <CircularProgress />}
      </Box>
    </Paper>
  );
}

export default UpdateCategory;
