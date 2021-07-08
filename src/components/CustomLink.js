import React from "react";
import { Link } from "react-router-dom";
import { linkResolver } from "../prismic-configuration";

const CustomLink = (type, element, content, children, index) => {
  return (
    <Link key={element.data.id} to={linkResolver(element.data)}>
      {content}
    </Link>
  );
};

export default CustomLink;
