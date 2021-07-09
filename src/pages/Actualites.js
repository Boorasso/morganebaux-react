import React, { Fragment, useEffect, useState } from "react";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import NotFound from "./NotFound";
import { CustomLink } from "../components";
import styles from "../stylesheets/pages/Actualites.module.scss";
import richTextStyling from "../stylesheets/RichText.module.scss";

const Actualites = (props) => {
  const [doc, setDocData] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getSingle("page_actualites");

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
  }, []); // Only run the Effect hook once

  if (doc) {
    return (
      <Fragment>
        <div
          style={{ backgroundImage: `url("${doc.data.image.url}")` }}
          className={styles.image}
        >
          <div className={styles.title}>
            <RichText render={doc.data.titre} />
          </div>
        </div>
        <section
          className={`${styles.content} ${styles["rich-text"]} ${richTextStyling.content}`}
        >
          <RichText
            render={doc.data.actualites}
            serializeHyperlink={CustomLink}
          />
        </section>
      </Fragment>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default Actualites;
