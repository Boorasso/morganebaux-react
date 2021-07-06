import React, { useEffect, useState } from "react";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";
import NotFound from "./NotFound";

const Categorie = ({ match, categories }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;
  const categoriesID = {};
  categories.forEach(
    (categorie) => (categoriesID[categorie.uid] = categorie.id)
  );

  useEffect(() => {
    const fetchData = async () => {
      let query = [Prismic.Predicates.at("document.type", "page_projet")];
      if (uid !== "all") {
        query.push(
          Prismic.Predicates.at("my.page_projet.categorie", categoriesID[uid])
        );
      }
      const result = await client.query(query, {
        orderings: "[my.page_projet.date_du_projet desc]",
      });

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

    // We filter out anything that isn't a known category uid
    if (categoriesID !== {} && (categoriesID[uid] || uid === "all")) {
      fetchData();
    } else {
      console.warn(
        "Page document not found. Make sure it exists in your Prismic repository"
      );
      toggleNotFound(true);
    }
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    console.log(doc);
    return <h1>Hello Catégorie {uid === "all" ? "all" : uid}</h1>;
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Categorie;
