import axios from "axios";

// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESETS;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // Create a FormData object to hold the image file
  const formData = new FormData();
  formData.append("file", file); // Append the file (image) to the form
  formData.append("upload_preset", uploadPreset); // Required for unsigned uploads

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Image uploaded successfully:", response.data);
    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
