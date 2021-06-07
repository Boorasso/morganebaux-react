import React, { useEffect, useState } from "react";
import { client } from "../prismic-configuration";
import NotFound from "./NotFound";

const ContactCV = () => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getSingle("page_contact_cv");

      if (result) {
        // We use the State hook to save the document
        return setDocData(result);
      } else {
        // Otherwise show an error message
        console.warn(
          "Page document not found. Make sure it exists in your Prismic repository"
        );
        toggleNotFound(true);
      }
    };
    fetchData();
  }); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return <h1>Hello Page Contact / CV</h1>;
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default ContactCV;
