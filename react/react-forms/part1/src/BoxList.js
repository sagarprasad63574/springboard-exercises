import React, {useState} from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm.js';

const BoxList = () => {
    const [boxes, setBoxes] = useState([]);
    const addBox = (newBox) => {
        setBoxes(boxes => [...boxes, newBox]);
    }

    const removeBox = (id) => {
        setBoxes(boxes => boxes.filter(box => box.id !== id));
    }

    return (
        <div>
            <h3>Color Box Maker</h3>
            <NewBoxForm addBox={addBox} />
            <div>
                {boxes.map(
                    ({id, color, width, height}) => 
                    <Box 
                        key={id}
                        id={id}
                        color={color} 
                        width={width} 
                        height={height}
                        handleRemove={removeBox} />)}
            </div>
        </div>
    )
}

export default BoxList; 