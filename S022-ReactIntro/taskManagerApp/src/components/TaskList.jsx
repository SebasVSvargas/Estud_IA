import TaskItem from "./TaskItem";

function TaskList({ name }) {
    return (
        <>
        <h2>Lista:{name}</h2>
        <ul className="task-list">
            <TaskItem text="Estudiar FastAPI" />
            <TaskItem text="Estudiar TypeScript" />
            <TaskItem text="Estudiar Python" />
        </ul>
        </>
    );
}

export default TaskList;