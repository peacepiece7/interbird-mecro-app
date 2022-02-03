const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = async function masterCrawlDonwloader(json) {
  try {
    console.log("download를 시작합니다.");
    const items = json.response.items;
    const mfrFolderName = json.request.manufacture
      .split("")
      .map((v) => v.replace(/\.|,|\/|\\|\?|\*|:|<|>|"|'|`/g, ""))
      .join("");

    console.log("mfrFolderName@", mfrFolderName);
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

    console.log("items", items);

    for (let item of items) {
      console.log("url iitem.mfr", item.mfr);
      const mfrURL = item.mfr.includes("https:") || item.mfr.includes("http:") ? item.mfr : `https:${item.mfr}`;

      const response = await axios({
        url: mfrURL,
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
    console.log("다운로드가 끝났습니다. 아래 순서에 따라 엑셀 시트를 생성해주세요.");
    console.log("1. 업로드 하지 않을 .pdf 파일을 삭제해주세요. 이름을 변경하면 안됩니다.");
    console.log("2. 폴더 정렬을 '크기'로 변경한 뒤 before 버튼을 클릭 해주세요.");
    console.log("3. pdf이름을 메인 파트넘버로 변경한 뒤 after 버튼을 클릭 해주세요.");
  } catch (error) {
    console.log(error);
  }
};
