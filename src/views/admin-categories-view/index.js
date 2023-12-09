// AdminCategoriesView.js
import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ReactModal from "react-modal";
import useAdminCategories from "../../hooks/useGetCategories";
import "./style.css";

const AdminCategoriesView = () => {
  const {
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
  } = useAdminCategories();

  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);


  const handleTitleChange = (e) => {
    setNewCategoryTitle(e.target.value);
  };

  const handleEditSave = () => {
    handleSave(selectedCategoryId, { name: newCategoryTitle });
  };

  return (
    <div className='admin-categories-view'>
      <h1>Categories</h1>
      <button
        onClick={() => {
          handleAdd();
          setNewCategoryTitle(""); // Set default value
          setSelectedCategoryId(null);
        }}
        className='create-category-button'
      >
        <FaPlus /> Create New Category
      </button>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <ul className='category-list'>
          {categories.map((category, index) => (
            <li key={index} className='category-item'>
              {category.name}
              <div className='category-buttons'>
                <button
                  onClick={() => {
                    setSelectedCategoryId(category._id);
                    handleUpdate();
                    setNewCategoryTitle(category.name); // Set default value
                  }}
                  className='update-button'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategoryId(category._id);
                    handleDelete();
                  }}
                  className='delete-button'
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Category Modal */}
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Edit Category Modal'
        className='modal-category-admin'
        overlayClassName='modal-category-admin-overlay'
      >
        <h2>{selectedCategoryId ? "Edit Category" : "Add Product"}</h2>
        <label htmlFor='categoryTitle'>Title:</label>
        <input
          type='text'
          id='categoryTitle'
          value={newCategoryTitle}
          onChange={handleTitleChange}
        />
        <button onClick={handleEditSave}>Save</button>
        <button onClick={handleCloseModal}>Cancel</button>
      </ReactModal>

      {/* Delete Category Modal */}
      <ReactModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Delete Category Modal'
        className='modal-category-admin'
        overlayClassName='modal-category-admin-overlay'
      >
        <h2>Delete Category</h2>
        <p>
          Are you sure you want to delete{" "}
          {selectedCategoryId ? selectedCategoryId.name : "the category"}?
        </p>
        <button onClick={() => handleConfirmDelete(selectedCategoryId)}>
          Confirm Delete
        </button>
        <button onClick={handleCloseModal}>Cancel</button>
      </ReactModal>
    </div>
  );
};

export default AdminCategoriesView;
