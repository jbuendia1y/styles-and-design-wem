const fs = require("fs");
const path = require("path");

const fetch = require("node-fetch").default;
const cloudinary = require("./cloudinary-api");

const generateTemplate = (
  title,
  description,
  imagesDir
) => `extends ../../layouts/furniture.pug
block prepend head
  -const headTitle = "${title}"
  -const headDescription = "${description}"
block prepend content
  -const title="${title}"
  -const description="${description}"
  -const imagesDir="${imagesDir}"
`;

async function MakeFiles() {
  const dirBase = path.join(__dirname, "../views/pages/furnitures/");
  if (fs.existsSync(dirBase)) return;
  const data = await cloudinary.search
    .expression('format:json AND folder:"styles-and-designs-wem/*"')
    .max_results(100)
    .execute();

  if (fs.existsSync(dirBase)) {
    fs.rmdirSync(dirBase);
    fs.mkdirSync(dirBase, { recursive: true });
  } else fs.mkdirSync(dirBase, { recursive: true });
  for (const item of data.resources) {
    const { title, description } = await fetch(item.secure_url).then((res) =>
      res.json()
    );
    const base = path.join(
      __dirname,
      "../views/pages/furnitures/" +
        title.toLowerCase().split(" ").join("-") +
        ".pug"
    );
    const folder = item.folder.split("/");
    folder.shift();
    const imagesDir = folder.join("/");

    fs.writeFileSync(base, generateTemplate(title, description, imagesDir));
  }
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
