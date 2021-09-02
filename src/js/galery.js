import "../scss/galery.scss";

import "../assets/images/icons/search-plus.svg";
import "../assets/images/icons/arrow-up-solid.svg";

const templateAltPreview = (current, max) => `image-${current}/${max}`;

const directions = {
  left: ({ box, data, indexes: { current_index, max_index } }) => {
    if (current_index === 1) {
      box.src = data[max_index - 1];
      box.alt = templateAltPreview(max_index, max_index);
    } else if (current_index > 1) {
      box.src = data[current_index - 2];
      box.alt = templateAltPreview(current_index - 1, max_index);
    }
  },
  right: ({ box, data, indexes: { current_index, max_index } }) => {
    if (current_index < max_index) {
      box.src = data[current_index]; // current_index = index + 1
      box.alt = templateAltPreview(current_index + 1, max_index);
    } else if (current_index === max_index) {
      box.src = data[0];
      box.alt = templateAltPreview(1, max_index);
    }
  },
};

function slider(box_image, direction, { data, current_index }) {
  const max_index = data.length;
  if (max_index === 1) return;
  if (directions[direction] === undefined) return;
  directions[direction]({
    box: box_image,
    data,
    indexes: { max_index, current_index },
  });
}

function createButtonWithImg(url) {
  const button = document.createElement("button");
  button.type = "button";
  const img = document.createElement("img");
  img.src = url;

  button.append(img);
  return button;
}

(function () {
  const galery = document.querySelector("main.galery");

  const createPreview = (imagesURL) => {
    const main_box = document.createElement("div");
    main_box.classList.add("preview");

    const container = document.createElement("div");
    container.classList.add("preview__box");

    const main_image = document.createElement("img"),
      carousel = document.createElement("div");
    main_image.classList.add("preview__image");
    main_image.src = `${imagesURL[0]}`;
    main_image.alt = "image-1/" + imagesURL.length;
    carousel.classList.add("preview__carousel");

    const btnR = createButtonWithImg("assets/images/arrow-up-solid.svg"),
      btnL = createButtonWithImg("assets/images/arrow-up-solid.svg");
    btnL.setAttribute("data-direction", "right");
    btnR.setAttribute("data-direction", "left");
    container.append(btnR, btnL, main_image, carousel);
    main_box.append(container);

    document.querySelector("body").append(main_box);

    main_box.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG" && e.target.src.endsWith(".svg")) {
        const buttonEL = e.target.parentElement;
        const direction = buttonEL.getAttribute("data-direction");
        const actual_imageEl =
          buttonEL.parentElement.querySelector("img.preview__image");

        const params = actual_imageEl.alt.split("-")[1].split("/");
        const current_index = parseInt(params[0]);
        slider(actual_imageEl, direction, {
          data: imagesURL,
          current_index,
        });
      }
    });
    window.addEventListener("click", (e) => {
      if (!container.contains(e.target)) {
        main_box.remove();
      }
    });
  };

  galery.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.type === "button") {
      const site = e.target.getAttribute("data-site");
      const folder = e.target.getAttribute("data-folder");

      fetch("assets/data.json")
        .then((res) => res.json())
        .then((data) => {
          createPreview(data["galery"][folder][site]);
        });
    }
  });
})();
