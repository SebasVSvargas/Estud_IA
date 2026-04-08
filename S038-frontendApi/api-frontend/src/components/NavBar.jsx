
import { useNavigate } from "react-router-dom";

const NavBar = ({ setIsLoggedIn }) => {
    
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <button className="btn btn-outline-light" 
            onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default NavBar;