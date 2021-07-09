import React, { useEffect, useState } from "react";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";
import { Thumbnail, ThreeThumbsRow } from "../components";
import NotFound from "./NotFound";

const Categorie = ({ match, categories }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;
  const categoriesID = {};
  categories.forEach((categorie) => {
    categoriesID[categorie.uid] = {
      id: categorie.id,
      name: categorie.data.nom_de_la_categorie,
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      let query = [Prismic.Predicates.at("document.type", "page_projet")];
      if (uid !== "all") {
        query.push(
          Prismic.Predicates.at(
            "my.page_projet.categorie",
            categoriesID[uid].id
          )
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
      if (uid === "all") {
        document.title = "Morgane Baux | Tous les projets";
      } else {
        document.title = `Morgane Baux | ${categoriesID[uid].name}`;
      }
      fetchData();
    } else {
      console.warn(
        "Page document not found. Make sure it exists in your Prismic repository"
      );
      toggleNotFound(true);
    }
  }, [uid]); // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return (
      <ThreeThumbsRow>
        {doc.results.map((projet) => {
          return (
            <Thumbnail
              key={projet.id}
              backgroundImage={projet.data.image_principale.url}
              linkTo={`/projet/${projet.uid}`}
              linkText={projet.data.titre_du_projet}
            />
          );
        })}
      </ThreeThumbsRow>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Categorie;
