import logo from './logo.svg';
import React from "react";
import Heatmap from "./components/Heatmap";
import data from "./data.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Heatmap data={data} />
    </div>
  );
}

export default App;

