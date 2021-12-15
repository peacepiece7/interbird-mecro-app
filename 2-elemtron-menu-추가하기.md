# Electron Menu 추가하기

아래와 같이 적용시켜 볼 수 있음

```js
const { app, BrowserWindow, Menu, shell } = require("electron");

const template = [
  {
    // 주 메뉴
    label: "File",
    // 주 메뉴 안에 들어감
    submenu: [
      {
        label: "Open electron docs",
        type: "checkbox",
        checked: "true",
        // api/shell을 참고
        click: function () {
          shell.openExternal("https://www.electronjs.org/docs/latest");
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
```

# Reference

- Electron menu api docs

https://www.electronjs.org/docs/latest/api/menu

- Electron shell api docs

https://www.electronjs.org/docs/latest/api/shell
