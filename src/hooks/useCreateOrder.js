import { useState } from "react";
import { client } from "../client";

const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Prepare the order document
      const orderDocument = {
        _type: "orders",
        Emri: orderData.Emri,
        Mbiemri: orderData.Mbiemri,
        Shteti: orderData.Shteti,
        Qyteti: orderData.Qyteti,
        Adresa: orderData.Adresa,
        Email: orderData.Email,
        Numri: orderData.Numri,
        Shenime: orderData.Shenime,
        Status: "Pending", // You might want to set a default value or provide it from orderData
        OrderDetails: orderData.OrderDetails, // Make sure this is an array of objects matching the OrderDetails schema
        Totali: orderData.Totali,
        Date: new Date().toISOString(), // Use ISO-8601 formatted date

        // Add more fields as needed
      };

      // Create the order using client.create
      await client.create(orderDocument);
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Error creating order");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createOrder };
};

export default useCreateOrder;

//  ORDERS DATA
// Emri: orderData.Emri,
// Mbiemri: orderData.Mbiemri,
// Adresa: orderData.Adresa,
// Qyteti: orderData.Qyteti,
// Shteti: orderData.Shteti,
// Email: orderData.Email,
// Numri: orderData.Numri,
// Shenime: orderData.Shenime,
// Status: 'Pending', // You might want to set a default value or provide it from orderData
// OrderDetails: orderData.OrderDetails, // Make sure this is an array of objects matching the OrderDetails schema
// Totali: orderData.Totali,
// Date: orderData.Date,
