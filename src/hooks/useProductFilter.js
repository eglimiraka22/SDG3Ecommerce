import { useEffect, useState } from "react";
import { readOnlyClient } from "../client";

const useProductFiltering = (page, pageSize) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProductCount, setTotalProductCount] = useState(0);
  const [noProductFoundError, setNoProductFoundError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-ascending", label: "Price (Low to High)" },
    { value: "price-descending", label: "Price (High to Low)" },
  ];
  const queryParams = new URLSearchParams(window.location.search);

  const minPrice = parseInt(queryParams.get("minPrice")) || 0; //Minimum Price Value

  const maxPrice = parseInt(queryParams.get("maxPrice")) || 100; //Maximum Price Value
  const sortingQueryParam = queryParams.get("sort");

  const [sortOption, setSortOption] = useState(sortingQueryParam);
  const categoryQueryParam = queryParams.get("categories");
  const colorQueryParams = queryParams.get("colors");
  const discountQueryParams = queryParams.get("discount");

  useEffect(() => {
    const filterProducts = async () => {
      setIsLoading(true);
      // Build your Sanity query here
      let sanityQuery = `*[_type == 'product'`;

      if (minPrice || maxPrice) {
        sanityQuery += ` && price >= ${minPrice || 0} && price <= ${
          maxPrice || 100
        }`;
      }

      if (categoryQueryParam && categoryQueryParam.length >= 1) {
        sanityQuery += ` && categories->name == '${categoryQueryParam}'`;
      }
      if (colorQueryParams && colorQueryParams.length >= 1) {
        sanityQuery += ` && '${colorQueryParams}' in  colors `;
      }
      if (discountQueryParams && discountQueryParams.length >= 1) {
        sanityQuery += ` && trending == true`;
      }

      sanityQuery += `]`;

      // Get the total count of products
      const totalCountQuery = `count(${sanityQuery})`;
      const totalProductCount = await readOnlyClient.fetch(totalCountQuery);

      setTotalProductCount(totalProductCount);
      if (sortOption) {
        if (sortOption === "price-ascending") {
          sanityQuery += ` | order(price asc)`;
        } else if (sortOption === "price-descending") {
          sanityQuery += ` | order(price desc)`;
        }
      }
      // Apply pagination
      sanityQuery += ` [${(page - 1) * pageSize}...${page * pageSize}]{
        _id,
        name,
        price,
        categories->{
          _id,
          name
        },
        colors[],

        shortDescription,
        trending,
        discountPrice,
        description,
        productImages[]{
          asset->{
            _id,
            url
          }
        }
      }`;

      const result = await readOnlyClient.fetch(sanityQuery);

      setFilteredProducts(result);

      setNoProductFoundError(result.length === 0);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    filterProducts();
  }, [
    minPrice,
    maxPrice,
    page,
    pageSize,
    sortOption,
    categoryQueryParam,
    colorQueryParams,
    discountQueryParams,
  ]);

  return {
    filteredProducts,
    totalProductCount,
    noProductFoundError,
    isLoading,
    sortOption,
    setSortOption,
    sortOptions,
  };
};

export default useProductFiltering;
