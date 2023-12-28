
import React, { useState } from 'react';



const AddTask = (props) => {
    const [task, setTask] = useState('');
    
    
    const handleTaskChange = (e) => {
        setTask(e.target.value);
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.addTask(task, date, time);
        setTask('');
    }
    
    return (
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <input 
                    type="text" 
                    placeholder="Add Task" 
                    value={task} 
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