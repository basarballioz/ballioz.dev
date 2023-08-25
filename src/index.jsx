import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app/layout/App";
import { HashRouter } from "react-router-dom";
import ReactGA from "react-ga4";

ReactGA.initialize('G-ML43NQ3C8Q');

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
