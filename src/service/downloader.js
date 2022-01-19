const fs = require("fs");
const path = require("path");

module.exports = async function masterCrawlDonwloader(json) {
  try {
    const items = json.response.items;
    const mfrFolderName = json.request.manufacture;

    const basePath = path.join(__dirname, "..", "..", "master_crawler");
    fs.readdir(basePath, (error) => {
      if (error) {
        fs.mkdirSync(basePath);
        fs.mkdirSync(`${basePath}/${mfrFolderName}`);
      } else {
        fs.readdir(`${basePath}/${mfrFolderName}`, (error) => {
          if (error) {
            fs.mkdirSync(`${basePath}/${mfrFolderName}`);
          }
        });
      }
    });
    console.log(json.response.items); // { mfr, pname }
    console.log(json.request.manufacture); // mfr folder name

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
    }
  } catch (error) {}
};
