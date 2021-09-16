const path = require("path");
const fs = require("fs");
require("dotenv").config();

const generateURL = (url) => {
  const baseURL = process.env.CANONICAL_URL;
  const completeUrl =
    url.length === 0 ? baseURL : `${baseURL}/${url.replace(".html", "")}`;
  return `<url><loc>${completeUrl}</loc></url>`;
};
const generateTemplate = (urls) =>
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;

const pages = fs
  .readdirSync(path.join(__dirname, "../dist/"))
  .filter((item) => {
    if (!item.includes(".html")) return false;

    const matches = item.match(/((404)|(google55eafdcb0711a918))\.html$/g);
    if (matches === null) return true;
    if (matches.length === 0) return true;
    else return false;
  });

const makeFile = () => {
  const urls = pages.map((item) => {
    if (item.includes("index.html")) return generateURL("");
    return generateURL(item);
  });
  const template = generateTemplate(urls.join(""));
  console.log("Template String generate");
  fs.writeFileSync(path.join(__dirname, "../dist/sitemap.xml"), template);
  console.log("✅ Created file - Sitemap.xml");
};

makeFile();
