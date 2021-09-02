const fs = require("fs");
const path = require("path");

const fetchUrls = () => {
  const JSON_DIR = path.join(__dirname, "../dist/assets/data.json");
  return JSON.parse(fs.readFileSync(JSON_DIR, "utf-8").toString());
};

const fetchPages = () => {
  const cacheDataDir = path.join(__dirname, "./pages.json");
  const cacheData = fs.readFileSync(cacheDataDir, "utf-8");
  return JSON.parse(cacheData.toString());
};

module.exports = { ...fetchUrls(), ...fetchPages() };
