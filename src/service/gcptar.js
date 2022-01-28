const puppeteer = require("puppeteer");

module.exports = async function gcpTarUploader(keyword) {
  try {
    console.log("gcp server tar 업로드를 시작합니다.");
    const folderPath = `${__dirname.split("Desktop")[0]}\\Desktop\\tar`;

    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size:1400,1400"],
    });

    // * 각 컴퓨터 마다 navigator.userAgent 확인 후 수정
    await browser.userAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
    );

    let page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1280,
    });

    // Login
    await page.goto("http://34.64.149.214/master/login.jsp");
    await page.waitForSelector("input[name=id]");

    // * env 문자열로 변경
    await page.type("input[name=id]", process.env.NEW_ALLDATASHEET_ID);
    await page.type("input[name=pwd]", process.env.NEW_ALLDATASHEET_PASSWORD);
    await page.waitForTimeout(1000);

    await page.click("input[type=submit]");
    await page.waitForTimeout(Math.floor(Math.random() * 3000 + 2000));

    let check = true;
    while (check) {
      page = await browser.newPage();
      await page.goto("http://34.64.149.214/master/uphtml_sub_all.jsp", {
        waitUntil: "networkidle0",
      });
      await page.waitForTimeout(1000);
      await page.type("input[name=sFactory]", keyword);
      await page.click("input[name=cc]");
      await page.waitForTimeout(1000);
      await page.waitForSelector("body > center table tbody tr:nth-child(2) td");
      await page.waitForTimeout(2000);

      const partNumber = await page.evaluate(() => {
        if (document.querySelector("body > center table tbody tr[align=center]:nth-child(2) td")) {
          return document.querySelector("body > center table tbody tr[align=center]:nth-child(2) td").textContent;
        }
        return null;
      });
      if (partNumber) {
        const text = `${folderPath}\\${partNumber}.tgz`;
        const inputElement = await page.$("input[type=file]");
        await inputElement.uploadFile(text);
        await page.waitForTimeout(1000);
        await page.click("input[name=B1]");
        await page.waitForNetworkIdle();
        await page.waitForTimeout(Math.floor(Math.random() * 1000 + 5000));
        console.log("Uploaded part number :", partNumber);
      } else {
        check = false;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
