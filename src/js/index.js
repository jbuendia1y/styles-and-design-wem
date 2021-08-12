function setCurrentWidth() {
  const slider = window.document.querySelector("div.presentation__images");
  const widthBody = parseInt(slider.querySelector("img").width);
  const n = (40 / 100) * widthBody;
  return parseInt(widthBody + n);
}

(function () {
  let currentWidth = setCurrentWidth();

  window.addEventListener("resize", () => {
    currentWidth = setCurrentWidth();
  });

  setInterval(() => {
    const slider = document.querySelector("div.presentation__images");
    const maxWidth = slider.querySelector("img").width * 3;
    console.log(maxWidth - 100 <= slider.scrollLeft);
    if (maxWidth - 100 <= slider.scrollLeft) slider.scrollLeft = 0;
    else slider.scrollLeft += currentWidth;
  }, 4500);
})();
