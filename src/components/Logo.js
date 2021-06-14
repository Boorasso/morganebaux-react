import React from "react";
import { Link } from "react-router-dom";
import styles from "../stylesheets/components/Logo.module.scss";

const Logo = () => {
  return (
    <Link to="/" className={styles["logo-link"]}>
      <img
        src="/images/morgane logo.svg"
        alt="Morgane Baux - Scénographe -
      Logo"
      />
      <h1>
        Morgane Baux <span>Scénographie</span>
        <span>.</span>
      </h1>
    </Link>
  );
};

export default Logo;
