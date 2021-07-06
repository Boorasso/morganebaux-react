import React from "react";
import { Link } from "react-router-dom";

/**
 * Page not found (404) componenet
 */
const NotFound = () => {
  return (
    <div className="not-found" style={notFoundStyle}>
      <h1>404</h1>
      <h2>Document introuvable</h2>
      <p>
        <Link to="/">Retour à la page d'accueil</Link>
      </p>
    </div>
  );
};

const notFoundStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "50vw",
  alignItems: "center",
};

export default NotFound;
