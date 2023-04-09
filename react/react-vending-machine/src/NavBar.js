import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <div>
            <h1>hello i am a vending machine. what would you like to eat?</h1>
            <div className="VendingMachine">
                <div>
                <NavLink exact="true" to="/soda">
                    Soda
                </NavLink>
                <NavLink exact="true" to="/chips">
                    Chips
                </NavLink>
                <NavLink exact="true" to="/candy">
                    Candy
                </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
