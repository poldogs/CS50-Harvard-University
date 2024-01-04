"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import { useRouter } from "next/navigation";


const getTasks = async () => {
    const res = await fetch('http://localhost:3000/api/tasks', { cache: "no-store"});
    
    if(!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
}

const CrudPage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);
    
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

    const handleEditDone = () => {
        setTaskToEdit(null);
        fetchTasks();
    }

    const handleDelete = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        fetchTasks();
    }
    
    return (
        <div className="py-2">
            <h1 className="text-4xl">Crud</h1>
            <AddTask taskToEdit={taskToEdit} onEditDone={handleEditDone}/>
            <TasksList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
    );
}

export default CrudPage;