/**
 * Convert an image URL to a File object
 * @param {string} imageUrl - The URL of the image to be converted
 * @param {string} fileName - The desired name of the file
 * @returns {Promise<File>} - A promise that resolves to a File object
 */
export const urlToFile = async (imageUrl, fileName) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };
  
  // Example usage:
//   const imageUrl = "https://example.com/path/to/image.jpg";
//   const file = urlToFile(imageUrl, "image.jpg");
//   console.log(file);

  