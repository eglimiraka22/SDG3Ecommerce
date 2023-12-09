import React, { useContext, useState } from "react";
import "./style.css";
import AdminButton from "../buttons/admin-button";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";
const ProductCard = ({ product, openModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartCtx = useContext(CartContext);
  const {
    deleteProductById,
    isDeleting,
    error: deleteError,
  } = useDeleteProduct();
  const onMouseOver = () => {
    setIsHovered(true);
  };

  const onMouseOut = () => {
    setIsHovered(false);
  };
  const openModalHandler = (e) => {
    e.preventDefault();
    openModal(product);
  };

  const handleProductDelete = async () => {
    // Use window.confirm for deletion confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (confirmDelete && product._id) {
      try {
        await deleteProductById(product._id);
        if (!deleteError) {
          // Display success toast only if there is no error message
          toast.success("Product deleted successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });

          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error deleting product";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    }
  };

  return (
    <div
      className={`product-card  ${isHovered ? "hovered" : ""}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Link
        to={`/product/${product._id}`}
        className={`product-image`}
        style={{
          backgroundImage: `url(${
            product.productImages[0].asset
              ? product.productImages[0].asset.url
              : ""
          })`,
        }}
      ></Link>

      <div className='product-info'>
        <h3 className='product-name'>{product.name}</h3>
        <div className='product-price'>
          <span>
            {product.price} {"€"}
          </span>{" "}
        </div>
        <div>
          <AdminButton Text='Modify' onClick={openModalHandler} />
          <AdminButton
            Text={isDeleting ? "In process..." : "Delete Product"}
            onClick={handleProductDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
