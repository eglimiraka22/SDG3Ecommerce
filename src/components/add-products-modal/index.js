// AddProductModal.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import "./style.css";

import AddProduct from "../product-modal";
import { IoMdClose } from "react-icons/io";

// ... Import statements

const AddProductModal = ({ isOpen, onRequestClose, existingProduct }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Add Product Modal'
      className='add-product-modal'
      overlayClassName='add-product-modal-overlay'
    >
      <button className='close-add-product-modal' onClick={onRequestClose}>
        <IoMdClose size={30} />
      </button>
      <AddProduct
        onRequestClose={onRequestClose}
        existingProduct={existingProduct}
      />
    </Modal>
  );
};

export default AddProductModal;
