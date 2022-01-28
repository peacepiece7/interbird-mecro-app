async function parseURLs(page, tag) {
  try {
    const mfgURLs = await page.evaluate(() => {
      if (!document.querySelector(tag)) {
        return null;
      }
      return Array.from(document.querySelectorAll(tag)).map((v) => {
        return v.href;
      });
    });
    return new Promise((resole, reject) => {
      if (mfgURLs) {
        resole(mfgURLs);
      } else {
        reject(mfgURLs);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = parseURLs;
