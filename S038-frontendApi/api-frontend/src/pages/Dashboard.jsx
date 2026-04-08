import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import CardProject from '../components/ProjectCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsLoggedIn }) => {

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');  
    const navigate = useNavigate();
    
    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await apiClient.delete(`/projects/${id}`);
            setProjects(projects.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting project:', error);
            alert(`Failed to delete project. Status: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
        }
    };

    const handleCreateProject = async () => {
        try {
            const response = await apiClient.post('/projects', { name, description });
            setProjects([...projects, response.data.project]);
            setName('');
            setDescription('');

            alert('Project created successfully!');

        } catch (error) {
            console.error('Error creating project:', error);
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);
            alert(`Failed to create project. Status: ${error.response?.status} - ${JSON.stringify(error.response?.data)}`);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get('/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);


    return (
        <div>
            <NavBar setIsLoggedIn={setIsLoggedIn} />
            <div className="container mt-4">
                <h1>Welcome to the Dashboard</h1>
                <p>Welcome to project management system</p>

                <div className='card-custom p-3 mb-3'>
                    <h4>Create a New Project</h4>
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Project Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Project Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                    <button className="btn btn-primary w-100" onClick={handleCreateProject}>Create Project</button>
                </div>

                <div className='row'>
                    {projects.map(project => (
                        <div className='col-md-4' key={project.id}>
                            <div className='card p-3 mb-3'>
                                <div className='card-body'>
                                    <h5 className='card-title'>{project.name}</h5>
                                    <p className='card-text'>{project.description}</p>
                                    <button 
                                        className="btn btn-primary btn-sm" 
                                        onClick={() => navigate(`/projects/${project.id}/tasks`)}>
                                        View Tasks
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => handleDeleteProject(project.id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Dashboard;