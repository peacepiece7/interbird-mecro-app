const xl = require("excel4node");
const path = require("path");
const fs = require("fs");

const wb = new xl.Workbook();
const ws = wb.addWorksheet("BEFORE");
const afterWs = wb.addWorksheet("AFTER");

// rev 12.16.2021
// ! INPUT :  바탕화면에서 master_crawler폴더를 찾아서 실행해야합니다. 작업 컴퓨터에서 경로를 변경해주세요
const dirPath = path.join(__dirname, "..", "..", "..", "master_crawler");
const backupPath = path.join(__dirname, "..", "..", "..", "master_crawler", "backup");
fs.readdir(backupPath, (err) => {
  if (err) {
    fs.mkdirSync(backupPath);
  }
});

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

// ! ?<>\/.등 파일 이름으로 쓸 수 없는 문자를 어떻게 저장해야 좋을지 상담해보기
// ! 1. 저장 할 수 없는 문자를 - 으로 저장한다. 대신 .txt파일에 저장할 수 없는 문자가 포함된 원본을 저장해둔다.
// ! 1-1 excel에는 저장 할 수 없는 문자를 - 으로 변경한 pdf를 저장해둔다.
const getFullDir = (dirPath, mfDirs) => {
  const result = [];
  console.log("mfDirs@", mfDirs);
  for (const mfDir of mfDirs) {
    console.log("mfDir@", mfDir);
    const files = fs.readdirSync(`${dirPath}/${mfDir}`);
    console.log("files@", files);
    if (files[0]) {
      for (let f of files) {
        console.log(f);
        if (f.toLowerCase().includes(".pdf")) {
          result.push({ mf: mfDir, pn: f.slice(0, f.length - 4) });
        }
      }
    }
  }
  return result;
};

module.exports = async function saveDirToExcel() {
  try {
    const mfDirs = await getMfDir(dirPath);
    const result = getFullDir(dirPath, mfDirs);
    console.log("result@", result);
    for (let i = 0; i < result.length; i++) {
      const mf = result[i].mf;
      const pn = result[i].pn;

      // rev 12.16.2021
      //! OUTPUT : 작업 컴퓨터에서 바탕화면 폴더의 경로를 지정해주세요(window)
      // const dir = path.join(__dirname, "..", "..");

      ws.cell(i + 1, 1).string(mf);
      ws.cell(i + 1, 2).string(pn);

      afterWs.cell(i + 1, 1).string(mf);
      afterWs.cell(i + 1, 2).string(pn);

      wb.write(`${dirPath}/crawling_work_sheet.xlsx`);
      wb.write(`${backupPath}/crawling_work_sheet_backup.xlsx`);
    }
    return "저장이 완료되었습니다.";
  } catch (error) {
    console.log(error);
  }
};
