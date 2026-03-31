import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.css'
import Login from './pages/login.jsx'
import Projects from './pages/projects.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

function App() {
  // Estado para saber si está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/projects" element={<Projects />} />
            <Route path="/" element={<Navigate to="/projects" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/projects" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
