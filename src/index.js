import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./components/App";
import ScrollToTop from "./components/ScrollToTop";

import "./styles/styles.css";

ReactDOM.render(
  <HashRouter>
    <App />
    <ScrollToTop />
  </HashRouter>,
  document.getElementById("app")
);
