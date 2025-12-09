import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
    let { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
