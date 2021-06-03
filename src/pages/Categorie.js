import React, { useEffect, useState } from "react";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";
import NotFound from "./NotFound";
// dev only
import ReactJson from "react-json-view";

const Categorie = ({ match, categories }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  useEffect(() => {
    const categoriesID = {};
    if (categories) {
      categories.forEach(
        (categorie) => (categoriesID[categorie.uid] = categorie.id)
      );
    }

    const fetchData = async () => {
      let query = [Prismic.Predicates.at("document.type", "page_projet")];
      if (uid !== "all") {
        query.push(
          Prismic.Predicates.at("my.page_projet.categorie", categoriesID[uid])
        );
      }
      const result = await client.query(query);

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

    if (categoriesID !== {}) {
      fetchData();
    }
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    console.log(doc);
    return <ReactJson src={doc} />;
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Categorie;
