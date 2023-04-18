import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

function NotFound() {
    return (
        <div className="notfound">
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <div className="links">
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
            </div>
        </div>
    )
}

export default NotFound;