import "./Tool.css";
import React from "react";

import { SEND_AFTER_EXCEL, SEND_BEFORE_EXCEL, SEND_COLLECTION_TOOL, SEND_COMBINATION_TOOL } from "./constants";

function Tool() {
  const { ipcRenderer } = window.require("electron");
  const handleExcelBefore = () => {
    ipcRenderer.send(SEND_BEFORE_EXCEL);
  };
  const handleExcelAfter = () => {
    ipcRenderer.send(SEND_AFTER_EXCEL);
  };
  const handlecombination = () => {
    ipcRenderer.send(SEND_COMBINATION_TOOL);
  };
  const handlecollection = () => {
    ipcRenderer.send(SEND_COLLECTION_TOOL);
  };
  return (
    <div className="Tool">
      <header className="Tool-header">
        <h1 className="title">Interbird Mecro</h1>
        <img className="pepe" src="/pepe.png" alt="pepe"></img>
      </header>
      <content className="Tool-content">
        <div className="Tool-box">
          <span>pdf to cexcel before</span>
          <button onClick={handleExcelBefore}>before</button>
        </div>
        <div className="Tool-box">
          <span>pdf to cexcel after</span>
          <button onClick={handleExcelAfter}>after</button>
        </div>
        <div className="Tool-box">
          <span>combination</span>
          <button onClick={handlecombination}>combine</button>
        </div>
        <div className="Tool-box">
          <span>collection</span>
          <button onClick={handlecollection}>collect</button>
        </div>
      </content>
      <div className="Tool-link"></div>
    </div>
  );
}

export default Tool;
