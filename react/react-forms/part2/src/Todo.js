import React from 'react';

const Todo = ({id, text, handleRemove}) => {
    const remove = () => handleRemove(id);

    return (
        <div>
            <div>
                {text}
            </div>
            <button onClick={remove}>X</button>
        </div>
    )
}

export default Todo;