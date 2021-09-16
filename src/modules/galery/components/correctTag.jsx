import GalerySection from "./galerySection.jsx";

export default function CorrectTag({ data, tag }) {
  return (
    <>
      <p>
        Lista de productos con {tag}, para desplegar y ver las imágenes, de
        click en uno de los productos de la lista .
      </p>
      <div className="galery">
        {data &&
          Object.getOwnPropertyNames(data).map((item) => (
            <GalerySection data={data} name={item} key={item} />
          ))}
      </div>
    </>
  );
}
