import React, { useContext, useState } from "react";
import PriceFilter from "../../components/filters/price-filter";
import "./style.css";
import ItemFilter from "../../components/filters/item-filter";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import RelatedProductCard from "../../components/related-products-card";
import "../../fonts/font-awesome/css/font-awesome.css";
import useScrollTop from "../../hooks/useScrollTop";
import { useNavigate } from "react-router-dom";
import useProductFilter from "../../hooks/useProductFilter";
import useCategories from "../../hooks/useGetCategories"; // Adjust the path accordingly

import LoaderSpinner from "../../components/loader";
import SortDropdown from "../../components/sorting-dropdown"; // Import SortDropdown component
import useCurrency from "../../hooks/useCurrency";
import CartContext from "../../store/cart-context";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CurrencyDropdown from "../../components/currency-dropdown";

Modal.setAppElement("#root");

const ProductCategoryView = () => {
  const navigate = useNavigate();
  // const productData = productsSample;
  const cartCtx = useContext(CartContext); // Access the addItemToCart function from the CartContext

  const productsPerPage = 20; // Number of products to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useScrollTop([currentPage]);

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePriceFilterChange = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("sort");

    queryParams.set("minPrice", value[0]);
    queryParams.set("maxPrice", value[1]);
    navigate(`/product-category?${queryParams.toString()}`);
    setCurrentPage(1);
  };
  const handleItemFilterChange = (category, value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.delete("sort");

    // Check if 'brand' filter is being updated

    // If a different filter is being updated, update only that filter
    queryParams.set(`${category}`, value.name);
    navigate(`/product-category?${queryParams.toString()}`);
    setCurrentPage(1);
  };
  const handleSortChange = (selectedSortOption) => {
    setSortOption(selectedSortOption);

    // Create a new URLSearchParams object for handling the sort change
    const newQueryParams = new URLSearchParams(window.location.search);

    // Set the sorting option in the URL query parameters
    if (selectedSortOption !== "default") {
      newQueryParams.set("sort", selectedSortOption);
    }

    // Update the URL with the new query parameters
    navigate(`/product-category?${newQueryParams.toString()}`);
  };

  const resetFilters = () => {
    navigate(`/product-category`);

    setCurrentPage(1);
  };
  const { convertCurrency } = useCurrency();

  const {
    filteredProducts,
    totalProductCount,
    noProductFoundError,
    isLoading,
    sortOption,
    setSortOption,
    sortOptions,
  } = useProductFilter(currentPage, productsPerPage);

  // Use the hook with the updated query parameters

  const currentProducts = filteredProducts;

  //Filter Section
  const { categories } = useCategories();

  const FilterSection = (
    <>
      <PriceFilter
        onPriceChange={handlePriceFilterChange}
        resetFilters={resetFilters}
      />
      <ItemFilter
        filtertype={""}
        title='categories'
        onModalClose={closeModal}
        onItemClick={handleItemFilterChange}
        items={categories.map((category) => ({
          id: category._id,
          name: category.name,
        }))}
      />
    </>
  );

  // const handleNjoftimin = (status) => {
  //   if (status === "success") {
  //     toast.success("Produkti u shtua ne shporte!", {
  //       position: "top-right",
  //       autoClose: 1000,
  //     });
  //   }
  // };

  return (
    <main className='product-category-container'>
      <div className='product-category-history'></div>
      {isLoading && <LoaderSpinner />}
      <div className='product-category-header'>
        <img
          src='https://img.freepik.com/premium-photo/set-different-makeup-objects_144962-8846.jpg'
          width={180}
          height={86}
          alt=''
        />

        <p className='product-category-header-text'>
          Welcome to the exclusive world of <span>SDG3 Cosmetics</span>, where
          beauty harmonizes with science. Each product is meticulously crafted
          to redefine the essence of beauty
        </p>
      </div>

      <div className='product-category-view'>
        <section className='products-section'>
          <div className='filters-container'>
            <div className='filter-container-select'>
              <SortDropdown
                sortOption={sortOption}
                sortOptions={sortOptions}
                onSortChange={handleSortChange}
              />
              {/* ... */}
            </div>
            <button className='filter-container-btn' onClick={openModal}>
              Open Filters
            </button>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className={`filter-modal ${modalIsOpen ? "" : "translate-right"}`}
            overlayClassName='custom-filter-overlay'
            closeTimeoutMS={300}
          >
            <button className='filter-button-modal' onClick={closeModal}>
              <GrClose size={30} />
            </button>
            {modalIsOpen && (
              <section className='filters-section-modal'>
                {FilterSection}
              </section>
            )}{" "}
          </Modal>
          <div>
            <div className='sort-lg-container'>
              <SortDropdown
                sortOption={sortOption}
                sortOptions={sortOptions}
                onSortChange={handleSortChange}
              />
            </div>
            <div className='products-container'>
              {!noProductFoundError &&
                currentProducts.map((product) => (
                  <RelatedProductCard
                    key={product._id}
                    product={{
                      ...product,
                      price: convertCurrency(product.price),
                      discountPrice: convertCurrency(
                        product.discountPrice || 0,
                      ),
                    }}
                    // handleNjoftimin={handleNjoftimin}
                  />
                ))}
              {currentProducts.length === 0 && noProductFoundError && (
                <p className='no-product-error'>Nuk u gjet asnje produkt! </p>
              )}
            </div>
          </div>

          <div className='pagination'>
            <Pagination
              current={currentPage}
              total={totalProductCount}
              pageSize={productsPerPage}
              onChange={handlePageChange}
              showLessItems
              showTitle={false}
            />
            <div className='pagination-products'>
              <h1>
                Showing {(currentPage - 1) * productsPerPage + 1}-
                {Math.min(currentPage * productsPerPage, totalProductCount)} of{" "}
                {totalProductCount} Results
              </h1>
            </div>
          </div>
        </section>
        {!modalIsOpen && (
          <section className='filters-section'>{FilterSection}</section>
        )}
      </div>
    </main>
  );
};

export default ProductCategoryView;
