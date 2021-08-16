const fs = require("fs");
const path = require("path");

const cloudinary = require("./cloudinary-api");

// const company = "styles-and-designs-wem";

const galeryImages = async () => {
  const JSON_DIR = path.join(__dirname, "../../dist/assets/data.json");

  if (fs.existsSync(JSON_DIR)) {
    const json_data = fs.readFileSync(JSON_DIR, "utf-8");
    const cache_data = JSON.parse(json_data.toString());
    return cache_data;
  }

  const data = await cloudinary.search
    .expression('resource_type:image AND folder:"styles-and-designs-wem/*"')
    .max_results(10000)
    .execute()
    .then((res) => {
      return res.resources.map((item) => {
        const folderArray = item.folder.split("/");
        const parent_folder = folderArray[1];
        const child_folder = folderArray[2];

        return {
          url: item.secure_url,
          parent_folder,
          child_folder,
        };
      });
    });

  const dataForSave = { galery: {} };
  for (const item of data) {
    if (!dataForSave.galery[item.parent_folder])
      dataForSave.galery[item.parent_folder] = {};
    if (!dataForSave.galery[item.parent_folder][item.child_folder])
      dataForSave.galery[item.parent_folder][item.child_folder] = [];
    dataForSave.galery[item.parent_folder][item.child_folder].push(item.url);
  }

  return dataForSave;
};

async function fetchURLS() {
  const data = [];

  const base = [__dirname, "../assets/images/main"];
  fs.readdirSync(path.join(...base)).map((image) => {
    data.push("assets/images/main/" + image);
  });

  const galery = await galeryImages();
  const finish = {
    main_data: data,
    galery: galery.galery,
  };

  const JSON_DIR = path.join(__dirname, "../../dist/assets/data.json");
  const PARENT_DIR = path.join(__dirname, "../../dist/assets");
  if (fs.existsSync(JSON_DIR)) {
    fs.rmSync(JSON_DIR);
    fs.writeFileSync(JSON_DIR, JSON.stringify(finish));
  } else {
    fs.mkdirSync(PARENT_DIR, { recursive: true });
    fs.writeFileSync(JSON_DIR, JSON.stringify(finish));
  }
  return finish;
}

module.exports = fetchURLS;
/* 

{
      asset_id: '1b7ba05c672d3b5f8e0511e5605a21b8',
      public_id: 'styles-and-designs-wem/Melamine/Closet/IMG_20201013_183419_wziue2',
      folder: 'styles-and-designs-wem/Melamine/Closet',
      filename: 'IMG_20201013_183419_wziue2',
      format: 'jpg',
      version: 1628636564,
      resource_type: 'image',
      type: 'upload',
      created_at: '2021-08-10T23:02:44+00:00',
      uploaded_at: '2021-08-10T23:02:44+00:00',
      bytes: 538613,
      backup_bytes: 0,
      width: 2736,
      height: 3648,
      aspect_ratio: 0.75,
      pixels: 9980928,
      url: 'http://res.cloudinary.com/dzur9okbf/image/upload/v1628636564/styles-and-designs-wem/Melamine/Closet/IMG_20201013_183419_wziue2.jpg',
      secure_url: 'https://res.cloudinary.com/dzur9okbf/image/upload/v1628636564/styles-and-designs-wem/Melamine/Closet/IMG_20201013_183419_wziue2.jpg',
      status: 'active',
      access_mode: 'public',
      access_control: null,
      etag: '673c3dba430ced62db70c94783afe0c9',
      created_by: [Object],
      uploaded_by: [Object]
    }

*/
