import { client } from "../../client";

export const getOfferAction = async () => {
  let offersQuery;

  offersQuery =
    '*[_type == "offers"]  { _id, title,activeOffer, offerImage{..., }}[0]';

  const result = await client.fetch(offersQuery);

  return result;
};
