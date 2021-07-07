import React, { Fragment, useEffect, useState } from "react";
import Prismic from "prismic-javascript";
import { client } from "../prismic-configuration";
import { Thumbnail, LineSeparator, ThreeThumbsRow } from "../components";
import NotFound from "./NotFound";

const Home = ({ match }) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);
  const uid = match.params.uid;

  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.query(
        Prismic.Predicates.at("document.type", "page_projet"),
        {
          orderings: "[my.page_projet.date_du_projet desc]",
          pageSize: 3,
        }
      );
      const images = await client.getSingle("home");

      if (result && images) {
        // We use the State hook to save the document
        return setDocData({ ...result, ...images });
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
    return (
      <Fragment>
        <ThreeThumbsRow>
          <Thumbnail
            backgroundImage={doc.data.image_tous_les_projets.url}
            linkTo="/categorie/all"
            linkText="Tous les projets"
          />
          <Thumbnail
            backgroundImage={doc.data.image_actualites.url}
            linkTo="/actualites"
            linkText="Actualités"
          />
          <Thumbnail
            backgroundImage={doc.data.image_contact_cv.url}
            linkTo="/contact-cv"
            linkText="Contact CV"
          />
        </ThreeThumbsRow>
        <LineSeparator>Dernièrement</LineSeparator>
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
      </Fragment>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Home;
