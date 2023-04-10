import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {v4 as uuid} from 'uuid';

function ColorForm({addColor}) {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        colorName: '',
        colorValue: ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        addColor({...formData, id: uuid()});
        setFormData(INITIAL_STATE);
        navigate('/colors');
    }

    return (
        <div>
            <h1>Add New Color</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="colorName">Color Name</label>
                <input 
                    id="colorName"
                    type="text"
                    name="colorName"
                    placeholder="colorName"
                    value={formData.colorName}
                    onChange={handleChange}>
                </input>
                <label htmlFor="colorValue">Color Value</label>
                <input 
                    id="colorValue"
                    type="color"
                    name="colorValue"
                    placeholder="colorValue"
                    value={formData.colorValue}
                    onChange={handleChange}>
                </input>
                <button>Add Color</button>
            </form>
        </div>
    )
}

export default ColorForm;