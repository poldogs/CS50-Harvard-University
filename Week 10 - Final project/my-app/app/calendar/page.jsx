import Link from "next/link";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
    return (
      <div>
        <h1 className="text-4xl">Tasks' Deadline</h1>
        
        <Calendar />

        <Link href="/">
            <div className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none">
                Back Home
            </div>
        </Link>
      </div>
    );
}

export default CalendarPage;