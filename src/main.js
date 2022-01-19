const { app, BrowserWindow, ipcMain } = require("electron");
const {
  SEND_GCPPDF_DATA,
  SEND_GCPTAR_DATA,
  SEND_60TAR_DATA,
  SEND_APIURL_DATA,
} = require("./constants");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const gcpPdfUploader = require("./service/gcppdf");
const gcpTarUploader = require("./service/gcptar");
const tar60Uploader = require("./service/60tar");
const masterCrawlDonwloader = require("./service/downloader");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadURL("http://localhost:3000");
}

// SEND GCP PDF
ipcMain.on(SEND_GCPPDF_DATA, (event, arg) => {
  fs.readdir(path.join(__dirname, "..", "..", "testFolder"), (error) => {
    if (error) {
      fs.mkdirSync(path.join(__dirname, "..", "..", "testFolder"));
    }
  });
  gcpPdfUploader(arg);
});
// SEND GCP TAR
ipcMain.on(SEND_GCPTAR_DATA, (event, arg) => {
  gcpTarUploader(arg);
});
// SEND 60 TAR
ipcMain.on(SEND_60TAR_DATA, (event, arg) => {
  tar60Uploader(arg);
});

// SEND APIURL DATA
ipcMain.on(SEND_APIURL_DATA, async (event, arg) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.BASE_URL}${arg}`,
      responseType: "json",
    });
    await masterCrawlDonwloader(response.data);
  } catch (error) {
    console.error(error);
  }
});
app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
