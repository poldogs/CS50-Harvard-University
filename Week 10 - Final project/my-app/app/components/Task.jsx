
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Task = ({ task }) => {
    const router = useRouter();


    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.createdAt}</p>
            <button className="" >Edit</button>
            <button className="" onClick={ 
                () => {
                    axios.delete(`/api/tasks/${task.id}`)
                        .then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err);
                        }).finally(() => {
                            router.push('/crud');
                            router.refresh();
                        });
                }
             } >Delete </button>
        </div>
    );
}

export default Task;