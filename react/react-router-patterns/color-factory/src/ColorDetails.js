import React from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import './ColorDetails.css';

function ColorDetails(props) {
    const params = useParams();
    const color = props.colors.filter(color => {
        return color.colorName === params.color;
    })
    if (color.length === 0 || props.colors.length === 0) {
        return <Navigate to="/colors" />
    }

    return (
        <div style={{ height: "1000px", backgroundColor: color[0].colorValue}} >
            <h1 style={{color:"white"}}>{color[0].colorName}</h1>
            <h1 style={{color:"white"}}><Link to="/colors">Go Back</Link></h1>

        </div>
    )
}

export default ColorDetails;