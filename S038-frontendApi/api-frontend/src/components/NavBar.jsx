
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
    
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    

    const handleLogout = () => {
        logout();
        navigate('/');
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">

            <span className="navbar-brand">Welcome, {user?.name}</span>

            <span className="text-light">
                <strong>Email:</strong> {user?.email} | <strong>Role:</strong> {user?.role}
            </span>

            <button className="btn btn-outline-light" 
            onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default NavBar;