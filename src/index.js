import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import App from "./components/App";
import ModalContainer from "./components/ModalContainer";
import ScrollToTop from "./components/ScrollToTop";

import "./styles/styles.css";

ReactDOM.render(
  <HashRouter>
    <ModalContainer>
      <App />
      <ScrollToTop />
    </ModalContainer>
  </HashRouter>,
  document.getElementById("app")
);
