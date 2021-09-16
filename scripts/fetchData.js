const fs = require("fs");
const path = require("path");

const fetchUrls = () => {
  const JSON_DIR = path.join(__dirname, "../dist/assets/data.json");
  const data = JSON.parse(fs.readFileSync(JSON_DIR, "utf-8").toString());
  return data;
};

const fetchPages = () => {
  const cacheDataDir = path.join(__dirname, "./pages.json");
  const cacheData = fs.readFileSync(cacheDataDir, "utf-8");
  const data = JSON.parse(cacheData.toString());
  return data;
};

module.exports = { ...fetchUrls(), ...fetchPages() };
