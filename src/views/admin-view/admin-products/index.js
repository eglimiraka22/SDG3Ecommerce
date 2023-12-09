import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../../../components/product-card/index";
import AddProductModal from "../../../components/add-products-modal"; // Adjust the import path
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css"; // Import the styles for rc-pagination

import "./style.css";
import useScrollTop from "../../../hooks/useScrollTop";
import useGetAdminProducts from "../../../hooks/useGetAdminProducts";
import LoaderSpinner from "../../../components/loader";

const AdminProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useScrollTop(currentPage);
  // Constants for pagination
  const pageSize = 10;
  const {
    loading,
    error,
    filteredProducts,
    totalProductCount,
    searchText,
    handleInputChange,
  } = useGetAdminProducts(currentPage, pageSize);
  // Filter products based on name or brand

  const openModal = (product) => {
    setProductData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Pagination change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const adminProduct = filteredProducts.map((product) => (
    <ProductCard key={product._id} product={product} openModal={openModal} />
  ));

  if (loading || error) {
    <LoaderSpinner />;
  }

  return (
    <section className='admin-products'>
      <div className='filter-container'>
        <input
          type='text'
          placeholder='Filter by name or brand'
          value={searchText}
          className='filter-input'
          onChange={(e) => handleInputChange(e)} // Pass the input value to handleInputChange
        />
        <FiSearch className='search-icon' size={20} color='gray' />
      </div>
      <div className='admin-products-container'>{adminProduct}</div>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        total={totalProductCount}
        pageSize={pageSize} // Set this to the actual page size
      />
      <AddProductModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        existingProduct={productData}
      />
    </section>
  );
};

export default AdminProducts;
