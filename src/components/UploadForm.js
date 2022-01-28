import { SEND_60TAR_DATA, SEND_GCPPDF_DATA, SEND_GCPTAR_DATA } from "../constants";

export default function UploadForm() {
  const { ipcRenderer } = window.require("electron");

  const sendGcpPdf = (e) => {
    e.preventDefault();
    ipcRenderer.send(SEND_GCPPDF_DATA, e.target[0].value);
    e.target[0].value = "";
  };
  const sendGcpTar = (e) => {
    e.preventDefault();
    ipcRenderer.send(SEND_GCPTAR_DATA, e.target[0].value);
    e.target[0].value = "";
  };
  const send60Tar = (e) => {
    e.preventDefault();
    ipcRenderer.send(SEND_60TAR_DATA, e.target[0].value);
    e.target[0].value = "";
  };

  return (
    <section className="upload-section">
      <div className="gcp-pdf-from">
        <span>GPC PDF UPLOAD</span>
        <form onSubmit={sendGcpPdf}>
          <input type="text" placeholder="enter a manufacture"></input>
          <input type="submit" value="upload"></input>
        </form>
      </div>
      <div>
        <div className="gcp-pdf-from">
          <span>GPC TAR UPLOAD</span>
          <form onSubmit={sendGcpTar}>
            <input type="text" placeholder="enter a manufacture"></input>
            <input type="submit" value="upload"></input>
          </form>
        </div>
        <div className="gcp-pdf-from">
          <span>60 SERVER TAR UPLOAD</span>
          <form onSubmit={send60Tar}>
            <input type="text" placeholder="enter a manufacture"></input>
            <input type="submit" value="upload"></input>
          </form>
        </div>
      </div>
    </section>
  );
}
