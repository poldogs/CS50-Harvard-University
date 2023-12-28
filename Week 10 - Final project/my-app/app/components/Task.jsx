

const Task = ({ task }) => {
    return (
        <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-500">{task.createdAt}</p>
        </div>
    );
}

export default Task;