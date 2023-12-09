import React, { useContext, useRef, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import ProductButton from "../../components/buttons/product-button";
import { LiaAngleRightSolid, LiaAngleLeftSolid } from "react-icons/lia";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
import TextHeader from "../../components/text-title";
import "../../fonts/font-awesome/css/font-awesome.css";
import useScrollTop from "../../hooks/useScrollTop";
import CartContext from "../../store/cart-context";
import useProduct from "../../hooks/useProduct";
import { ToastContainer, toast } from "react-toastify";
import LoaderSpinner from "../../components/loader";
import useGetFeaturedProducts from "../../hooks/useGetFeaturedProducts";
import NewArrivalsCard from "../../components/new-arrivals-card";

import ColorCarousel from "../../components/colors-carousel";
import useCurrency from "../../hooks/useCurrency";

Modal.setAppElement("#root");

const ProductView = () => {
  const { id } = useParams();

  useScrollTop(id);
  const { product, loading, error } = useProduct(id); //Product Details hook which returns product details ,loading state and error state
  const ProductData = { ...product };
  const cartCtx = useContext(CartContext);

  const [selectedImage, setSelectedImage] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState();
  const [selectedColor, setSelectedColor] = useState(null);

  // color selected handler
  const handleColorSelect = (color) => {
    // Do something with the selected color, e.g., add it to the product card
    setSelectedColor(color);
  };

  // Check if the product exists
  const { convertCurrency, convertPriceStringValue } = useCurrency();

  const handleCartSubmit = () => {
    if (ProductData) {
      if (product.colors && product.colors.length > 1 && !selectedColor) {
        toast.error("Choose a color !", {
          position: "top-right",
          autoClose: 800,
        });
        return;
      }
      cartCtx.addItem({
        id: ProductData._id,
        emri: ProductData.name,
        cmimi:
          product.discountPrice && product.discountPrice <= product.price
            ? product.discountPrice
            : product.price,
        imazhi: ProductData.productImages[0].asset.url,
        color: selectedColor || null, // Add selected color to the item
        sasia: 1,
      });
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 800,
      });
    } else {
      alert("No more products available");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // //PRODUCT.images.map()

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleArrowClick = (direction) => {
    if (direction === "prev") {
      setSelectedImage((prevImage) =>
        prevImage > 0 ? prevImage - 1 : ProductData.productImages.length - 1,
      );
    } else {
      setSelectedImage((prevImage) =>
        prevImage < ProductData.productImages.length - 1 ? prevImage + 1 : 0,
      );
    }
  };
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setPosition({ x, y });
  };

  // Add images as a dependency to the dependency array

  const { products: productsFeatured } = useGetFeaturedProducts();

  const newArrivals = productsFeatured.map((product) => {
    return (
      <NewArrivalsCard
        key={product._id}
        id={product._id} // Assuming you have an 'id' property for each product
        image={product.productImages[0].asset.url} // Replace 'image' with the actual property name
        name={product.name} // Replace 'name' with the actual property name
        price={product.price} // Replace 'price' with the actual property name
        discountPrice={product.discountPrice} // Replace 'price' with the actual property name
      />
    );
  });

  if (
    !ProductData ||
    !ProductData.productImages ||
    loading ||
    !ProductData.productImages[0].asset.url
  ) {
    // Handle the case where product or images is undefined
    return (
      <div className='product-detail-container'>
        <LoaderSpinner />
      </div>
    ); // or any other fallback UI
  }
  // Handle Error Component
  if (error) {
    return <div>No Product Found</div>;
  }

  return (
    <main>
      <ToastContainer />

      <h3 className='product-history'>
        SDG3 Cosmetics - Product - {ProductData.name}{" "}
      </h3>
      <section className='product-detail-container'>
        <div className='product-image-container'>
          <div
            className={`big-image-container `}
            ref={containerRef}
            onMouseMove={handleMouseMove}
          >
            <div
              className='arrow left'
              onClick={() => handleArrowClick("prev")}
            >
              <LiaAngleLeftSolid size={35} color='gray' />
            </div>

            <div
              style={{
                backgroundImage: `url(${
                  ProductData.productImages &&
                  ProductData.productImages[selectedImage].asset
                    ? ProductData.productImages[selectedImage].asset.url
                    : ""
                })`,
                transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
              }}
              className='zoom-image'
              onClick={openModal}
            />
            {selectedColor && (
              <div className='image-color-container'>
                <p>
                  <span className='colors-container-nr'>
                    {selectedColor.nr}
                  </span>
                </p>
                <div
                  className={`colors-container-hex ${
                    selectedColor.hasGlutter ? "has-glitter" : ""
                  }`}
                  style={{
                    backgroundColor: selectedColor.code,
                  }}
                />
              </div>
            )}
            <div
              className='arrow right'
              onClick={() => handleArrowClick("next")}
            >
              <LiaAngleRightSolid size={35} color='gray' />
            </div>
          </div>
          <div className='small-images-container'>
            {ProductData.productImages &&
              ProductData.productImages.map((image, index) => (
                <img
                  key={index}
                  src={image.asset ? image.asset.url : ""}
                  alt={`Product ${index + 1}`}
                  className={`small-image ${
                    selectedImage === index ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
          </div>
        </div>

        <div className='product-details'>
          <div className='product-description'>
            <p className='product-type'>{ProductData.name}</p>
            <p className='product-color'>{ProductData.shortDescription}</p>
          </div>
          {product.colors && product.colors.length > 0 && (
            <div className='product-details-colors'>
              {/* TODO Get product colors and add to cart selected product with color, If 
              Color is different add as new product */}
              <h2 className='color-header'>Select Color</h2>
              <ColorCarousel
                onColorSelect={handleColorSelect}
                colors={product.colors}
              />
              {/* Render the selected color or perform other actions based on user selection */}
              {selectedColor && (
                <div className='colors-container'>
                  <p>
                    Selected Color:{" "}
                    <span className='colors-container-nr'>
                      {selectedColor.nr}
                    </span>
                  </p>
                  <div
                    className=''
                    style={{
                      backgroundColor: `${selectedColor.code}`,
                      width: "140px",
                      height: "40px",
                      marginBlock: "5px",
                    }}
                  />
                  <p className='colors-container-nr'>
                    {selectedColor.hasGlutters
                      ? "With Glutters"
                      : "No Glutters"}
                  </p>
                </div>
              )}
            </div>
          )}
          <div className='product-actions'>
            <div className='product-price'>
              {ProductData.discountPrice && ProductData.discountPrice > 0 ? (
                <span className=''>
                  {convertPriceStringValue(
                    convertCurrency(ProductData.discountPrice).toLocaleString(),
                  )}
                </span>
              ) : (
                <span className=''>
                  {" "}
                  {convertPriceStringValue(
                    convertCurrency(ProductData.price).toLocaleString(),
                  )}
                </span>
              )}
            </div>

            <div className='product-add-to-cart'>
              <ProductButton title='Add to cart' onClick={handleCartSubmit} />
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Product Image Modal'
        className={`modal-content ${isModalOpen ? "open" : ""}`}
        overlayClassName={`modal-overlay ${isModalOpen ? "open" : ""}`}
        closeTimeoutMS={500}
      >
        <div className='expanded-view-container'>
          <div className='big-image-container-modal'>
            <button className='close-modal-button' onClick={closeModal}>
              <GrClose size={25} />
            </button>
            <div
              className='arrow left'
              onClick={() => handleArrowClick("prev")}
            >
              <LiaAngleLeftSolid size={35} color='gray' />
            </div>
            <div
              className='big-image'
              style={{
                backgroundImage: `url(${
                  ProductData.productImages &&
                  ProductData.productImages[selectedImage].asset
                    ? ProductData.productImages[selectedImage].asset.url
                    : ""
                })`,
              }}
            />
            <div
              className='arrow right'
              onClick={() => handleArrowClick("next")}
            >
              <LiaAngleRightSolid size={35} color='gray' />
            </div>
          </div>
          <div className='small-images-scroll'>
            <div className='small-images-container-modal'>
              {ProductData.productImages &&
                ProductData.productImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.asset ? image.asset.url : ""}
                    alt={`Product ${index + 1}`}
                    className={`modal-small-image ${
                      selectedImage === index ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
            </div>
          </div>
        </div>
      </Modal>
      <TextHeader text='- Related Products -' />

      <section className='products-container'>{newArrivals}</section>
    </main>
  );
};

export default ProductView;
