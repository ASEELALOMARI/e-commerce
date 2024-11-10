import React, { useEffect, useState } from "react";
import CustomForm from "../../form/CustomForm";
import { Box, CircularProgress, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { uploadImageToCloudinary } from "../../../utility/UploadImage";
import { createNewProduct } from "../../../services/ProductsService";
import useAuthContext from "../../../hooks/UseAuthContext";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import UseProductsContext from "../../../hooks/UseProductsContext";
import { getCategoriesList } from "../../../services/CategoriesServices";

function CreateNewProduct() {
  const [fields, setFields] = useState([
    {
      label: "Product Name",
      type: "text",
      id: "Product-name",
      name: "name",
      placeholder: "Product Name",
      required: true,
      minLength: 3,
      maxLength: 25,
    },
    {
      label: "Price",
      type: "number",
      id: "Product-price",
      name: "price",
      placeholder: "Price",
      required: true,
      min: 1,
    },
    {
      label: "Description",
      type: "text",
      id: "Product-Description",
      name: "Description",
      placeholder: "Description",
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    {
      label: "Stock Quantity",
      type: "number",
      id: "Stock-Quantity",
      name: "stockQuantity",
      placeholder: "Quantity",
      required: true,
      min: 0,
    },
    {
      label: "Category",
      type: "select",
      id: "Category",
      name: "categoryId",
      options: [],
      required: true,
    },
    {
      label: "Image",
      type: "file",
      id: "Product-image",
      name: "image",
      required: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState();
  const { addProduct } = UseProductsContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await getCategoriesList();
        const categories = response.data.items.$values;

        // Map categories to desired format for the select input
        const options = categories.map((category) => ({
          label: category.categoryName,
          value: category.id,
        }));

        // Update fields array with the fetched options
        setFields((prevFields) =>
          prevFields.map((field) =>
            field.name === "categoryId" ? { ...field, options } : field
          )
        );
      } catch (error) {
        showErrorMessage("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const ImageURL = await uploadImageToCloudinary(formData.image);

      const requestData = {
        name: formData.name,
        price: formData.price,
        description: formData.Description,
        stockQuantity: formData.stockQuantity,
        categoryId: formData.categoryId,
        imageURL: ImageURL,
      };

      const response = await createNewProduct(requestData, token);
      addProduct(response.data);
      showSuccessMessage(response.message);
      navigate("../manage-products");
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
          formTitle="Add New Product"
          fields={fields}
          onSubmit={handleSubmit}
        />
        {isLoading && <CircularProgress />}
      </Box>
    </Paper>
  );
}

export default CreateNewProduct;
