
//Card with title, description, priority, status, and buttons to edit and delete the task

const TaskCard = ({ task, onEdit, onDelete }) => {

    return (
        <div className='card p-3 mb-3'>
            <div className='card-body'>
                <h4 className='card-title'>{task.title}</h4>
                <p className='card-text'>{task.description}</p>
                <p className='card-text'><strong>Priority:</strong> {task.priority}</p>
                <p className='card-text'><strong>Status:</strong> {task.status}</p>
                <button className="btn btn-primary btn-sm me-2" 
                    onClick={() => onEdit(task)}>Edit</button>
                <button className="btn btn-danger btn-sm" 
                    onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    )
}

export default TaskCard;