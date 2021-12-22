import logo from "./logo.svg";
import "./App.css";
import { SEND_MAIN_PING, GET_JSON_STR } from "./constants";

function App() {
  // https://blog.outsider.ne.kr/1170
  const { ipcRenderer } = window.require("electron");
  const sendMail = () => {
    ipcRenderer.send(SEND_MAIN_PING, "send");
  };
  const getJson = (e) => {
    ipcRenderer.send(GET_JSON_STR, 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Hello! World. </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>
          <br></br>
        </div>
        <button onClick={sendMail}>Send Mail</button>
        <div>
          <br></br>
        </div>
        <button onClick={getJson}>get json</button>
      </header>
    </div>
  );
}

export default App;
