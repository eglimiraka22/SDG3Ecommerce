import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Client that is able to read write patch delete (used for admin hooks)
export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false, //doesnt use cache
  apiVersion: "2023-09-04", // use a UTC date string
  token: process.env.REACT_APP_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
});

export const readOnlyClient = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, //used Cache and update not directly
  apiVersion: "2023-09-04", // use a UTC date string
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
