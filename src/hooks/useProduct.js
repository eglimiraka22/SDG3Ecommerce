import { useState, useEffect } from "react";
import { client } from "../client"; // Import your Sanity client

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Use GROQ to query the product based on _id
        const sanityQuery = `*[_type == 'product' && _id == $productId]{
          _id,
          name,
          slug,
          categories->{
            _id,
            name
          },
          shortDescription,
          trending,
          discountPrice,
          price,
          description,
          productImages[]{
            asset->{
              _id,
              url
            }
          },
          colors[]-> {
            _id,
            code,
            hasGlutters
          }

        }`;

        // Execute the query with the provided productId
        const result = await client.fetch(sanityQuery, { productId });

        if (result.length === 1) {
          // Set the product data if it exists
          setProduct(result[0]);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchProduct function
    fetchProduct();
  }, [productId]);
  return { product, loading, error };
};

export default useProduct;
