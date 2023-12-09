// useAdminCurrency.js
import { useEffect, useState } from "react";
import { client } from "../client";

const useAdminCurrency = () => {
  const [currencyData, setCurrencyData] = useState({});

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const result = await client.fetch(
          '*[_type == "currency"]{ _id, dollar, all }[0]',
        );
        setCurrencyData(result);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencyData();
  }, []);

  const updateCurrencyRates = async (newRates) => {
    try {
      // Update the currency document in the database
      await client
        .patch(currencyData._id)
        .set({ ...newRates })
        .commit();

      // Update the local state with the new rates
      setCurrencyData((prevData) => ({
        ...prevData,
        ...newRates,
      }));
    } catch (error) {
      console.error("Error updating currency rates:", error);
    }
  };

  return {
    currencyData,
    updateCurrencyRates,
  };
};

export default useAdminCurrency;
