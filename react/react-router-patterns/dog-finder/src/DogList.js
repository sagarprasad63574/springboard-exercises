import React from "react";
import { v4 as uuid } from 'uuid';
import { NavLink } from "react-router-dom";

function DogList(props) {
    const dogs = props.dogs.map(dog => (
        <div key={uuid()}>
            <NavLink exact="true" to={`/dogs/${dog.name}`}>
                <h1>{dog.name}</h1>
            </NavLink>
            <img src={dog.src}></img>
        </div>
    ))
    return (
        <div>
            {dogs}
        </div>
    );
}

export default DogList;