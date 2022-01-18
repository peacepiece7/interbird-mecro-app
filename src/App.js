import "./App.css";
import { useState } from "react";

import UploadForm from "./components/UploadForm";

function App() {
  const [go, setGo] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interbird Mecro</h1>
      </header>
      <content className="App-content">
        <UploadForm />
      </content>
      <div className="App-link">
        <a>{"go master/crawl parser ->"}</a>
      </div>
    </div>
  );
}

export default App;
