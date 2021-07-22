import React, { Fragment, useEffect, useState } from "react";
import { client } from "../prismic-configuration";
import { RichText } from "prismic-reactjs";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { CustomLink, LineSeparator } from "../components";
import NotFound from "./NotFound";
import styles from "../stylesheets/pages/PageProjet.module.scss";
import richTextStyling from "../stylesheets/RichText.module.scss";

const PageProjet = ({ match }) => {
  const [doc, setDocData] = useState(null);
  const [lightBoxState, setLightBoxState] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const [infoIsOpen, setInfoIsOpen] = useState(false);
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
    const images = doc.data.illustration.map((item) => item.image.url);
    const photoIndex = lightBoxState.photoIndex;
    const isOpen = lightBoxState.isOpen;

    return (
      <Fragment>
        {lightBoxState.isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() =>
              setLightBoxState({ ...lightBoxState, isOpen: false })
            }
            onMovePrevRequest={() =>
              setLightBoxState({
                ...lightBoxState,
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              setLightBoxState({
                ...lightBoxState,
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
        <section className={styles["project-top"]}>
          <img
            src={doc.data.image_principale.url}
            alt={doc.data.image_principale.alt}
            className={styles["main-image"]}
          />
          <article
            className={`${styles.description} ${richTextStyling.content} ${
              !infoIsOpen ? styles.closed : ""
            }`}
          >
            <h2 style={{ color: doc.data.couleur_du_titre }}>
              {doc.data.titre_du_projet}
            </h2>
            <h3>{doc.data.titre_du_poste}</h3>
            {doc.data.description_du_projet.length > 0 && (
              <Fragment>
                <button
                  className={styles.more}
                  onClick={() => setInfoIsOpen(!infoIsOpen)}
                  name="Plus d'infos"
                >
                  {infoIsOpen ? <div className={styles.less}></div> : "+"}
                </button>
                <RichText
                  render={doc.data.description_du_projet}
                  serializeHyperlink={CustomLink}
                />
              </Fragment>
            )}
          </article>
        </section>
        <LineSeparator mobileHide={true}>La suite</LineSeparator>
        <section className={styles.flow}>
          {doc.data.illustration.map((item, index) => {
            if (item.image.miniature) {
              return (
                <div
                  key={index}
                  className={`${styles["thumb-container"]} ${
                    styles[`container-${item.format.slug}`]
                  }`}
                >
                  <a
                    href={item.image.url}
                    className={`${styles.miniature} ${
                      styles[`${item.format.slug}`]
                    }`}
                    onClick={(e) => {
                      setLightBoxState({ photoIndex: index, isOpen: true });
                      e.preventDefault();
                    }}
                    style={{
                      backgroundImage: `url("${item.image.miniature.url}")`,
                    }}
                  >
                    <img
                      src={item.image.miniature.url}
                      alt={item.image.meta}
                      className={styles.image}
                    />
                  </a>
                </div>
              );
            }
            return null;
          })}
          {doc.data.video && doc.data.video.html && (
            <div
              dangerouslySetInnerHTML={{ __html: doc.data.video.html }}
              className={styles.embed}
            />
          )}
        </section>
      </Fragment>
    );
  } else if (notFound) {
    return <NotFound />;
  }
  return null;
};

export default PageProjet;
