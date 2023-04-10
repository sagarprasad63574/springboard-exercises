import React from "react";
import {Link} from "react-router-dom";

function Colors(props) {
    const colors = props.colors.map(color => (
        <li key={color.id}><Link to={`/colors/${color.colorName}`}>{color.colorName}</Link></li>
    ))

    return (
        <div>
            <h1>Welcome to color factory.</h1>
            <h1><Link to="/colors/new">Add a Color</Link></h1>
            <p>Please select a color</p>
            <ul>
                {colors}
            </ul>
        </div>
    )
}

export default Colors;