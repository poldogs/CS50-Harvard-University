import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCheckSquare } from 'react-icons/fa';
import Link from 'next/link';

const Task = ({ task, handleComplete, deleteTask }) => {
    const router = useRouter();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div>
            <Link href={`/tasks/${task.id}`}>
                <h3 className="text-xl font-bold mb-2" style={{ color: task.color }}>{task.title}</h3>
            </Link>
            <p className="text-sm text-gray-500 mb-4">{task.desc}</p>
            <p className="text-sm text-gray-500 mb-4">Created at: {formatDate(task.createdAt)}</p>
            <p className="text-sm text-gray-500 mb-4">Deadline: {formatDate(task.deadLine)}</p>
            <div className="flex justify-end space-x-4">
                {task.completed ? 
                    <button onClick={() => handleComplete(task.id)}>
                        <FaCheckSquare className="text-green-500 text-4xl" /> 
                    </button>
                    : 
                    <button onClick={() => handleComplete(task.id)}>
                        <FaCheckSquare className="text-4xl" />
                    </button>
                }
                <Link href={`/tasks/${task.id}`}>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">Edit</button>
                </Link>
                <Link href={`/tasks/${task.id}`}>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">+ Add SubTasks</button>
                </Link>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600" onClick={ 
                    () => {
                        axios.delete(`/api/tasks/${task.id}`)
                            .then(res => {
                                console.log(res);
                                deleteTask(task.id);
                            }).catch(err => {
                                console.log(err);
                            })
                            .finally(() => {
                                router.push('/tasks');
                            })
                    }
                } >Delete </button>
            </div>
        </div>
    );
}

export default Task;