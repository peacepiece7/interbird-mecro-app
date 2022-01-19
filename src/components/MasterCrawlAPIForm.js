import { SEND_APIURL_DATA } from "../constants";

export default function MasterCrawlAPIForm() {
  const { ipcRenderer } = window.require("electron");
  const sendURL = (e) => {
    e.preventDefault();
    const url = `pre=${e.target[0].value}&dis=${e.target[1].value}&mfr=${e.target[2].value}&start=${e.target[3].value}&count=${e.target[4].value}`;
    ipcRenderer.send(SEND_APIURL_DATA, url);
  };
  return (
    <section className="download-section">
      <form onSubmit={sendURL} className="download-form">
        <div className="download-inner">
          <div className="download-select">Prefix</div>
          <select required="true">
            <option value="ALL">ALL</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
            <option value="G">G</option>
            <option value="H">H</option>
            <option value="I">I</option>
            <option value="J">J</option>
            <option value="K">K</option>
            <option value="L">L</option>
            <option value="M">M</option>
            <option value="N">L</option>
            <option value="O">O</option>
            <option value="P">P</option>
            <option value="Q">Q</option>
            <option value="R">R</option>
            <option value="S">S</option>
            <option value="T">T</option>
            <option value="U">U</option>
            <option value="V">V</option>
            <option value="W">W</option>
            <option value="X">X</option>
            <option value="Y">Y</option>
            <option value="Z">Z</option>
          </select>
        </div>
        <div className="download-inner">
          <div className="download-input">Distributor</div>
          <input type="text" placeholder="Distributor에서 복사" required="true"></input>
        </div>
        <div className="download-inner">
          <div className="download-input">Manufacture</div>
          <input type="text" placeholder="Mfr.에서 복사" required="true"></input>
        </div>
        <div className="download-inner">
          <div className="download-input">Start</div>
          <input type="number" placeholder="0부터 작성" required="true"></input>
        </div>
        <div className="download-inner">
          <div className="download-input">Count</div>
          <input type="number" placeholder="100단위로 작성" required="true"></input>
        </div>
        <div className="download-inner">
          <div className="download-input"></div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </section>
  );
}
