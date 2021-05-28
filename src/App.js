import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { apiEndpoint } from "./prismic-configuration";
import {
  Home,
  Categorie,
  PageProjet,
  Actualites,
  ContactCV,
  NotFound,
} from "./pages";
import { Navigation } from "./components";

/**
 * Main application componenet
 */
const App = (props) => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];

  return (
    <Fragment>
      <Helmet>
        <script
          async
          defer
          src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
        />
      </Helmet>
      <Navigation />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/categorie/:uid" component={Categorie} />
          <Route exact path="/projet/:uid" component={PageProjet} />
          <Route exact path="/actualites" component={Actualites} />
          <Route exact path="/contact-cv" component={ContactCV} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
