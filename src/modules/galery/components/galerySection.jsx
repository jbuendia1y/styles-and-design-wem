import { createRef } from "react";

export default function GalerySection({ name, data }) {
  const list = createRef();
  const iconToggle = createRef();

  const toggle = () => {
    list.current.classList.toggle("galery__list-active");
    iconToggle.current.classList.toggle("galery__icon-active");
  };

  return (
    <div className="galery__section">
      <h2
        onClick={() => {
          toggle();
        }}
        id={name}
      >
        {name}
        <img
          ref={iconToggle}
          src="/assets/images/arrow-up-solid.svg"
          className="galery__icon"
          alt="arrow for toggle the list"
        />
      </h2>
      <ul ref={list} className="galery__list">
        {data[name].map((image, index) => {
          const uniqueKey = "with tag " + name + " number " + index;
          return (
            <li key={"item list " + uniqueKey}>
              <img data-src={image} alt={"image " + uniqueKey} loading="lazy" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
