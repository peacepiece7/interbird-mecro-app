const xlsx = require("xlsx");
const path = require("path");
const add_to_sheet = require("./add_to_sheet");
const fs = require("fs");

// rev 12.16.2021
// ! INPUT PATH : 바탕화면에서 crawling_work_sheet.xlsx'폴더를 찾아서 실행해야합니다. 작업 컴퓨터에서 경로를 변경해주세요
// ! INPUT PATH : 바탕화면에서 master_crawler폴더를 찾아서 실행해야합니다. 작업 컴퓨터에서 경로를 변경해주세요

const getMfDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    });
  });
};

module.exports = async function changeDirToExcel() {
  try {
    console.log("pdf to excel after 시작합니다. ");
    const excelDir = path.join(__dirname, "..", "..", "..", "master_crawler", "crawling_work_sheet.xlsx");
    const folderDir = path.join(__dirname, "..", "..", "..", "master_crawler");
    const wb = xlsx.readFile(excelDir);
    const ws = wb.Sheets.AFTER;
    const result = [];
    const mfDirs = await getMfDir(folderDir);

    for (const mfDir of mfDirs) {
      // .xlsx, .pdf를 폴더로 읽을 수 있으니까 확장자가 있으면 제외시킴
      // readdir는 async라서 files에 바로 할당할 수 없음 new promise로 정리하던가 if문 중첩해서 써야함
      if (!mfDir.toLowerCase().includes(".")) {
        const files = fs.readdirSync(`${folderDir}/${mfDir}`);
        if (files[0]) {
          for (let f of files) {
            if (f.toLowerCase().includes(".pdf")) {
              const file = f.slice(0, f.length - 4);
              result.push({ mf: mfDir, pn: file });
            }
          }
        }
      }
    }
    for (let i = 0; i < result.length; i++) {
      const newCell = "C" + (i + 1);
      add_to_sheet(ws, newCell, "string", result[i]["pn"]);
    }
    xlsx.writeFile(wb, excelDir);
    console.log("변경되었습니다.");
  } catch (error) {
    console.log(error);
  }
};
