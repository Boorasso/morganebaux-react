import React, { useEffect, useState } from "react";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";
import { client, linkResolver } from "../prismic-configuration";
import NotFound from "./NotFound";
// dev only
import ReactJson from "react-json-view";

const Categorie = ({ match }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;
  const categoriesID = {
    "spectacle-vivant": "XI0a5REAAIZJeB1M",
    images: "YHVo_xQAACMAU34f",
    "expo-evenementiel": "YHVorBQAACEAU3yi",
    decoration: "YHVo2xQAACIAU31z",
    "cine-animation-maquettes": "XI0bPBEAAIZJeB7O",
  };

  useEffect(() => {
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
    fetchData();
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return <ReactJson src={doc} />;
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Categorie;
