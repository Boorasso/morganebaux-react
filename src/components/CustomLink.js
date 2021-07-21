import React from "react";
import { Link } from "react-router-dom";
import { linkResolver } from "../prismic-configuration";

const CustomLink = (type, element, content, children, index) => {
  if (element.data.link_type === "Web") {
    return (
      <a key={element.data.id || index} href={element.data.url} target="_blank">
        {content}
      </a>
    );
  } else {
    return (
      <Link key={element.data.id || index} to={linkResolver(element.data)}>
        {content}
      </Link>
    );
  }
};

export default CustomLink;
