import React from "react";
import Soda from './Soda.js';
import Chips from './Chips.js';
import Candy from './Candy.js';
import NavBar from './NavBar.js';
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<NavBar />}>
          </Route>
          <Route exact path="/soda" element={<Soda />}>
          </Route>
          <Route exact path="/chips" element={<Chips />}>
          </Route>
          <Route exact path="/candy" element={<Candy />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
