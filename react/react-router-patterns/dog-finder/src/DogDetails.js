import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';

function DogDetails(props) {
    const params = useParams();

    const dog = props.dogs.filter(dog => {
        return dog.name === params.name; 
    })
    if(dog.length === 0) {
        return <Navigate to="/dogs" />
    }
    const facts = dog[0].facts.map(f => (
        <li key={uuid()}>{f}</li>
    ))
    return (
        <div>
            <h1>Name: {dog[0].name}</h1>
            <p>Age: {dog[0].age}</p>
            <ul>Facts: {facts}</ul>
            <img src={dog[0].src}></img>
        </div>
    );
}

export default DogDetails;