import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Prismic from "prismic-javascript";
import { client } from "./prismic-configuration";
import { apiEndpoint } from "./prismic-configuration";
import {
  Home,
  Categorie,
  PageProjet,
  Actualites,
  ContactCV,
  NotFound,
} from "./pages";
import { Logo, Navigation } from "./components";
import styles from "./stylesheets/App.module.scss";

function removeSplashScreen() {
  const splashScreen = document.getElementById("pre-render");
  if (splashScreen) {
    splashScreen.style.opacity = "0%";
    window.setTimeout(() => splashScreen.remove(), 2000);
  }
}

/**
 * Main application componenet
 */
const App = (props) => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];
  const [doc, setDocData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await client.query(
        Prismic.Predicates.at("document.type", "categories"),
        { orderings: "[my.categories.position]" }
      );
      if (result) {
        // We use the State hook to save the document
        removeSplashScreen();
        return setDocData(result);
      } else {
        // Otherwise show an error message
        console.warn("Couldn't retrieve categories.");
      }
    };
    fetchData();
  }, []); // Only run the Effect hook once

  return (
    <Fragment>
      <Helmet>
        <script
          async
          defer
          src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
        />
      </Helmet>
      {doc && (
        <div className={styles.main}>
          <BrowserRouter>
            <header className={styles.navigation}>
              <Logo />
              <Navigation categories={doc.results} />
            </header>
            <main className={styles.content}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route
                  exact
                  path="/categorie/:uid"
                  render={(props) => (
                    <Categorie {...props} categories={doc.results} />
                  )}
                />
                <Route exact path="/projet/:uid" component={PageProjet} />
                <Route exact path="/actualites" component={Actualites} />
                <Route exact path="/contact-cv" component={ContactCV} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </BrowserRouter>
        </div>
      )}
    </Fragment>
  );
};

export default App;
