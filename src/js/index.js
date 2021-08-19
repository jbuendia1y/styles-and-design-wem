function setCurrentWidth() {
  const slider = window.document.querySelector("div.presentation");
  const widthBody = parseInt(slider.querySelector("img").width);
  const n = (50 / 100) * widthBody;
  return parseInt(widthBody + n);
}

(function () {
  setInterval(() => {
    const currentWidth = setCurrentWidth();
    const slider = document.querySelector("div.presentation");
    const maxWidth =
      slider.querySelector("img").width *
      (slider.querySelectorAll("img").length - 1);

    if (maxWidth === slider.scrollLeft) slider.scrollLeft = 0;
    else slider.scrollLeft += currentWidth;
  }, 5000);
})();
