import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.css'
import AppRouter from './routes/AppRouter.jsx'
import { useState } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  return <AppRouter setIsLoggedIn={setIsLoggedIn} />
}

export default App
