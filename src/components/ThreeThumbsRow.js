import React from "react";
import styles from "../stylesheets/components/ThreeThumbsRow.module.scss";

const ThreeThumbsRow = (props) => (
  <div className={styles["three-thumbs-row"]}>{props.children}</div>
);

export default ThreeThumbsRow;
