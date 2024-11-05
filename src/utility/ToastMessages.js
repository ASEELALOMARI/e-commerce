import { toast } from "react-toastify";

export const showErrorMessage = (errorMessage) => {
    toast.error(`Failed: ${errorMessage}`);
  };
  export const showSuccessMessage = (successMessage) => {
    toast.success(`Success: ${successMessage}`);
  };
  