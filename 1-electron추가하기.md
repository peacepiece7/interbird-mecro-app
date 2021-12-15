# React project에 electron추가하기

`npx create-react-app react-electron`

### electron 추가

`yarn add --dev electron`

### 리액트 프로젝트 실행

`yarn start`

### 일렉트론 패키지 추가

`yarn add --dev electron`

### 일렉트론 실행 스크립트 추가

- package.json에 다음과 같이 스크립트를 추가합니다.

```json
"scripts": {
	"electron": "electron ."
}
```

### 일렉트론 Entry point 스크립트 추가

`"main": "src/main.js"`

### main.js 만들기

- src/main.js 파일을 생성합니다.
- electron-quick-start의 main.js를 복사하여 추가합니다.

```js
const { app, BrowserWindow } = require("electron");
// include the Node.js 'path' module at the top of your file
const path = require("path");
// modify your existing createWindow() function
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
}
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

### 윈도우에 리액트 URL을 불러오기

- win.loadFile('index.html') 을 다음과 같이 변경합니다

`win.loadURL('http://localhost:3000')`
