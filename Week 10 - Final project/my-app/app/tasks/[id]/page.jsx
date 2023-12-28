

const SingleTaskPage = ({ params }) => {
    const { id } = params;
    
    return (
        <div>
        <h1>Task {id}</h1>
        <p>{task.title}</p>
        </div>
    );
}

export default SingleTaskPage;