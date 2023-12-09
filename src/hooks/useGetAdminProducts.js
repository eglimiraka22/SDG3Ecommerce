import { useEffect, useState } from "react";
import { client } from "../client"; // Assuming you've exported your Sanity client

const useGetAdminProducts = (page, pageSize) => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filterProducts = async () => {
      setIsLoading(true);

      // Build your Sanity query here
      let sanityQuery = `*[_type == 'product'`;

      if (searchText.trim() !== "") {
        sanityQuery += ` && name match '${searchText}*'`;
      }

      sanityQuery += `] | order(_createdAt desc) `;

      // Include specific fields for each product
      sanityQuery += `{
        _id,
        name,
        price,
        categories->{
          _id,
          name
        },
        colors[]-> {
          ...,

        },
        shortDescription,
        trending,
        discountPrice,
        description,
        productImages[]{
          _key,
          asset->{
            _id,
            url,
            _ref
            
            
          }
        }
      }[${(page - 1) * pageSize}...${page * pageSize}]`;

      // Perform the fetch operation
      const result = await client.fetch(sanityQuery);

      setFilteredProducts(result);

      setIsLoading(false);
    };

    const getTotalProductCount = async () => {
      // Build a separate count query
      let countQuery = `count(*[_type == 'product'`;

      if (searchText.trim() !== "") {
        countQuery += ` && name match '${searchText}*'`;
      }

      countQuery += `])`;

      // Perform the count operation
      const totalCount = await client.fetch(countQuery);
      setTotalProductCount(totalCount);
    };

    filterProducts();
    getTotalProductCount();
  }, [page, pageSize, searchText]);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);
  };
  return {
    filteredProducts,
    totalProductCount,
    isLoading,
    searchText,
    handleInputChange,
  };
};

export default useGetAdminProducts;
