import React, { useEffect, useState } from "react";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import { CustomLink } from "../components";
import NotFound from "./NotFound";
import styles from "../stylesheets/pages/ContactCV.module.scss";
import richTextStyling from "../stylesheets/RichText.module.scss";

const ContactCV = (props) => {
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
    document.title = "Morgane Baux | Contact - CV";
  }, []); // Only run the Effect hook once

  if (doc) {
    return (
      <div
        className={`${styles.main} ${richTextStyling.content} ${styles["rich-text"]}`}
      >
        <section className={styles.left}>
          <img
            src={doc.data.image.url}
            alt="Morgane Baux"
            className={styles.image}
          />
          <a
            href={`mailto:${doc.data["e-mail"][0].text}`}
            target="_blank"
            className={styles.contact}
          >
            {doc.data["e-mail"][0].text}
          </a>
          <h2 className={styles.title}>Compétences</h2>
          <RichText
            render={doc.data.competences}
            serializeHyperlink={CustomLink}
          />
          <h2 className={styles.title}>Formation</h2>
          <RichText
            render={doc.data.formation}
            serializeHyperlink={CustomLink}
          />
        </section>
        <section className={styles.right}>
          <h1 className={styles["mobile-hide"]}>CV</h1>
          <h2 className={styles.title}>Projets</h2>
          <RichText render={doc.data.projets} serializeHyperlink={CustomLink} />
        </section>
      </div>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default ContactCV;
