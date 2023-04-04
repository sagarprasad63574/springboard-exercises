import React from 'react';

const Box = ({id, color, width, height, handleRemove}) => {
    const remove = () => handleRemove(id);

    return (
        <div>
            <div style={{ 
                backgroundColor: color, 
                width: `${width}em`, 
                height: `${height}em`
                }}>
            </div>
            <button onClick={remove}>X</button>
        </div>
    )
}

export default Box;