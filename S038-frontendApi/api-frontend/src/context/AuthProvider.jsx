
import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {   
                const userData = JSON.parse(atob(token.split(".")[1]));
                return userData;
            } catch (error) {
                console.error("Error parsing token:", error);
                localStorage.removeItem("token");
                return null;
            }
        }
        return null;
    });


    const login = (token) => {
        localStorage.setItem("token", token);   
        try {
            const userData = JSON.parse(atob(token.split(".")[1]));
            setUser(userData);
        } catch (error) {
            console.error("Error parsing token:", error);
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);  
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;
