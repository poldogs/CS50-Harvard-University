import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AddTask = ({ onUpdate }) => {
    const router = useRouter();
    const [inputs, setInputs] = useState({});

    const handleTaskChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevState => ({...prevState, [name]: value}));
    }

    useEffect(() => {
        console.log('inputs changed', inputs);
    }, [inputs]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/tasks', inputs)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setInputs({});
                onUpdate();
            });
    }

    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <input 
                    name="title"
                    type="text" 
                    placeholder="Add Task" 
                    value={inputs.title || ''} 
                    onChange={handleTaskChange} 
                    className="w-full p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <textarea
                    name="desc"
                    placeholder="Add Description"
                    value={inputs.desc || ''}
                    onChange={handleTaskChange}
                    className="w-full p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="flex justify-between">
                    <input
                        name="deadLine"
                        type="date"
                        value={inputs.deadLine || ''}
                        onChange={handleTaskChange}
                        className="w-1/2 p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <input
                        name="color"
                        type="color"
                        value={inputs.color || '#000000'}
                        onChange={handleTaskChange}
                        className="w-16 h-8 p-0 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 mt-3"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddTask;