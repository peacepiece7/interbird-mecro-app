const puppeteer = require("puppeteer");

module.exports = async function tar60Uploader(keyword) {
  try {
    const folderPath = `${__dirname.split("Desktop")[0]}\\Desctop\\tar`;

    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1280,1280"],
    });
    browser.userAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
    );

    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 1280,
    });
    // * keyword 검색
    await page.goto("http://115.22.68.60/master/uphtml_sub_all.jsp");
    await page.waitForSelector("select");
    await page.waitForTimeout(Math.floor(Math.random() * 1000));

    let check = true;
    while (check) {
      await page.type("select", keyword);
      await page.waitForTimeout(Math.floor(Math.random() * 1000) + 1000);
      await page.click("input[name=cc]");
      await page.waitForSelector("select");

      // * Detail Icon Click
      await page.evaluate(() => {
        const icons = document.querySelectorAll("tr td:nth-child(5) a");
        icons &&
          Array.from(icons).forEach((icon, idx) => {
            if (idx >= 2) {
              icon.click();
            }
          });
      });
      await page.waitForTimeout(2500);
      const partNumber = await page.evaluate(() => {
        if (document.querySelector("tr[align=center] td:nth-child(1) > a")) {
          return document.querySelector("tr[align=center] td:nth-child(1) > a").textContent;
        }
        return null;
      });

      if (partNumber) {
        const text = `${folderPath}\\${partNumber}.tgz`;
        const input = await page.$("input[type=file]");
        await input.uploadFile(text);
        await page.waitForTimeout(1000);

        await page.keyboard.down("Control");
        await page.waitForTimeout(1000);

        await page.click("input[name=B1]");
        await page.waitForTimeout(1000);
        await page.keyboard.up("Control");
        console.log("Uploaded part number ", partNumber);
        await page.waitForTimeout(Math.floor(Math.random() * 2000 + 5000));
      } else {
        check = false;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
