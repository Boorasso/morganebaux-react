import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "../stylesheets/components/Navigation.module.scss";

const Navigation = ({ categories }) => {
  const [isNavOpen, setisNavOpen] = useState(false);

  if (categories) {
    const slicedCategories = categories.map((categorie) => {
      const index = categorie.data.index_de_la_lettre_coloree;
      const nameStart = categorie.data.nom_de_la_categorie.slice(0, index);
      const letter = categorie.data.nom_de_la_categorie.slice(index, index + 1);
      const nameEnd = categorie.data.nom_de_la_categorie.slice(index + 1);

      return {
        id: categorie.id,
        name: categorie.data.nom_de_la_categorie,
        color: categorie.data.couleur_de_la_lettre_coloree,
        nameStart: nameStart,
        letter: letter,
        nameEnd: nameEnd,
        slug: categorie.uid,
      };
    });

    const handleButtonClick = () => setisNavOpen(!isNavOpen);
    const openClass = isNavOpen ? styles.isOpen : styles.isClosed;
    const topActiveClass = isNavOpen ? styles["burger-top"] : "";
    const bottomActiveClass = isNavOpen ? styles["burger-bottom"] : "";

    return (
      <div className={styles["nav-container"]}>
        <button className={styles.button} onClick={handleButtonClick}>
          <div className={`${styles.burger} ${topActiveClass}`}></div>
          {!isNavOpen && <div className={`${styles.burger}`}></div>}
          <div className={`${styles.burger} ${bottomActiveClass}`}></div>
        </button>
        <nav className={`${styles.nav} ${openClass}`}>
          <NavLink
            to="/"
            exact
            className={styles.link}
            onClick={handleButtonClick}
            activeClassName={styles.active}
          >
            Home
          </NavLink>
          {slicedCategories.map((categorie) => (
            <NavLink
              to={"/categorie/" + categorie.slug}
              key={categorie.id}
              className={styles.link}
              activeClassName={styles.active}
              onClick={handleButtonClick}
            >
              {categorie.nameStart}
              <span style={{ color: categorie.color }}>{categorie.letter}</span>
              {categorie.nameEnd}
            </NavLink>
          ))}
        </nav>
      </div>
    );
  } else {
    return null;
  }
};

export default Navigation;
