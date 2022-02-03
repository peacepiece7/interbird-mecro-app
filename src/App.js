import "./App.css";
import React, { useState } from "react";

import UploadForm from "./components/UploadForm";
import MasterCrawlAPIForm from "./components/MasterCrawlAPIForm";

function App() {
  const [go, setGo] = useState(false);

  const handleOnClick = (e) => {
    e.preventDefault();
    setGo((state) => !state);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Interbird Mecro</h1>
        <img draggable="false" className="pepe" src="/pepe.png" alt="pepe"></img>
      </header>
      <content className="App-content">{go ? <UploadForm /> : <MasterCrawlAPIForm />}</content>
      <div className="App-link">
        {go ? (
          <span onClick={handleOnClick}>{"go master/crawl parser ->"}</span>
        ) : (
          <span onClick={handleOnClick}>{"go uploader ->"}</span>
        )}
      </div>
    </div>
  );
}

export default App;
