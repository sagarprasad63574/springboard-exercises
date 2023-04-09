import React from "react";
import { NavLink } from "react-router-dom";
import './Candy.css';

function Candy() {
  return (
    <div>
      <h1>Candy</h1>
      <img
        src="https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Candy."
      />
      <div className="candy">
        <NavLink exact="true" to="/">
          Go Back
        </NavLink>
      </div>
    </div>
  );
}

export default Candy;
