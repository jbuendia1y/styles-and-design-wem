import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "../../scss/galery.scss";
import "../../assets/images/icons/arrow-up-solid.svg";

import Galery from "./components/galery.jsx";
import WithOutTag from "./components/withOutTag.jsx";

function App() {
  const query = new URLSearchParams(useLocation().search);
  const [tag] = useState(query.get("tag"));

  return (
    <main className="container">
      <h1>Galería de Imágenes</h1>
      {tag ? <Galery tag={tag} /> : <WithOutTag />}
    </main>
  );
}

export default function _App() {
  return (
    <Router>
      <App />
    </Router>
  );
}
