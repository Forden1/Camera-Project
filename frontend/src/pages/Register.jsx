import { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('register/', formData);
            alert('Registration successful');
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
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
                        <p className="tagline">Create your account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                name="name"
                                id="name"
                                placeholder="Enter your full name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                name="username"
                                id="username"
                                placeholder="Choose a username"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn">Register</button>
                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <div className="signup-link">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
