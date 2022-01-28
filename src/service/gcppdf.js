const puppeteer = require("puppeteer");
const fs = require("fs");

module.exports = async function gcpPdfUploader(siteName) {
  try {
    console.log("gcp server pdf 업로드를 시작합니다.");
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size:1400,1400"],
    });

    await browser.userAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
    );

    let page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1280,
    });

    page.on("console", (log) => {
      if (log._type !== "warning") {
        console.log(log._text);
      }
    });

    // Login
    await page.goto("http://34.64.149.214/master/login.jsp");
    await page.waitForSelector("input[name=id]");

    await page.type("input[name=id]", process.env.NEW_ALLDATASHEET_ID);
    await page.type("input[name=pwd]", process.env.NEW_ALLDATASHEET_PASSWORD);
    await page.waitForTimeout(1000);
    await page.click("input[type=submit]");

    // * 인자가 문자열일 경우

    const folderPath = `${__dirname.split("Desktop")[0]}\\Desktop\\upload`;
    const input = fs.readdirSync(folderPath).toString();

    const pdfFiles = input.split(",").filter((file) => {
      if (file.includes(".pdf") || file.includes(".PDF")) {
        return file;
      }
    });
    const imgFiles = input.split(",").filter((file) => {
      if (file.includes(".gif") || file.includes(".GIF")) {
        return file;
      }
    });
    // PDF 등록
    await page.waitForTimeout(1000);
    for (let i = 0; i < pdfFiles.length; i++) {
      page = await browser.newPage();
      await page.goto("http://34.64.149.214/master/datasheet_reg.jsp", {
        waitUntil: "networkidle0",
      });
      const pdfName = pdfFiles[i].toString().slice(0, pdfFiles[i].length - 4);
      await page.waitForTimeout(1000);
      await page.type("input[name=info]", pdfName);
      await page.type(`input[name=sFactory]`, siteName);
      const pdfFile = await page.$("input[name=pdf]");
      const pdfPath = `${folderPath}\\${pdfFiles[i]}`;
      pdfFile.uploadFile(pdfPath);
      const imgPath = `${folderPath}\\${imgFiles[i]}`;
      const imageFile = await page.$("input[name=img]");
      imageFile.uploadFile(imgPath);
      await page.waitForTimeout(Math.floor(Math.random() * 2000 + 2000));
      await page.click("input[value=등록하기]");
      console.log("Uploaded part number :", pdfName);
      await page.waitForTimeout(Math.floor(Math.random() * 2000 + 2000));
    }
    // * 인자가 객체일 경우
  } catch (e) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("@@@@@@@@@@@@@@@@@@@@     ERROR     @@@@@@@@@@@@@@@@@@@@");
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(e);
  }
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@ PDF UPLOAD DONE @@@@@@@@@@@@@@@@@@@@@");
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
};
