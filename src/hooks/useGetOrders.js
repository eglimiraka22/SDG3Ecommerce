// hooks/useGetOrders.js

import { useEffect, useState } from "react";
import { fetchOrders } from "../utils/orders/orders";
import { client } from "../client";

const useGetOrders = (pageSize, page) => {
  const [orders, setOrders] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [noOrdersFoundError, setNoOrdersFoundError] = useState(false);
  const [orderStatus, setOrderStatus] = useState("ALL");

  const modifyOrderStatus = async (orderId) => {
    setIsLoading(true);

    try {
      // Query the order by its ID
      const order = await client.getDocument(orderId);

      if (order && order.Status === "Pending") {
        // Update the order status to "Completed"
        await client.patch(orderId).set({ Status: "Completed" }).commit();

        // Log the successful update
      } else {
        // Order is not in "Pending" status, do nothing
        setNoOrdersFoundError(true);
      }
    } catch (error) {
      // Handle errors, e.g., Sanity or network errors
      console.error("Error modifying order status:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);

      try {
        let totalOrderCountQuery;
        if (orderStatus && orderStatus !== "ALL") {
          totalOrderCountQuery = `count(*[_type == "orders" && Status == '${orderStatus}'])`;
        } else {
          totalOrderCountQuery = `count(*[_type == "orders"])`;
        }

        // Fetch total order count
        const totalOrderCount = await client.fetch(totalOrderCountQuery);
        setTotalOrderCount(totalOrderCount);

        const ordersData = await fetchOrders(pageSize, page, orderStatus);

        setOrders(ordersData);

        setNoOrdersFoundError(ordersData.length === 0);
      } catch (error) {
        console.error("Error getting orders:", error);
        setNoOrdersFoundError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getOrders();



    // Clean up the interval when the component unmounts
  }, [pageSize, page, orderStatus]);


  return {
    totalOrderCount,
    orders,
    isLoading,
    noOrdersFoundError,
    modifyOrderStatus,
    setOrderStatus,
  };
};

export default useGetOrders;
