const fs = require("fs");
const path = require("path");

const pagesJSON = path.join(__dirname, "./pages.json");
const pagesGenerates = path.join(__dirname, "../views/pages/furnitures");
const compiledFiles = path.join(__dirname, "../../dist");

if (fs.existsSync(pagesJSON)) fs.unlinkSync(pagesJSON);
if (fs.existsSync(pagesGenerates))
  fs.rm(pagesGenerates, { recursive: true }, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("complete");
  });
if (fs.existsSync(compiledFiles))
  fs.rm(compiledFiles, { recursive: true }, (err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("complete");
  });
