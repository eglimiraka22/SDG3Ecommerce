import { useState, useEffect } from "react";
import { readOnlyClient } from "../client"; // Import your Sanity client

const useGetFeaturedProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        // Use GROQ to query trending products with a limit of 8
        const sanityQuery = `*[_type == 'product' && trending == true]  {
          _id,
          name,
          price,
          discountPrice,
          productImages[]{
            asset->{
              _id,
              url
            }
          }
        }[0...4]`;

        // Execute the query
        const result = await readOnlyClient.fetch(sanityQuery);

        setProducts(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);
  return { loading, error, products };
};

export default useGetFeaturedProducts;
