import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

function Dashboard() {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('dashboard/');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>Real-time monitoring and analytics for your camera system</p>
            </div>

            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-header">
                        <div className="metric-label">Active Cameras</div>
                        <div className="metric-icon success">📹</div>
                    </div>
                    <div className="metric-value">12</div>
                    <div className="metric-change positive">↑ 2 from last week</div>
                </div>
                <div className="metric-card">
                    <div className="metric-header">
                        <div className="metric-label">Fall Incidents</div>
                        <div className="metric-icon warning">🚨</div>
                    </div>
                    <div className="metric-value">3</div>
                    <div className="metric-change positive">↓ 5 from last week</div>
                </div>
                <div className="metric-card">
                    <div className="metric-header">
                        <div className="metric-label">Quality Alerts</div>
                        <div className="metric-icon danger">⚠️</div>
                    </div>
                    <div className="metric-value">8</div>
                    <div className="metric-change negative">↑ 2 from last week</div>
                </div>
                <div className="metric-card">
                    <div className="metric-header">
                        <div className="metric-label">Brawl Detections</div>
                        <div className="metric-icon primary">⚔️</div>
                    </div>
                    <div className="metric-value">1</div>
                    <div className="metric-change positive">↓ 3 from last week</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Recent Activity</h2>
                    </div>
                    <div className="activity-list">
                        {/* Mock data for now, ideally fetched from API */}
                        <div className="activity-item">
                            <div className="activity-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}>🚨</div>
                            <div className="activity-content">
                                <div className="activity-title">Fall Detected - Camera 3</div>
                                <div className="activity-time">2 minutes ago</div>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>⚠️</div>
                            <div className="activity-content">
                                <div className="activity-title">Quality Issue - Camera 7</div>
                                <div className="activity-time">15 minutes ago</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Camera Status</h2>
                    </div>
                    <div className="camera-status-list">
                        <div className="camera-status-item">
                            <div className="camera-info">
                                <span className="status-indicator online"></span>
                                <span>Camera 1</span>
                            </div>
                            <span style={{ color: 'var(--success)' }}>Online</span>
                        </div>
                        <div className="camera-status-item">
                            <div className="camera-info">
                                <span className="status-indicator offline"></span>
                                <span>Camera 4</span>
                            </div>
                            <span style={{ color: 'var(--danger)' }}>Offline</span>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
