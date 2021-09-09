import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "../../scss/galery.scss";
import "../../assets/images/icons/arrow-up-solid.svg";

import Galery from "./components/galery.jsx";
import useData from "../hooks/useData";
import MaterialsCard from "./components/materialsCard.jsx";

const withOutTag = () => {
  const { jsonData, loading } = useData("galery");
  return (
    <>
      <p>
        En esta galería usted podrá ver todos nuestros productos, elija el
        material que desea observar
      </p>
      <div className="galery__materials">
        {jsonData &&
          Object.keys(jsonData).map((item) => {
            const materialImage =
              jsonData[item][Object.keys(jsonData[item])[0]][0];
            return (
              <MaterialsCard name={item} image={materialImage} key={item} />
            );
          })}
      </div>
    </>
  );
};

function App() {
  const query = new URLSearchParams(useLocation().search);
  const [tag, setTag] = useState(query.get("tag"));

  let content;
  if (tag) content = <Galery tag={tag} />;
  else content = withOutTag();

  return (
    <main className="container">
      <h1>Galería de Imágenes</h1>
      {content}
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
