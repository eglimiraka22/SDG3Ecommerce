// useCurrency.js
import { useCallback, useContext, useEffect, useState } from "react";
import { client } from "../client";
import CartContext from "../store/cart-context";

const useCurrency = () => {
  const [exchangeRates, setExchangeRates] = useState({
    euro: 1,
    dollar: 1.2,
    all: 102,
  });

  const currencyCtx = useContext(CartContext);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const result = await client.fetch(
          '*[_type == "currency"]{ dollar, all }[0]',
        );

        // Set default exchange rate for Euro to 1
        setExchangeRates({
          ...result,
          euro: 1,
        });
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  // Update the selected currency in local storage when it changes
  const convertCurrency = useCallback(
    (price) => {
      let convertedPrice;

      if (currencyCtx.currency === "$") {
        convertedPrice = price * exchangeRates.dollar;
      } else if (currencyCtx.currency === "ALL") {
        convertedPrice = price * exchangeRates.all;
      } else {
        convertedPrice = price;
      }

      // Round the converted price to 2 decimal places
      return convertedPrice.toFixed(2);
    },
    [currencyCtx.currency, exchangeRates],
  );

  const convertPriceStringValue = (price) => {
    if (currencyCtx.currency === "$") {
      return `$  ${price}`;
    } else if (currencyCtx.currency === "ALL") {
      return ` ${Math.round(price / 10) * 10} ALL`;
    } else {
      return `${price} €`;
    }
  };
  return {
    exchangeRates,
    convertPriceStringValue,
    convertCurrency,
  };
};

export default useCurrency;
