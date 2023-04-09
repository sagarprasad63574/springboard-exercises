import React from "react";
import { NavLink } from "react-router-dom";
import './Soda.css';

function Soda() {
  return (
    <div>
      <h1>Soda</h1>
      <img
        src="https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Soda."
      />
      <div className="soda">
        <NavLink exact="true" to="/">
          Go Back
        </NavLink>
      </div>
    </div>
  );
}

export default Soda;
