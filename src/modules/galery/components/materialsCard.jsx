import { useHistory } from "react-router";

export default function MaterialsCard({ name, image }) {
  const history = useHistory();

  return (
    <div className="cardArticle">
      <figure className="cardArticle__box">
        <img className="cardArticle__image" data-src={image} alt={name} />
        <figcaption>{name}</figcaption>
      </figure>
      <div className="cardArticle__header">
        <h2 className="cardArticle__title">{name}</h2>
        <p className="cardArticle__description">Lista de imágenes con {name}</p>
      </div>
      <a
        className="cardArticle__link"
        href={history.location.pathname + "?tag=" + name}
      ></a>
    </div>
  );
}
