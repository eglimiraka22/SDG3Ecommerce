import React from "react";
import Modal from "react-modal";
import "./style.css";
import CartButton from "../buttons/cart-view-button";

Modal.setAppElement("#root"); // Set the root element as the app element

const OrderDetailsModal = ({ isOpen, onRequestClose, order }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel='Order Details'
      className='order-modal'
      overlayClassName='order-modal-overlay'
    >
      <h2>Detajet e Porosise</h2>
      {order && (
        <div>
          <p className='order-details'>
            <span className='order-details-title'>Order ID:</span>{" "}
            <span className='order-details-data'>{order._id}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Emri:</span>{" "}
            <span className='order-details-data'>{order.Emri}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Mbiemri:</span>{" "}
            <span className='order-details-data'>{order.Mbiemri}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Adresa:</span>{" "}
            <span className='order-details-data'>{order.Adresa}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Qyteti:</span>{" "}
            <span className='order-details-data'>{order.Qyteti}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Shteti:</span>{" "}
            <span className='order-details-data'>{order.Shteti}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Email:</span>{" "}
            <span className='order-details-data'>{order.Email}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Numri:</span>{" "}
            <span className='order-details-data'>{order.Numri}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Data:</span>{" "}
            {order.date && (
              <span className='order-details-data'>{order.Date}</span>
            )}
          </p>

          <p className='order-details'>
            <span className='order-details-title'>Statusi:</span>{" "}
            <span className='order-details-data'>{order.Status}</span>
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Shenime:</span>{" "}
            {order.Shenime && (
              <span className='order-details-data'>{order.Shenime}</span>
            )}{" "}
          </p>
          <p className='order-details'>
            <span className='order-details-title'>Totali:</span>{" "}
            <span className='order-details-data'>
              {order.Totali.toLocaleString()}
            </span>
          </p>
          <h3>Detajet e Produkteve te Porosise:</h3>
          <ul className='order-items-list'>
            {order.OrderDetails &&
              order.OrderDetails.map((item, index) => (
                <li key={index}>
                  <p>
                    <span className='order-details-title'>Emri:</span>{" "}
                    <span className='order-details-data'>{item.name}</span>
                  </p>
                  <p>
                    <span className='order-details-title'>Ngjyra:</span>{" "}
                    <span className='order-details-data'>
                      {item.productColor}
                    </span>
                  </p>
                  <p>
                    <span className='order-details-title'>Cmimi:</span>{" "}
                    <span className='order-details-data'>
                      {item.productPrice.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    <span className='order-details-title'>Sasia:</span>{" "}
                    <span className='order-details-data'>
                      {item.productQuantity}
                    </span>
                  </p>
                </li>
              ))}
          </ul>
        </div>
      )}
      <div className='order-details-buttons'>
        <CartButton title={"Kthehu tek porosite"} onClick={onRequestClose} />
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
