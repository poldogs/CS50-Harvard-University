"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";


const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [search, setSearch] = useState('');
    
    const router = useRouter();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (refresh) {
            router.refresh();
            setRefresh(false);
        }
    }, [refresh]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('http://localhost:3000/api/tasks', { cache: "no-store"});
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        setTaskToEdit(task);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    const addTask = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    }

    const deleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    const handleComplete = async (id) => {
        const res = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                completed: !tasks.find(task => task.id === id).completed 
            })
        });
        if (res.ok) {
            const updatedTask = await res.json();
            setTasks(tasks.map(task => task.id === id ? updatedTask : task));
        } else {
            console.error('Failed to update task');
        }
    }
    
    return (
        <div className="py-2">
            <h1 className="text-4xl">Tasks</h1>
            <AddTask addTask={addTask}/>
            <div className="w-full p-2 mb-3 mt-3 border rounded shadow appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 flex">
                <input 
                    type="text" 
                    placeholder="Search tasks" 
                    value={search} 
                    onChange={handleSearchChange} 
                    className="flex-grow"
                />
                <FaSearch className="self-center ml-2" />
            </div>
            <TasksList tasks={filteredTasks} onEdit={handleEdit} handleComplete={handleComplete} deleteTask={deleteTask} />
            <Link href="/">
                <div className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none mt-4">
                    Back Home
                </div>
            </Link>
        </div>
    );
}

export default TasksPage;