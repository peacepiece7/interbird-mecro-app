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
    const excelDir = path.join(__dirname, "..", "..", "crawling_work_sheet.xlsx");
    const folderDir = path.join(__dirname, "..", "..", "master_crawler");
    const wb = await xlsx.readFile(excelDir);
    const ws = await wb.Sheets.AFTER;
    const result = [];
    const mfDirs = await getMfDir(folderDir);

    for (const mfDir of mfDirs) {
      const files = fs.readdirSync(`${folderDir}/${mfDir}`);
      if (files[0]) {
        for (let f of files) {
          if (f.includes(".pdf") || f.includes(".PDF")) {
            const file = f.slice(0, f.length - 4);
            result.push({ mf: mfDir, pn: file });
          }
        }
      }
    }
    for (let i = 0; i < result.length; i++) {
      const newCell = "C" + (i + 1);
      add_to_sheet(ws, newCell, "string", result[i].pn);
    }
    xlsx.writeFile(wb, excelDir);
    return "변경되었습니다.";
  } catch (error) {
    console.log(error);
  }
};
