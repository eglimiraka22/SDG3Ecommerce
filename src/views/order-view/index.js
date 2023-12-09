import React, { useState } from "react";
import "./style.css";
import useGetOrders from "../../hooks/useGetOrders";
import Pagination from "rc-pagination";
import OrderDetailsModal from "../../components/order-details-modal";
import LoaderSpinner from "../../components/loader";
import FormattedDate from "../../components/Date";

const OrdersView = () => {
  const ordersPageSize = 10;
  const [page, setPage] = useState(1);
  const {
    orders: OrderData,
    totalOrderCount,
    setOrderStatus,
    modifyOrderStatus,
    isLoading,
  } = useGetOrders(ordersPageSize, page);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to track the selected order

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const completeOrder = (orderId) => {
    modifyOrderStatus(orderId);
  };

  const handleOrderStatus = (status) => {
    setOrderStatus(status);
    setPage(1); // Reset the page to 1 when a status button is clicked
  };

  return (
    <div className='order-container'>
      {isLoading && <LoaderSpinner />}
      <div className='filter-buttons'>
        <button onClick={() => handleOrderStatus("ALL")}>All Orders</button>
        <button onClick={() => handleOrderStatus("Pending")}>
          Pending Orders
        </button>
        <button onClick={() => handleOrderStatus("Completed")}>
          Completed Orders
        </button>
      </div>

      <table className='order-table'>
        <thead>
          <tr>
            <th>
              <label>Order Id</label>
            </th>
            <th>
              <label>Klienti</label>
            </th>

            <th>
              <label>Email</label>
            </th>
            <th>
              <label>Nr</label>
            </th>

            <th>
              <label>Data</label>
            </th>
            <th>
              <label>Totali</label>
            </th>
            <th>
              <label>Statusi</label>
            </th>
          </tr>
        </thead>
        <tbody>
          {OrderData.map((order) => (
            <tr key={order._id}>
              {/* Table row data */}
              <td data-label='Invoice Id' onClick={() => openModal(order)}>
                {order._id}
              </td>
              <td
                data-label='Name'
                onClick={() => openModal(order)}
              >{`${order.Emri} ${order.Mbiemri}`}</td>
              <td data-label='Email'>{order.Email}</td>
              <td data-label='Numri'>{order.Numri}</td>
              <td data-label='Date'>
                {" "}
                <FormattedDate isoDate={order.Date} />
              </td>
              <td data-label='Amount'>{order.Totali} </td>
              <td data-label='Payment'>
                {order.Status === "Pending" ? (
                  <button
                    className='btn-invoice'
                    onClick={() => completeOrder(order._id)}
                  >
                    Konfirmo Porosine
                  </button>
                ) : (
                  "Completed"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='order-modal-details'>
        <OrderDetailsModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          order={selectedOrder}
          modifyOrderStatus={completeOrder}
        />
      </div>
      <div className='pagination-container-orders'>
        <Pagination
          current={page}
          total={totalOrderCount}
          pageSize={ordersPageSize}
          onChange={(current) => setPage(current)}
        />
      </div>
    </div>
  );
};

export default OrdersView;
