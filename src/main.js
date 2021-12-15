const { app, BrowserWindow, Menu, shell } = require("electron");
// include the Node.js 'path' module at the top of your file
const path = require("path");
// modify your existing createWindow() function
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // win.loadFile("index.html");
  win.loadURL("http://localhost:3000");
}

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "Open",
        type: "checkbox",
        checked: "true",
        click: function () {
          shell.openExternal("https://www.electronjs.org/docs/api");
        },
      },
      {
        type: "separator",
      },
      {
        role: "toggleDevTools",
      },
      {
        type: "separator",
      },
      {
        label: "Close",
      },
    ],
  },
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
