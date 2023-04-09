import React from "react";
import { NavLink } from "react-router-dom";
import './Chips.css';

function Chips() {
  return (
    <div>
      <h1>Chips</h1>
      <img
        src="https://images.pexels.com/photos/1582481/pexels-photo-1582481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Chips."
      />
      <div className="chips">
        <NavLink exact="true" to="/">
          Go Back
        </NavLink>
      </div>
    </div>

  );
}

export default Chips;
