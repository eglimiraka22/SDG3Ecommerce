import { useState } from "react";
import { client } from "../client";
const useDeleteProduct = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteProductById = async (productId) => {
    setIsDeleting(true);

    try {
      // Use the client's delete method to delete the product by _id
      await client.delete(productId);
    } catch (error) {
      console.error("Error deleting product:", error.message);
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    error,
    deleteProductById,
  };
};

export default useDeleteProduct;
