import Task from "./Task";

const TasksList = ({ tasks, handleComplete }) => (
    <ul className="list-none space-y-4">
        {tasks.map((task) => (
            <li key={task.id} className="p-4 bg-white shadow rounded">
                        <Task task={task} handleComplete={handleComplete}/>
            </li>
        ))}
    </ul>
);

export default TasksList;