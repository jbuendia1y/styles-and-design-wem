(function () {
  const images = document.querySelectorAll("[data-src]");

  const intersectionOptions = {
    rootMargin: "150px",
  };

  const loadImage = (img) => {
    const src = img.getAttribute("data-src");
    if (!src) return;
    img.src = src;
  };

  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      loadImage(entry.target);
      imgObserver.unobserve(entry.target);
    });
  }, intersectionOptions);

  images.forEach((image) => {
    imgObserver.observe(image);
  });
})();
