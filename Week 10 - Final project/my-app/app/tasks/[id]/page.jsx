"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';

const SingleTaskPage = () => {
    const [task, setTask] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);
    const [deadline, setDeadline] = useState('');
    const [newSubTask, setNewSubTask] = useState('');
    const [subTaskCompleted, setSubTaskCompleted] = useState(false);
    const router = useRouter();
    const  id = usePathname().split('/').pop();

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                const res = await fetch(`http://localhost:3000/api/tasks/${id}`, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const taskData = await res.json();
                setTask(taskData);
                setEditedTask(taskData);

                fetchSubTasks(taskData.id);
            }
        };

        

        fetchTask();
    }, [id]);

    const fetchSubTasks = async (taskId) => {
        const res = await fetch(`http://localhost:3000/api/subTasks?taskId=${taskId}`, { cache: "no-store" });
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const subTasksData = await res.json();
        setSubTasks(subTasksData);
    };

    const handleInputChange = (event) => {
        let { name, value } = event.target;
        if (name === 'deadLine') {
            value += 'T23:59:59Z';
        }
        setEditedTask({
            ...editedTask,
            [name]: value
        });
    };

    const handleEditSubmit = async (event) => {
        console.log(editedTask);
        event.preventDefault();
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        });
        if (res.ok) {
            const updatedTask = await res.json();
            setTask(updatedTask);
            setEditMode(false);
        } else {
            console.error('Failed to update task');
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    const handleAddSubTask = async (taskId) => {
        console.log(newSubTask, deadline, taskId);
        const res = await fetch(`http://localhost:3000/api/subTasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                title: newSubTask,
                deadLine: deadline,
                taskId: taskId
            })
        });
        if (res.ok) {
            const subTask = await res.json();
            setSubTasks([...subTasks, subTask]);
            setNewSubTask('');
        } else {
            console.error('Failed to add subtask');
            console.log(res);
        }
    };

    const handleComplete = async (id) => {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: task.id,
                completed: !task.completed 
            })
        });
        if (res.ok) {
            const updatedTask = await res.json();
            setTask(updatedTask);
        } else {
            console.error('Failed to update task');
        }
    }

    const handleCompleteSubTask = async (id) => {
        const subTask = subTasks.find((subTask) => subTask.id === id);
        const res = await fetch(`http://localhost:3000/api/subTasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: subTask.id,
                completed: !subTask.completed 
            })
        });
        if (res.ok) {
            const updatedSubTask = await res.json();
            const updatedSubTasks = subTasks.map((subTask) => {
                if (subTask.id === updatedSubTask.id) {
                    return updatedSubTask;
                }
                return subTask;
            });
            setSubTasks(updatedSubTasks);
        } else {
            console.error('Failed to update subtask');
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            {editMode ? (
                <form onSubmit={handleEditSubmit} className="flex flex-col items-center space-y-4">
                    <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} className="p-2 border-2 border-gray-200 rounded" />
                    <textarea name="desc" value={editedTask.desc} onChange={handleInputChange} className="p-2 border-2 border-gray-200 rounded" />
                    <input type="date" name="deadLine" value={editedTask.deadLine.split('T')[0]} onChange={handleInputChange} className="p-2 border-2 border-gray-200 rounded" />
                    <input type="color" name="color" value={editedTask.color} onChange={handleInputChange} className="w-12 h-12 mb-2 border-2 border-gray-200 rounded" />                
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                </form>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
                    <p className="text-lg mb-2">{task.desc}</p>
                    <p className="text-sm mb-2">Deadline: {new Date(task.deadLine).toLocaleDateString()}</p>
                    <p className="text-sm mb-2">Color: <span className="inline-block w-4 h-4" style={{backgroundColor: task.color}}></span></p>
                    <p className="text-sm mb-2">Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm mb-2">Completed: <span className={task.completed ? 'text-green-500' : 'text-red-500'}>{task.completed ? 'Yes' : 'No'}</span></p>
                    <button onClick={() => setEditMode(true)} className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <button onClick={() => handleComplete(task.id)} className="m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Complete</button>
                    <form className="flex items-center space-x-4">
                        <input type="text" value={newSubTask} onChange={(e) => setNewSubTask(e.target.value)} className="p-2 border-2 border-gray-200 rounded" />
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="p-2 border-2 border-gray-200 rounded" />
                        <button type="button" onClick={() => handleAddSubTask(task.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Subtask</button>                    
                    </form>
                    <ul className="mt-4">
                        {subTasks.map((subTask) => (
                            <li key={subTask.id} className="flex items-center space-x-4">
                                <p className="text-lg">{subTask.title}</p>
                                <p className="text-sm">Deadline: {new Date(subTask.deadLine).toLocaleDateString()}</p>
                                <button 
                                    onClick={() => handleCompleteSubTask(subTask.id)} 
                                    className="text-sm flex items-center"
                                >
                                    Completed: 
                                    <span className={subTask.completed ? 'text-green-500' : 'text-red-500'}>
                                        {subTask.completed ? <FaCheckSquare /> : <FaSquare />}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SingleTaskPage;