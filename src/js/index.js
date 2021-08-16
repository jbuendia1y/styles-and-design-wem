function setCurrentWidth() {
  const slider = window.document.querySelector("div.presentation");
  const widthBody = parseInt(slider.querySelector("img").width);
  const n = (45 / 100) * widthBody;
  return parseInt(widthBody + n);
}

(function () {
  let currentWidth = setCurrentWidth();

  window.addEventListener("resize", () => {
    currentWidth = setCurrentWidth();
  });

  setInterval(() => {
    const slider = document.querySelector("div.presentation");
    const maxWidth =
      slider.querySelector("img").width *
      (slider.querySelectorAll("img").length - 1);

    if (maxWidth === slider.scrollLeft) slider.scrollLeft = 0;
    else slider.scrollLeft += currentWidth;
  }, 4500);
})();
