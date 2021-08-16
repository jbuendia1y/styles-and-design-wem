const templateAltPreview = (current, max) => `image-${current}/${max}`;

function slider(box_image, direction, { data, current_index }) {
  const max_index = data.length;
  if (direction === "left") {
    if (current_index === 1) {
      const index = max_index - 1;
      box_image.src = data[index];
      box_image.alt = templateAltPreview(max_index, max_index);
    } else {
      const index = current_index - 1;
      box_image.src = data[index];
      box_image.alt = templateAltPreview(index, data.length);
    }
  } else {
    if (current_index === max_index) {
      box_image.src = data[0];
      box_image.alt = templateAltPreview(1, data.length);
    } else {
      box_image.src = data[current_index + 1];
      box_image.alt = templateAltPreview(current_index + 1, max_index);
    }
  }
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

    const btnR = createButtonWithImg("assets/images/icons/arrow-up-solid.svg"),
      btnL = createButtonWithImg("assets/images/icons/arrow-up-solid.svg");
    btnL.setAttribute("data-direction", "right");
    btnR.setAttribute("data-direction", "left");
    container.append(btnR, btnL);
    container.append(main_image);
    container.append(carousel);
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

  const showPreview = (e) => {
    const site = e.getAttribute("data-site");
    const folder = e.getAttribute("data-folder");

    fetch("assets/data.json")
      .then((res) => res.json())
      .then((data) => {
        createPreview(data["galery"][folder][site]);
      });
  };

  galery.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.type === "button") {
      showPreview(e.target);
    }
  });
})();
