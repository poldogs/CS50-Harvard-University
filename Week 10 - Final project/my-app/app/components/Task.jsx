
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Task = ({ task }) => {
    const router = useRouter();


    return (
        <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{task.createdAt}</p>
            <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600" >Edit</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600" onClick={ 
                    () => {
                        axios.delete(`/api/tasks/${task.id}`)
                            .then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            }).finally(() => {
                                router.push('/tasks');
                                router.refresh();
                            });
                    }
                } >Delete </button>
            </div>
        </div>
    );
}

export default Task;