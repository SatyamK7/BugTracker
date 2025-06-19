

import { createContext, useContext, useState } from "react";

//  Create Context
const AuthContext = createContext();

//  AuthProvider Component (Wrap your app in this)
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Simulated login function
    const login = () => {
        setIsAuthenticated(true);
    };

    // Simulated logout function
    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3️⃣ Custom Hook for using AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
