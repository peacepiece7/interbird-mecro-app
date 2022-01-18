const { app, BrowserWindow, ipcMain } = require("electron");
const {
  SEND_MAIN_PING,
  GET_JSON_STR,
  SEND_GCPPDF_DATA,
  SEND_GCPTAR_DATA,
  SEND_60TAR_DATA,
} = require("./constants");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const gcpPdfUploader = require("./uploader/gcppdf");
const gcpTarUploader = require("./uploader/gcptar");
const tar60Uploader = require("./uploader/60tar");

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

ipcMain.on(SEND_MAIN_PING, (event, arg) => {
  console.log("Main received a ping");
});

ipcMain.on(GET_JSON_STR, async (event, arg) => {
  try {
    const result = await axios.get("https://httpbin.org/get");
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
});

// SEND GCP PDF
ipcMain.on(SEND_GCPPDF_DATA, (event, arg) => {
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

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
