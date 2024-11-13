import React from "react";
import CustomForm from "./CustomForm";

const fields = [
    {
      label: "Product Name",
      type: "text",
      id: "Product-name",
      name: "title",
      placeholder: "Product Name",
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    {
      label: "Description",
      type: "text",
      id: "Product-Description",
      name: "Description",
      placeholder: "Description",
      required: true,
      minLength: 10,
      maxLength: 50,
    },
    {
      label: "Price",
      type: "number",
      id: "Product-price",
      name: "price",
      placeholder: "Price",
      required: true,
      min: 0,
    },
    {
      label: "Product Type",
      type: "select",
      id: "Product-type",
      name: "type",
      options: [
        { label: "House", value: "house" },
        { label: "Apartment", value: "apartment" },
      ],
    },
    {
      label: "Image",
      type: "file",
      id: "Product-image",
      name: "image",
    },
  ];
  

const handleSubmit = (formData) => {
  console.log("Form submitted:", formData);
};

function Example() {
  return (
    <CustomForm formTitle="Add New Product" fields={fields} onSubmit={handleSubmit} />
  );
}

export default Example;
