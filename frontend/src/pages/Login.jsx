import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const { setUser } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('token/', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setUser(jwtDecode(response.data.access));
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed');
            console.error(error);
        }
    };

    return (
        <div className="login-body">
            <div className="background-animation">
                <div className="circle"></div>
                <div className="circle"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="logo-section">
                        <div className="logo">⚡ Azka Camera</div>
                        <p className="tagline">Smart AI-Powered Surveillance System</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <a href="#">Forgot Password?</a>
                        </div>

                        <button type="submit" className="btn">Sign In</button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="signup-link">
                        Don&apos;t have an account? <Link to="/register">Sign up now</Link>
                    </div>

                    <div className="features">
                        <div className="feature-item">
                            <div className="feature-icon">🚨</div>
                            <div className="feature-text">Fall Detection</div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">✅</div>
                            <div className="feature-text">Quality Control</div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">⚔️</div>
                            <div className="feature-text">Brawl Detection</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
