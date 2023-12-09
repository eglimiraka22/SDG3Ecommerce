// AdminColorsView.js
import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ReactModal from "react-modal";
import useAdminColors from "../../hooks/useAdminColors";
import "./style.css";
import LoaderSpinner from "../../components/loader";

const AdminColorsView = () => {
  const {
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
  } = useAdminColors();

  const [newColorCode, setNewColorCode] = useState("");
  const [newColorHasGlutters, setNewColorHasGlutters] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);

  const handleCodeChange = (e) => {
    setNewColorCode(e.target.value);
  };

  const handleHasGluttersChange = () => {
    setNewColorHasGlutters((prev) => !prev);
  };

  const handleEditSave = () => {
    handleSave(selectedColorId, {
      code: newColorCode,
      hasGlutters: newColorHasGlutters,
    });
  };

  return (
    <div className='admin-colors-view'>
      <h1>Colors</h1>
      <button
        onClick={() => {
          handleAdd();
          setNewColorCode(""); // Set default value
          setNewColorHasGlutters(false); // Set default value
          setSelectedColorId(null);
        }}
        className='create-color-button'
      >
        <FaPlus /> Create New Color
      </button>
      {isLoading ? (
        <p>
          <LoaderSpinner />
        </p>
      ) : (
        <ul className='color-list'>
          {colors.map((color, index) => (
            <li key={color._id} className='color-item'>
              <span>
                {color.code}{" "}
                <span
                  className='cart-products-product-info-color'
                  style={{
                    backgroundColor: `${color.code}`,

                    paddingInline: "8px",
                    marginInline: "8px",
                  }}
                ></span>{" "}
                <b> | {(index + 1).toString().padStart(3, "0")}</b>
              </span>
              <span>{color.hasGlutters ? "With Glutters" : "No Glutters"}</span>
              <div className='color-buttons'>
                <button
                  onClick={() => {
                    setSelectedColorId(color._id);
                    handleUpdate();
                    setNewColorCode(color.code); // Set default value
                    setNewColorHasGlutters(color.hasGlutters); // Set default value
                  }}
                  className='update-button'
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => {
                    setSelectedColorId(color._id);
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

      {/* Edit Color Modal */}
      <ReactModal
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Edit Color Modal'
        className='modal-color-admin'
        overlayClassName='modal-color-admin-overlay'
      >
        <h2>{selectedColorId ? "Edit Color" : "Add Color"}</h2>
        <label htmlFor='colorCode'>Code:</label>
        <input
          type='text'
          id='colorCode'
          value={newColorCode}
          onChange={handleCodeChange}
        />
        <div className='gluter-container'>
          <label htmlFor='colorHasGlutters'>Has Glutters:</label>
          <input
            type='checkbox'
            id='colorHasGlutters'
            checked={newColorHasGlutters}
            onChange={handleHasGluttersChange}
          />
        </div>
        <button onClick={handleEditSave}>Save</button>
        <button onClick={handleCloseModal}>Cancel</button>
      </ReactModal>

      {/* Delete Color Modal */}
      <ReactModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel='Delete Color Modal'
        className='modal-color-admin'
        overlayClassName='modal-color-admin-overlay'
      >
        <h2>Delete Color</h2>
        <p>
          Are you sure you want to delete{" "}
          {selectedColorId ? selectedColorId.code : "the color"}?
        </p>
        <button onClick={handleConfirmDelete}>Confirm Delete</button>
        <button onClick={handleCloseModal}>Cancel</button>
      </ReactModal>
    </div>
  );
};

export default AdminColorsView;
