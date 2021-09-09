import useData from "../../hooks/useData.js";
import GalerySection from "./galerySection.jsx";

export default function Galery({ tag }) {
  const { jsonData, loading } = useData("galery/" + tag);

  return (
    <>
      <p>
        Lista de productos con {tag}, para desplegar y ver las imágenes, de
        click en uno de los productos de la lista .
      </p>
      <div className="galery">
        {jsonData &&
          Object.getOwnPropertyNames(jsonData).map((item) => (
            <GalerySection data={jsonData} name={item} key={item} />
          ))}
      </div>
    </>
  );
}
