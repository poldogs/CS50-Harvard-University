"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaTasks } from "react-icons/fa";

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);

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

  const deadlines = tasks.map(task => new Date(task.deadLine).toDateString());

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const taskForThisDay = tasks.find(task => new Date(task.deadLine).toDateString() === date.toDateString());
      if (taskForThisDay) {
        return (
          <span style={{ display: 'inline-flex', marginLeft: '2px', color: 'rgb(0, 123, 255)', fontSize:'15px'}} title={taskForThisDay.title}>
            <FaTasks />
          </span>
        );
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl">Tasks' Deadline</h1>
      
      <Calendar locale="en-US" tileContent={tileContent}/>

      <Link href="/">
          <div className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
              Back Home
          </div>
      </Link>
    </div>
  );
}

export default CalendarPage;