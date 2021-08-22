const fs = require("fs");
const path = require("path");

const fetch = require("node-fetch").default;
const cloudinary = require("./cloudinary-api");

const generateTemplate = ({
  title,
  description,
  image,
  imagesDir,
  content,
}) => `extends ../../layouts/furniture.pug
block prepend head
  +metaData({
    title:"${title}",
    description:"${description}",
    image:"${image}",
    keywords:["muebles","${title}","estilos","diseños","wem"],
    canonical:"/${title.toLowerCase().split(" ").join("-")}"
  })
block prepend content
  -const title="${title}"
  -const description="${description}"
  -const imagesDir="${imagesDir}"
  -const image="${image}"
  -const _content="${content}"
`;

const fetchMarkdown = async () => {
  const matter = require("gray-matter");
  const pages = [];
  const files = await cloudinary.search
    .expression('format:md AND folder:"styles-and-designs-wem/*"')
    .max_results(100)
    .execute();

  const urls = files.resources.map((item) => {
    return { url: item.secure_url, folder: item.folder };
  });
  for (const { url, folder } of urls) {
    const markdown = await fetch(url)
      .then((res) => res.blob())
      .then((md) => md.text())
      .then((data) => data);
    const imagesDir = folder.split("styles-and-designs-wem/")[1];
    const { content, data } = matter(markdown);

    const fileName = data.title.split(" ").join("-").toLowerCase() + ".pug";
    const pagePugDir = path.join(
      __dirname,
      "../src/views/pages/furnitures/" + fileName
    );

    const pugTemplate = generateTemplate({
      ...data,
      imagesDir,
      content: content.trim(),
    });
    pages.push({
      title: data.title,
      description: data.description,
      image: data.image,
      link: "/" + fileName.replace(".pug", ""),
    });
    console.log("✅ Created file " + fileName);
    fs.writeFileSync(pagePugDir, pugTemplate, { encoding: "utf-8" });
  }

  return pages;
};

async function MakeFiles() {
  const cacheDataDir = path.join(__dirname, "./pages.json");
  const dirBase = path.join(__dirname, "../src/views/pages/furnitures");
  if (fs.existsSync(cacheDataDir)) {
    const cacheData = fs.readFileSync(cacheDataDir, "utf-8");
    return JSON.parse(cacheData.toString());
  }
  if (fs.existsSync(dirBase)) {
    fs.rm(dirBase, { recursive: true }, (err) => {
      if (err) return console.log(err.message);
      else {
        console.log("remove " + dirBase);
      }
    });
    fs.mkdirSync(dirBase, { recursive: true });
  } else fs.mkdirSync(dirBase, { recursive: true });

  const pages = await fetchMarkdown();

  fs.writeFileSync(cacheDataDir, JSON.stringify({ pages }));
}

module.exports = MakeFiles;

/* 
[
  {
    asset_id: 'e71764c0cb40ec9f237021d86f332c1b',
    public_id: 'styles-and-designs-wem/Melamine/Baño/Baño_d0gmy5.json',
    folder: 'styles-and-designs-wem/Melamine/Baño',
    filename: 'Baño_d0gmy5.json',
    format: 'json',
    version: 1628899021,
    resource_type: 'raw',
    type: 'upload',
    created_at: '2021-08-13T23:57:01+00:00',
    uploaded_at: '2021-08-13T23:57:01+00:00',
    bytes: 119,
    backup_bytes: 0,
    url: 'http://res.cloudinary.com/dzur9okbf/raw/upload/v1628899021/styles-and-designs-wem/Melamine/Ba%C3%B1o/Ba%C3%B1o_d0gmy5.json',
    secure_url: 'https://res.cloudinary.com/dzur9okbf/raw/upload/v1628899021/styles-and-designs-wem/Melamine/Ba%C3%B1o/Ba%C3%B1o_d0gmy5.json',
    status: 'active',
    access_mode: 'public',
    access_control: null,
    etag: '586c2c169b27973de5761f451ca41561',
    created_by: {
      access_key: '272414693734385',
      custom_id: 'jgamer669@gmail.com',
      external_id: 'fb0ca1f2da0c4b8e4e223538b10d72'
    },
    uploaded_by: {
      access_key: '272414693734385',
      custom_id: 'jgamer669@gmail.com',
      external_id: 'fb0ca1f2da0c4b8e4e223538b10d72'
    }
  }
]
*/
