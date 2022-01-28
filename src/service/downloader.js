const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async function masterCrawlDonwloader(json) {
  try {
    const items = json.response.items;
    const mfrFolderName = json.request.manufacture;

    const basePath = path.join(__dirname, "..", "..", "..", "master_crawler");
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

    for (let item of items) {
      const response = await axios({
        url: item.mfr,
        mehtod: "GET",
        responseType: "arraybuffer",
      });
      if (response.data && (item.pname.includes("/") || item.pname.includes("."))) {
        const savablePname = item.pname.split("/").join("-").split(".").join("-");
        fs.writeFileSync(`${basePath}/${mfrFolderName}/${savablePname}.pdf`, response.data);
        fs.writeFileSync(`${basePath}/${mfrFolderName}/${savablePname}.txt`, `${item.pname}`);
        console.log(`✅ ${item.pname}.pdf 가 저장되었습니다.`);
      } else if (response.data) {
        fs.writeFileSync(`${basePath}/${mfrFolderName}/${item.pname}.pdf`, response.data);

        console.log(`✅ ${item.pname}.pdf 가 저장되었습니다.`);
      } else {
        fs.writeFileSync(`${basePath}/${mfrFolderName}/${item.pname}.txt`, `${item.mfr}`);
        console.log(`❌ ${item.pname}의 url이 유효하지 않습니다. 해당 이름에 url이 들어있어요 확인해주세요.`);
      }
    }
    console.log("다운로드가 끝났습니다. 확인 후 진행해주세요");
  } catch (error) {
    console.log(error);
  }
};
