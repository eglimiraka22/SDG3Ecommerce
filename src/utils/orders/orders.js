// utils/sanity.js

import { client } from "../../client";

export const fetchOrders = async (pageSize, page, orderStatus) => {
  let sanityQuery = '*[_type == "orders"';

  if (orderStatus && orderStatus !== "ALL") {
    sanityQuery += ` && Status == '${orderStatus}']`;
  } else sanityQuery += `]`;

  sanityQuery += ` | order(_createdAt desc) [${(page - 1) * pageSize}...${
    page * pageSize
  }] {
    _id,
    Emri,
    Mbiemri,
    Shteti,
    Qyteti,
    Adresa,
    Email,
    Numri,
    Shenime,
    Status,
    OrderDetails,
    Totali,
    Date
  }`;

  const result = await client.fetch(sanityQuery);

  return result;
};
