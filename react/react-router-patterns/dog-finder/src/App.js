import whiskey from "./whiskey.jpg";
import perry from "./perry.jpg";
import duke from "./duke.jpg";
import tubby from "./tubby.jpg";
import DogList from './DogList.js';
import DogDetails from './DogDetails.js';
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/** Simple app that just shows the LightsOut game. */

function App() {
  App.defaultProps = {
    dogs: [
      {
        name: "Whiskey",
        age: 5,
        src: whiskey,
        facts: [
          "Whiskey loves eating popcorn.",
          "Whiskey is a terrible guard dog.",
          "Whiskey wants to cuddle with you!"
        ]
      },
      {
        name: "Duke",
        age: 3,
        src: duke,
        facts: [
          "Duke believes that ball is life.",
          "Duke likes snow.",
          "Duke enjoys pawing other dogs."
        ]
      },
      {
        name: "Perry",
        age: 4,
        src: perry,
        facts: [
          "Perry loves all humans.",
          "Perry demolishes all snacks.",
          "Perry hates the rain."
        ]
      },
      {
        name: "Tubby",
        age: 4,
        src: tubby,
        facts: [
          "Tubby is really stupid.",
          "Tubby does not like walks.",
          "Angelina used to hate Tubby, but claims not to anymore."
        ]
      }
    ]
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/dogs" element={<DogList dogs={App.defaultProps.dogs}/>}>
          </Route>
          <Route path="/dogs/:name" element={<DogDetails dogs={App.defaultProps.dogs}/>}>
          </Route>
          <Route path="*" element={<Navigate to="/dogs" replace={true} />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
