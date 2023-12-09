import { useEffect, useState } from "react";
import { readOnlyClient } from "../client"; // Assuming you've exported your Sanity client

const useColors = () => {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const result = await readOnlyClient.fetch(
            '*[_type == "color"] | order(_createdAt asc) { _id, code, hasGlutters, }',
            );
        setColors(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching colors:", error);
        setIsLoading(false);
      }
    };

    fetchColors();
  }, []);

  return { colors, isLoading };
};

export default useColors;
