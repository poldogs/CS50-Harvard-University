import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AddTask = () => {
    const router = useRouter();
    const [inputs, setInputs] = useState({});
    const [subTasks, setSubTasks] = useState(['']);

    const handleTaskChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevState => ({...prevState, [name]: value}));
    }

    const handleSubTaskChange = (e, index) => {
        const newSubTasks = [...subTasks];
        newSubTasks[index] = e.target.value;
        setSubTasks(newSubTasks);
    }

    const addSubTask = () => {
        setSubTasks([...subTasks, '']);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskWithSubTasks = {...inputs, subTasks};
        axios.post('/api/tasks', taskWithSubTasks)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setInputs({});
                setSubTasks(['']);
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
                <textarea
                    name="description"
                    placeholder="Add Description"
                    value={inputs.description || ''}
                    onChange={handleTaskChange}
                    className="w-full p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <input
                    name="deadline"
                    type="date"
                    value={inputs.deadline || ''}
                    onChange={handleTaskChange}
                    className="w-full p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {subTasks.map((subTask, index) => (
                    <div key={index} className="flex justify-end space-x-2">
                        <input
                            name={`subTasks[${index}].title`}
                            type="text"
                            placeholder="Add SubTask"
                            value={inputs.subTasks[index].title}
                            onChange={(e) => handleSubTaskChange(e, index, 'title')}
                            className="w-3/4 p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <input
                            name={`subTasks[${index}].deadline`}
                            type="date"
                            value={inputs.subTasks[index].deadline}
                            onChange={(e) => handleSubTaskChange(e, index, 'deadline')}
                            className="w-3/4 p-2 mb-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={addSubTask}
                    className="w-1/4 p-2 text-white bg-blue-600 rounded hover:bg-blue-700 ml-auto"
                >
                    +
                </button>
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