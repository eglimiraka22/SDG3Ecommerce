// useAdminColors.js
import { useEffect, useState } from "react";
import { client } from "../client"; // Import your Sanity client

const useAdminColors = () => {
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const result = await client.fetch(
          '*[_type == "color"] | order(_createdAt asc) { _id, code, hasGlutters }',
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

  const handleUpdate = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = (color) => {
    setIsDeleteModalOpen(true);
  };

  const handleAdd = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  const handleConfirmDelete = async (colorId) => {
    try {
      await client.delete(colorId).then(() => {
        const updatedColors = colors.filter((color) => color._id !== colorId);
        setColors(updatedColors);
        setIsDeleteModalOpen(false);
      });
    } catch (error) {
      console.error("Error deleting color:", error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSave = async (colorId, updatedData) => {
    try {
      if (colorId) {
        await client
          .patch(colorId)
          .set(updatedData)
          .commit()
          .then(() => {
            const updatedColors = colors.map((color) =>
              color._id === colorId ? { ...color, ...updatedData } : color,
            );
            setColors(updatedColors);
            setIsEditModalOpen(false);
          });
      } else {
        const ColorDocument = {
          _type: "color",
          code: updatedData.code,
          hasGlutters: updatedData.hasGlutters,

          // Add more fields as needed
        };
        await client.create(ColorDocument);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating/add color:", error);
      setIsEditModalOpen(false);
    }
  };

  return {
    colors,
    isLoading,
    isEditModalOpen,
    isDeleteModalOpen,
    handleUpdate,
    handleDelete,
    handleAdd,
    handleCloseModal,
    handleConfirmDelete,
    handleSave,
  };
};

export default useAdminColors;
