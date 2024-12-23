import React, { useEffect, useState } from "react";
import CustomForm from "../../form/CustomForm";
import { Box, CircularProgress, Paper } from "@mui/material";
import { uploadImageToCloudinary } from "../../../utility/UploadImage";
import { useNavigate, useParams } from "react-router-dom";
import { Update } from "@mui/icons-material";

import {
  fetchProductById,
  updateProduct,
} from "../../../services/ProductsService";
import useAuthContext from "../../../hooks/UseAuthContext";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import UseProductsContext from "../../../hooks/UseProductsContext";
import UpdatedFrom from "../../form/UpdatedForm";
import { urlToFile } from "../../../utility/imageURLtoFile";
import { getCategoriesList } from "../../../services/CategoriesServices";

function UpdateProduct() {
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
      name: "description",
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
      min: 1,
    },
    {
      label: "Category",
      type: "select",
      id: "Category",
      name: "categoryID",
      options: [],
      required: true,
    },
    {
      label: "Image",
      type: "file",
      id: "Product-image",
      name: "image",
    },
  ]);
  const [isLoading, setIsLoading] = useState();
  const [product, setProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { editProduct } = UseProductsContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

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

        // Update fields array with the fetched options and set the selected category for `categoryID`
        setFields((prevFields) =>
          prevFields.map((field) =>
            field.name === "categoryID" ? { ...field, options } : field
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData.data);
      } catch (error) {
        showErrorMessage(`Error fetching product details: ${error.message}`);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const convertImage = async () => {
      if (product) {
        const imageUrl = product.imageUrl;
        const file = await urlToFile(imageUrl, "image.jpg");
        setImageFile(file);
      }
    };

    convertImage();
  }, [product]);

  useEffect(() => {
    if (imageFile) {
      setProduct((prevState) => ({
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
      }
      const requestData = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        stockQuantity: formData.stockQuantity,
        categoryId: formData.categoryID,
        imageURL: formData.imageURL,
      };

      const response = await updateProduct(id, requestData, token);
      editProduct(response.data);
      showSuccessMessage(response.message);
      navigate("../manage-products");
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
            formTitle="Update Product"
            fields={fields}
            initialData={product}
            onSubmit={handleSubmit}
          />
        )}
        {isLoading && <CircularProgress />}
      </Box>
    </Paper>
  );
}

export default UpdateProduct;
