"use client";
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

const SingleTaskPage = () => {
    const [task, setTask] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);
    const [newSubTask, setNewSubTask] = useState('');
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
                setEditedTask(taskData); // Set the initial values for the edited task
            }
        };
    
        fetchTask();
    }, [id]);

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

    const handleAddSubTask = async () => {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}/subtasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newSubTask })
        });
        if (res.ok) {
            const subTask = await res.json();
            setSubTasks([...subTasks, subTask]);
            setNewSubTask('');
        } else {
            console.error('Failed to add subtask');
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md">
            {editMode ? (
                <form onSubmit={handleEditSubmit}>
                    <input type="text" name="title" value={editedTask.title} onChange={handleInputChange} className="mb-2" />
                    <textarea name="desc" value={editedTask.desc} onChange={handleInputChange} className="mb-2" />
                    <input type="date" name="deadLine" value={editedTask.deadLine.split('T')[0]} onChange={handleInputChange} className="mb-2" />                    <input type="color" name="color" value={editedTask.color} onChange={handleInputChange} className="mb-2" />
                    <button type="submit" className="mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                </form>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
                    <p className="text-lg mb-2">{task.desc}</p>
                    <p className="text-sm mb-2">Deadline: {new Date(task.deadLine).toLocaleDateString()}</p>
                    <p className="text-sm mb-2">Color: <span className="inline-block w-4 h-4" style={{backgroundColor: task.color}}></span></p>
                    <p className="text-sm mb-2">Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
                    <p className="text-sm mb-2">Completed: <span className={task.completed ? 'text-green-500' : 'text-red-500'}>{task.completed ? 'Yes' : 'No'}</span></p>
                    <button onClick={() => setEditMode(true)} className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    <input type="text" value={newSubTask} onChange={(e) => setNewSubTask(e.target.value)} className="mb-2" />
                    <button onClick={handleAddSubTask} className="mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Subtask</button>
                    <ul>
                        {task.subTasks && task.subTasks.map((subTask, index) => (
                            <li key={index}>{subTask.title}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default SingleTaskPage;