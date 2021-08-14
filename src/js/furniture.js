(function () {
  fetch("http://localhost:3000/assets/data.json")
    .then((res) => res.json())
    .then((data) => console.log(data.galery["Melamine"]["Baño"]));
  const viewFullImage = (image) => {
    const container = document.createElement("div"),
      box = document.createElement("div");

    container.classList.add("viewFullImage");
    box.classList.add("viewFullImage__box");

    const imgElement = document.createElement("img");
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.classList.add("viewFullImage__image");

    box.append(imgElement);
    container.append(box);
    document.body.append(container);

    setTimeout(() => {
      window.addEventListener("click", (e) => {
        if (!box.contains(e.target)) {
          container.remove();
        }
      });
    }, 500);
  };

  const galery = document.querySelector("section.miniGalery");
  galery.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      console.log("a");
      viewFullImage(e.target);
    }
  });
})();
