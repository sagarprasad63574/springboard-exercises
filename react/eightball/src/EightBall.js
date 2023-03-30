import React, {useState} from 'react';
import './EightBall.css'
const EightBall = ({answers}) => {

    const [color, setColor] = useState("black");
    const [message, setMessage] = useState("Think of a Question")

    const changeBall = () => {
        const randomIndex = Math.floor(Math.random() * answers.length);
        const {msg, color} = answers[randomIndex];
        setColor(color);
        setMessage(msg);
    }
    return (
        <>
            <p>Color: {color}</p>
            <p>Message: {message}</p>
            <div className="EightBall" 
                onClick={changeBall}
                style={{ backgroundColor: color}}>
                    <b>{message}</b>
            </div>
        </>
    )

}

export default EightBall;