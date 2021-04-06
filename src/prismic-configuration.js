import Prismic from "prismic-javascript";

// -- Prismic API endpoint
export const apiEndpoint = "https://morganebaux-react.cdn.prismic.io/api/v2";

// -- Access Token if the repository is not public
const accessToken =
  "MC5ZR3hCdXhRQUFDTUFLemxx.a1nvv71jT--_ve-_vVgtIDrvv71_ewfvv73vv73vv71H77-9YO-_ve-_vSfvv71S77-977-977-9Yzho";

// -- Link resolution rules
export const linkResolver = (doc) => {
  if (doc.type === "page") return `/page/${doc.uid}`;
  return "/";
};

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken });
