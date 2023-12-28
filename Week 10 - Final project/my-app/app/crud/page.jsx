"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";

const getTasks = async () => {
    const res = await fetch('http://localhost:3000/api/tasks');
    
    if(!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
}

const CrudPage = async () => {

    const tasks = await getTasks();
    console.log(tasks);

    
    return (
        <div className="py-2">
            <h1 className="text-4xl">Crud</h1>
            <AddTask />
            <TasksList tasks={tasks} />
        </div>
    );
}

export default CrudPage;