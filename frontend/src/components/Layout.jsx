import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

function Layout({ children }) {
    const { user } = useContext(AuthContext);

    return (
        <div>
            {/* Header */}
            <div className="header">
                <div className="logo">⚡ Azka Camera</div>
                <div className="user-profile">
                    <div className="profile-pic">{user?.name ? user.name[0] : 'U'}</div>
                </div>
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
