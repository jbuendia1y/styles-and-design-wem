import { useHistory } from "react-router";

export default function MaterialsCard({ name, image }) {
  const history = useHistory();

  return (
    <a href={history.location.pathname + "?tag=" + name} className="card">
      <img className="card__image" data-src={image} alt={name} />
      <h2 className="card__title">{name}</h2>
    </a>
  );
}
