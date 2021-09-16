import { createRef, useEffect } from "react";
import useData from "../../hooks/useData";

import "../css/wrongTag.css";

export default function WrongTag({ tag }) {
  const { jsonData } = useData("galery");
  const dinamicText = createRef();

  useEffect(() => {
    if (jsonData) {
      const equalString = Object.getOwnPropertyNames(jsonData).filter(
        (item) => item.toLocaleLowerCase() === tag.toLocaleLowerCase()
      )[0];

      const linkElement = document.createElement("a");
      linkElement.href = "/galery";

      if (equalString !== undefined) {
        dinamicText.current.textContent = "Tal vez quiso decir ";
        linkElement.href += `?tag=${equalString}`;
        linkElement.textContent = equalString;
      } else {
        dinamicText.current.textContent =
          "Puede regresar a la galería de nuevo para elegir la opción correcta ";
        linkElement.textContent = "Galería";
      }

      dinamicText.current.append(linkElement);
    }
  }, [jsonData]);

  return (
    <>
      {jsonData && (
        <p className="wrongTag">
          No pudimos encontrar el tag que buscas
          <span ref={dinamicText} style={{ display: "block" }}></span>
        </p>
      )}
    </>
  );
}
