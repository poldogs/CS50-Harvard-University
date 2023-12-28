"use client";
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import Link from "next/link";


async function fetchTasks() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
}

const TasksPage = async () => {
    const tasks = await fetchTasks();

    return (   
        <div>
            <h1 className="text-4xl font-bold mb-4">Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Link href={`/tasks/${task.id}`} className="border-b border-gray-300 hover:border-blue-500 pb-2">
                            <p>{task.title}</p>
                        </Link>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TasksPage;