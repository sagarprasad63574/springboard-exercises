import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const NewTodoForm = ({ addTodo }) => {
    const INITIAL_STATE = {
        text: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ ...formData, id: uuid() });
        setFormData(INITIAL_STATE);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">Text</label>
                <input
                    id="text"
                    type="text"
                    name="text"
                    placeholder="text"
                    value={formData.text}
                    onChange={handleChange}>
                </input>
                <button>Add Todo</button>
            </form>
        </div>
    )
}

export default NewTodoForm;