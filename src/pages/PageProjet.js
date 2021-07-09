import React, { useEffect, useState } from "react";
import { client } from "../prismic-configuration";
import NotFound from "./NotFound";

const PageProjet = ({ match }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID("page_projet", uid);

      if (result) {
        // We use the State hook to save the document
        document.title = `Morgane Baux | ${result.data.titre_du_projet}`;
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
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return <h1>Hello Projet {doc.data.titre_du_projet}</h1>;
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default PageProjet;
