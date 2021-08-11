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
  const fetchMaterials = () => {
    const materialsEl = document.getElementsByTagName("h2");
    const materials = [];
    for (const materialEl of materialsEl) {
      materials.push(materialEl.textContent);
    }
    return materials;
  };

  const fetchSites = () => {
    const foldersEl = document.querySelectorAll(".folder-box");
    const sites = [];
    for (const item of foldersEl) {
      sites.push(item.getElementsByTagName("h3")[0].textContent);
    }

    return sites;
  };

  const makeOption = (text) => {
    const optionEl = document.createElement("option");
    optionEl.textContent = text;
    optionEl.value = text;

    return optionEl;
  };

  const loadFilters = (materials, sites) => {
    const selectMaterials = document.querySelector("select#materials");
    const selectSites = document.querySelector("select#sites");

    const fragmentMaterials = document.createDocumentFragment();
    for (const material of materials) {
      fragmentMaterials.append(makeOption(material));
    }
    const fragmentSites = document.createDocumentFragment();
    for (const site of sites) {
      fragmentSites.append(makeOption(site));
    }

    selectMaterials.append(fragmentMaterials);
    selectSites.append(fragmentSites);
  };

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
        const max_index = parseInt(params[1]);
        slider(actual_imageEl, direction, {
          data: imagesURL,
          current_index,
        });
        /* if (direction === "left") {
          if (current_index === 1) {
            const index = imagesURL.length - 1;
            actual_imageEl.src = imagesURL[index];
            actual_imageEl.alt = templateAltPreview(
              imagesURL.length,
              imagesURL.length
            );
          } else {
            const index = current_index - 1;
            actual_imageEl.src = imagesURL[index];
            actual_imageEl.alt = templateAltPreview(index, imagesURL.length);
          }
        } else {
          if (current_index === max_index) {
            actual_imageEl.src = imagesURL[0];
            actual_imageEl.alt = templateAltPreview(1, imagesURL.length);
          } else {
            actual_imageEl.src = imagesURL[current_index + 1];
            actual_imageEl.alt = templateAltPreview(
              current_index + 1,
              imagesURL.length
            );
          }
        } */
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

  const createSectionFolder = ({ folder, folder_childs }) => {
    const main_box = document.createElement("div");
    main_box.classList.add("box");
    const folder_name = document.createElement("h2");
    folder_name.textContent = folder;

    const folder_container = document.createElement("div");
    folder_container.classList.add("folder");

    const fragment_folders_child = document.createDocumentFragment();

    // Creating Childs
    Object.keys(folder_childs).map((item) => {
      const folder_box = document.createElement("div");
      folder_box.classList.add("folder-box");

      const folder_child_name = document.createElement("h3");
      folder_child_name.textContent = item;

      const folder_slider = document.createElement("div");
      folder_slider.classList.add("folder-slider");

      const button = document.createElement("button");
      button.classList.add("folder__button");
      button.type = "button";
      button.setAttribute("data-folder", folder);
      button.setAttribute("data-site", item);

      const svg_search = document.createElement("svg");
      const use_search = document.createElement("use");
      use_search.setAttribute(
        "xlink:href",
        "assets/images/icons/search-plus.svg#img"
      );

      use_search.innerHTML = `<svg id="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search-plus" class="svg-inline--fa fa-search-plus fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>`;
      svg_search.append(use_search);
      button.append(svg_search);
      folder_slider.append(button);
      const fragment_images = document.createDocumentFragment();

      // Adding Image
      const img = document.createElement("img");
      img.src = `assets/images/data/${folder}/${item}/${folder_childs[item][0]}`;
      img.alt = `${folder} ${item} ${folder_childs[item][0]}`;
      fragment_images.append(img);

      folder_box.append(folder_child_name);
      folder_slider.append(fragment_images);
      folder_box.append(folder_slider);
      fragment_folders_child.append(folder_box);
    });

    folder_container.append(fragment_folders_child);
    main_box.append(folder_name);
    main_box.append(folder_container);

    const a = document.querySelector("section#folders");
    a.append(main_box);
  };

  const clearSection = () => {
    const childs = document.querySelector("section#folders").children;
    for (const child of childs) {
      child.remove();
    }
  };

  galery.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.type === "button") {
      showPreview(e.target);
    }
  });

  const materials = fetchMaterials();
  const sites = fetchSites();
  loadFilters(materials, sites);

  const materialSelect = document.querySelector("select#materials");
  const siteSelect = document.querySelector("select#sites");

  const section_cache = document.querySelector("section#folders");

  materialSelect.addEventListener("change", (e) => {
    fetch("/assets/data.json")
      .then((res) => res.json())
      .then((main_data) => {
        if (main_data.galery[e.target.value]) {
          clearSection();
          createSectionFolder({
            folder: e.target.value,
            folder_childs: main_data.galery[e.target.value],
          });
        } else console.log("F");
      });
  });
  siteSelect.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
})();
