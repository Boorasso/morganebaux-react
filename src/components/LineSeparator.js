import React from "react";
import styles from "../stylesheets/components/LineSeparator.module.scss";

const LineSeparator = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles["line-separation"]}></div>
      <div className={styles.text}>
        <h4>{props.children}</h4>
        <span className={styles.arrow}>&#10095;</span>
      </div>
      <div className={styles["line-separation"]}></div>
    </div>
  );
};

export default LineSeparator;
