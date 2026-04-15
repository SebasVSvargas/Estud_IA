
import { useNavigate } from 'react-router-dom';

const CardProject = ({ project, handleDeleteProject, user }) => {
    const navigate = useNavigate();

    return (
        <div className='col-md-4'>
            <div className='card p-3 mb-3'>
                <div className='card-body'>
                    <h5 className='card-title'>{project.name}</h5>
                    <p className='card-text'>{project.description}</p>
                    <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => navigate(`/projects/${project.id}/tasks`)}>
                        View Tasks
                    </button>
                    {user?.role === 'admin' && (
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDeleteProject(project.id)}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    )   
}
export default CardProject;