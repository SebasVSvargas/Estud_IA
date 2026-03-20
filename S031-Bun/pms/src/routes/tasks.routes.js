let tasks = [
    { 
        id: 1, 
        title: "Create API", 
        projectId: 1, 
        status: "ToDo" 
    },
    { 
        id: 2, 
        title: "Design Database", 
        projectId: 1, 
        status: "InProgress" 
    },
    { 
        id: 3, 
        title: "Implement Authentication", 
        projectId: 2, 
        status: "Done" 
    }
];

const GetTasksByProjectId = (req, res) => {

    const projectId = parseInt(req.params.projectId)
    const projectTasks = tasks.filter(
        t => t.projectId === projectId
    )
    res.json(projectTasks)


}