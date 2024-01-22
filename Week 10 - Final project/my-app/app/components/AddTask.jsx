import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AddTask = () => {
    const router = useRouter();
    const [inputs, setInputs] = useState({});

    
    const handleTaskChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevState => ({...prevState, [name]: value}));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
            axios.post('/api/tasks', inputs)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                }).finally(() => {
                    setInputs({});
                    router.push('/tasks');
                    router.refresh();
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
                <button 
                    type="submit" 
                    className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default AddTask;