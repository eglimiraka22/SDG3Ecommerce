// useAdminCategories.js
import { useEffect, useState } from "react";
import { client } from "../client";

const useAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await client.fetch(
          '*[_type == "category" ] | order(name asc) { _id, name }',
        );
        setCategories(result);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleUpdate = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleAdd = () => {
    // Open modal for adding a new category

    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async (categoryId) => {
    // Implement your delete logic here
    try {
      await client.delete(categoryId).then(() => {
        // Refresh the categories list after delete
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId,
        );
        setCategories(updatedCategories);
        setIsDeleteModalOpen(false);
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSave = async (categoryId, updatedData) => {
    // Implement your update or add logic here
    try {
      if (categoryId) {
        // Update existing category
        await client
          .patch(categoryId)
          .set(updatedData)
          .commit()
          .then(() => {
            // Refresh the categories list after update
            const updatedCategories = categories.map((category) =>
              category._id === categoryId
                ? { ...category, ...updatedData }
                : category,
            );
            setCategories(updatedCategories);
            setIsEditModalOpen(false);
          });
      } else {
        // Add new category
        const CategoryDocument = {
          _type: "category",
          name: updatedData.name,
          description: `Category ${updatedData.name}`,

          // Add more fields as needed
        };

        // Create the order using client.create
        await client.create(CategoryDocument).then((data) => {
          setCategories((prevCategories) => [
            ...prevCategories,
            { _id: data._id, name: data.name },
          ]);
        });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating/add category:", error);
      setIsEditModalOpen(false);
    }
  };

  return {
    categories,
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

export default useAdminCategories;
