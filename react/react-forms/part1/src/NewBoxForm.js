import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

const NewBoxForm = ({ addBox }) => {
    const INITIAL_STATE = {
        color: '',
        width: '',
        height: ''
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
        addBox({ ...formData, id: uuid() });
        setFormData(INITIAL_STATE);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="color">Color</label>
                <input
                    id="color"
                    type="text"
                    name="color"
                    placeholder="color"
                    value={formData.color}
                    onChange={handleChange}>
                </input>
                <label htmlFor="width">Width</label>
                <input
                    id="width"
                    type="text"
                    name="width"
                    placeholder="width"
                    value={formData.width}
                    onChange={handleChange}>
                </input>
                <label htmlFor="height">Height</label>
                <input
                    id="height"
                    type="text"
                    name="height"
                    placeholder="height"
                    value={formData.height}
                    onChange={handleChange}>
                </input>
                <button>Add Box</button>
            </form>
        </div>
    )
}

export default NewBoxForm;