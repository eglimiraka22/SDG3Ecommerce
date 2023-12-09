// Product api.js

import { client } from "../../client";
import groq from "groq";

export const fetchProductById = async (productId) => {
  try {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const product = await client.fetch(
      groq`*[_type == "products" && _id == $productId][0]{
        name,
        slug,
        categories-> {title},
        shortDescription,
        price,
        description,
        trending,
        discountPrice,
        productImages,
        colors-> {name},
      }`,
      { productId },
    );

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);

    // Error fetching product
    if (error.message === "Product ID is required") {
      throw new Error("Product ID is required");
    } else if (error.message === "Product not found") {
      throw new Error("Product not found");
    }

    throw new Error("Internal Server Error"); // Generic error for other unexpected issues
  }
};
