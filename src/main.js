const { app, BrowserWindow, ipcMain } = require("electron");
const { SEND_MAIN_PING, GET_JSON_STR } = require("./constants");
const axios = require("axios");

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

app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
