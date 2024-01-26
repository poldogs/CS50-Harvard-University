import React, { useEffect, useState } from "react";
import Link from "next/link";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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

  const tileClassName = ({ date, view }) => {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (deadlines.find(dDate => dDate === date.toDateString())) {
        return 'highlight';
      }
    }
  }

  return (
    <div>
      <h1 className="text-4xl">Tasks' Deadline</h1>
      
      <Calendar locale="en-US" tileClassName={tileClassName} />

      <Link href="/">
          <div className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
              Back Home
          </div>
      </Link>
    </div>
  );
}

export default CalendarPage;