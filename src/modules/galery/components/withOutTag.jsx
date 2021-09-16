import useData from "../../hooks/useData";
import MaterialsCard from "./materialsCard.jsx";

export default function WithOutTag() {
  const { jsonData } = useData("galery");

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
}
