import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Tool from "./Tool";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Link to="/">home</Link>
      <Link to="/tool">tool</Link>
      <Routes>
        <Route exact path="/" element={<App />}></Route>
        <Route path="/tool" element={<Tool />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
