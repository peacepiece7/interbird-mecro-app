# React에 electron 추가 그리고 한번에 실행하기

# 기본 환경 세팅

`npx create-react-app react-electron-12`

<br>

## cra 설치 후

<br>

`cd react-electron-12`

`yarn add --dev electron`

<br>

## package.json에 entry point, 설명, 저자 기입

<br>

```json
{
  "author": "peacepiece",
  "description": "react with electron",
  "main": "src/main.js"
}
```

<br>

### src/main.js 파일 생성 후 아래 코드 입력

<br>

win.loadFile('localhost:3000')을 win.loadURL('localhost:3000')으로 변경

```js
const { app, BrowserWindow } = require("electron");
const path = require("path");
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
app.whenReady().then(() => {
  createWindow();
});
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

<br>

### package 설치 concurrently, wait-on

`yarn add --dev concurrently wait-on`

> concurrently : 일렉트론과 리액트 프로세스를 동시에 실행하기 위해 사용합니다.
>
> wait-on : 프로세스 동시 수행시 한개의 프로세스가 완료되기를 기다리다 완료된 후 다음 프로세스를 수행하게 만들어 줍니다.

<br>

### package.json stripts 추가

<br>

```json
{
  "start": "concurrently \"yarn react-scripts start\" \"yarn electron\" ",
  "electron": "wait-on http://localhost:3000 && electron ."
}
```

### .env 파일 작성

.env 생성 후 아래 코드를 기입

`BROWSER=none`

> 이 코드로 브라우저는 실행되지않고 electron app만 실행되게 됩니다.

> 결과
>
> > front server를 켜준 뒤 electron을 실행해야 했지만 (start : react-scripts start, electron : electron .)
> > cmd에 한 줄만 입력함으로 실행할 수 있게 되었습니다.
