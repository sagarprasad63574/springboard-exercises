import Colors from './Colors.js';
import ColorForm from './ColorForm.js';
import ColorDetails from './ColorDetails.js';
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [colors, setColor] = useState([
    {
      id: "1",
      colorName: "blue",
      colorValue: "#0000FF",
    },
    {
      id: "2",
      colorName: "red",
      colorValue: "#FF0000",
    },
    {
      id: "3",
      colorName: "green",
      colorValue: "#00FF00",
    }]);
  const addColor = (newColor) => {
    setColor(colors => [...colors, newColor]);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/colors" element={<Colors colors={colors} />}></Route>
          <Route exact path="/colors/:color" element={<ColorDetails colors={colors} />}></Route>
          <Route exact path="/colors/new" element={<ColorForm addColor={addColor} />}>
          </Route>
          <Route path="*" element={<Navigate to="/colors" replace={true} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
