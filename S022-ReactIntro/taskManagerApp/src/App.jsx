import './App.css'
import Header from './components/Header'
import TaskItem from './components/TaskItem'
import TaskList from './components/TaskList'
import Notes from './components/Notes'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header title="Mi Gestor de Tareas" />
      <TaskList name="Lista de Tareas" />    

      <fieldset id='recuadro'>
        <Notes/>
      </fieldset>

      <Footer />
    </>
  );
}

export default App
