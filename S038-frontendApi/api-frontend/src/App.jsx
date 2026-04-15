import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom.css'
import AppRouter from './routes/AppRouter.jsx'
import { useState } from 'react'
import AuthProvider from './context/AuthProvider.jsx'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <AuthProvider>
      <AppRouter 
        setIsLoggedIn={setIsLoggedIn}
        />
    </AuthProvider>
  );
}

export default App
