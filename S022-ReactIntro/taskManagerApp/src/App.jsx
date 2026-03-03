import './App.css'
import Header from './components/Header'
import TaskItem from './components/TaskItem'
import TaskList from './components/TaskList'
import Notes from './components/Notes'

function App() {

  return (
    <>
      <div>
        <Header title="Mi Gestor de Tareas" />
        <TaskList name="Tareas Pendientes" />    

        <fieldset id='recuadro'>
          <Notes/>
        </fieldset>

      </div>
    </>
  );
}

export default App
