import { useState } from "react";
import { client } from "../client";

const useAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = async (productData, existingProductId) => {
    try {
      setLoading(true);

      // Perform any necessary data transformation before sending to Sanity
      const updatedProduct = {
        name: productData.name,
        categories: {
          _type: "reference",
          _ref: productData.categories,
        },
        shortDescription: productData.shortDescription,
        trending: productData.trending,
        discountPrice: productData.discountPrice,
        price: productData.price,
        description: productData.description,
        colors: productData.colors.map((color) => ({
          _type: "reference",
          _key: `color-${color._id}`, // Generate a unique key based on the index
          _ref: color._id,
        })),
        productImages: productData.selectedImages.map((image) => ({
          _type: "image",
          _key: image._key || image.uploadId, // Use _id if available, otherwise use uploadId
          asset: {
            _type: "reference",
            _ref: image.asset?._id ? image.asset._id : image._id, // Reference to the uploaded Sanity image asset
          },
          // You may include other image-related fields here if needed
        })),
      };

      if (existingProductId) {
        // Editing an existing product
        await client.patch(existingProductId).set(updatedProduct).commit();
      } else {
        // Adding a new product
        await client.create({
          _type: "product",
          ...updatedProduct,
        });
      }

      setLoading(false);
      return true; // Indicate success
    } catch (err) {
      setLoading(false);
      setError(err.message || "An error occurred while updating the product");
      return false; // Indicate failure
    }
  };

  return { addProduct, loading, error };
};

export default useAddProduct;
