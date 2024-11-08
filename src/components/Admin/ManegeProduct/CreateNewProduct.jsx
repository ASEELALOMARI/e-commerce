import React, { useState } from "react";
import CustomForm from "../../form/CustomForm";
import { Box, CircularProgress, Paper } from "@mui/material";
import { uploadImageToCloudinary } from "../../../utility/UploadImage";
import { createNewProduct } from "../../../services/ProductsService";
import useAuthContext from "../../../hooks/UseAuthContext";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import { useNavigate } from "react-router-dom";
import UseProductsContext from "../../../hooks/UseProductsContext";

const fields = [
  {
    label: "Product Name",
    type: "text",
    id: "Product-name",
    name: "name",
    placeholder: "Product Name",
    required: true,
    minLength: 3,
    maxLength: 50,
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
    options: [
      { label: "Gifts", value: "f6db1cc9-e420-47a8-a4b0-7fe811f735ea" },
      { label: "Apartment", value: "apartment" },
    ],
    required: true,
  },
  {
    label: "Image",
    type: "file",
    id: "Product-image",
    name: "image",
    required: true,
  },
];

function CreateNewProduct() {
  const [isLoading, setIsLoading] = useState();
  const { addProduct } = UseProductsContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();

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
