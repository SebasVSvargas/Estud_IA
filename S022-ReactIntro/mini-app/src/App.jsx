import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import personLogo from './assets/man.png'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>MINI-APP</h1>
      </header>
      <main>
        <div>
        <Card title="React" description="Librería UI" image={reactLogo} />
        <Card title="Vite" description="Herramienta Desarrollo - empaquetador" image={viteLogo} />
        <Card title="Sebastian" description="Desarrollador App" image={personLogo} />
        </div>
      </main>
      <footer>
        <p>Copyright © 2026 Sebastian Vargas Suarez</p>
      </footer>

    </>
  )
}

export default App
