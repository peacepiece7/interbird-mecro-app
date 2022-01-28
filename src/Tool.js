import "./Tool.css";
import React, { useState } from "react";

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
      <content>
        <div className="Tool-excel-before-box">
          <span>pdf to cexcel before</span>
          <button onClick={handleExcelBefore}>start</button>
        </div>
        <div className="Tool-excel-after-box">
          <span>pdf to cexcel after</span>
          <button onClick={handleExcelAfter}>start</button>
        </div>
        <div className="Tool-excel-after-box">
          <span>combination</span>
          <button onClick={handlecombination}>start</button>
        </div>
        <div className="Tool-excel-after-box">
          <span>collection</span>
          <button onClick={handlecollection}>start</button>
        </div>
      </content>
      <div className="Tool-link"></div>
    </div>
  );
}

export default Tool;
