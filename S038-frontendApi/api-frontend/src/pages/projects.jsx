
import { useState, useEffect } from "react";
import ListItem from "../components/Item.jsx";
import apiClient from "../api/client.js";

const Projects = () => {

    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await apiClient.get("/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);


    if (loading) return <p>Loading projects...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-5">
            <h1>Projects</h1>
            <ul className="list-group">
                {projects.map(project => (
                    <ListItem 
                        key={project.id} 
                        item={project} 
                    />
                ))}
            </ul>
        </div>
    )


}

export default Projects;