const fetchURLS = require("./fetchUrls");
const createPages = require("./create-one-page-per-furniture");

(async function () {
  await fetchURLS();
  await createPages();
})();
