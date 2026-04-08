
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";   
import Login from "../pages/login.jsx"; 
import Dashboard from "../pages/Dashboard.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Tasks from "../pages/Tasks.jsx";

const AppRouter = ({ setIsLoggedIn }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" 
                    element={<Login setIsLoggedIn={setIsLoggedIn} />} />

                <Route path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard setIsLoggedIn={setIsLoggedIn} />
                        </PrivateRoute>
                    } />

                <Route path="/projects/:projectId/tasks" 
                    element={
                        <PrivateRoute>
                            <Tasks />
                        </PrivateRoute>
                    } />

                <Route path="*" element={<Navigate to="/" />} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;