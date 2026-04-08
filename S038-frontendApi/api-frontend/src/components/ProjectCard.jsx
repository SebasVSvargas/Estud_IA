

const CardProject = ({ project }) => {

    return (
        <div className='col-md-4' key={project.id}>
            <div className='card p-3 mb-3'>
                <div className='card-body'>
                    <h5 className='card-title'>{project.name}</h5>
                    <p className='card-text'>{project.description}</p>
                    <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => handleDeleteProject(project.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default CardProject;