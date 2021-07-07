import React from "react";
import { Link } from "react-router-dom";
import styles from "../stylesheets/components/Thumbnail.module.scss";

const Thumbnail = (props) => {
  const backgroundImage = props.backgroundImage;
  const linkTo = props.linkTo;
  const linkText = props.linkText;

  return (
    <div className={styles.padding}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      >
        <Link to={linkTo} className={styles.link}>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default Thumbnail;
