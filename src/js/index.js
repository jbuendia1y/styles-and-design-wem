(function () {
  const slider = document.querySelector("div.presentation__images");
  let returned = false;
  setInterval(() => {
    if (returned) {
      if (slider.scrollLeft < 250) returned = false;
      slider.scroll({
        behavior: "smooth",
        left: slider.scrollLeft - 250,
      });
    } else {
      if (slider.scrollLeft > 1000) {
        returned = true;
        slider.scroll({
          behavior: "smooth",
          left: slider.scrollLeft - 250,
        });
      } else {
        slider.scroll({
          behavior: "smooth",
          left: slider.scrollLeft + 250,
        });
      }
    }
  }, 5000);
})();
