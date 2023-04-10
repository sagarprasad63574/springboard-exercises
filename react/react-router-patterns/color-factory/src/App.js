import Colors from './Colors.js';
import ColorForm from './ColorForm.js';
import ColorDetails from './ColorDetails.js';
import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/** Simple app that just shows the LightsOut game. */

function App() {
  // App.defaultProps = {
  //   colors: [
  //     {
  //       id: "1",
  //       colorName: "blue",
  //       colorValue: "#0000FF",
  //     }
  //   ]
  // }
  // const addColor = (newColor) => {
  //   console.log(newColor);
  //   App.defaultProps.colors.push(newColor);
  //   console.log(App.defaultProps.colors);
  // }
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
