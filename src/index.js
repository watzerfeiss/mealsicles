import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./styles/styles.css";

// parcel magic
// eslint-disable-next-line
if (module.hot) {
  module.hot.accept(); // eslint-disable-line
}

ReactDOM.render(<App />, document.getElementById("app"));
