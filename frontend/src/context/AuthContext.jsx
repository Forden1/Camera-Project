import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null); // Simple store for now, or just store string
    // Better checking:
    let [user, setUser] = useState(() => localStorage.getItem('access_token') ? jwtDecode(localStorage.getItem('access_token')) : null);

    let loginUser = async (e) => {
        // Handled in Login component usually, or here.
        // For simplicity, let's expose setAuth/setUser
    };

    let logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    let contextData = {
        user: user,
        setUser: setUser,
        logoutUser: logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
