import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="/images/morgane logo.svg"
        alt="Morgane Baux - Scénographe -
      Logo"
      />
      <h1>
        Morgane Baux <span className="linebreak">Scénographie</span>
        <span>.</span>
      </h1>
    </Link>
  );
};

export default Logo;
