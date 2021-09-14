import useData from "../../hooks/useData.js";
import CorrectTag from "./correctTag.jsx";
import WrongTag from "./wrongTag.jsx";

export default function Galery({ tag }) {
  const { jsonData } = useData("galery/" + tag);

  return (
    <>
      {jsonData === undefined ? (
        <WrongTag tag={tag} />
      ) : (
        <CorrectTag data={jsonData} tag={tag} key={tag + "Section"} />
      )}
    </>
  );
}
