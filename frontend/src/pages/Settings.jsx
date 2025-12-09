import Layout from '../components/Layout';
import api from '../api/axios';
import { useEffect, useState } from 'react';
function Settings() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('settings/');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching settings data', error);
            }
        };
        fetchData();
    }, []); 
    return (
        <Layout>
            <div className="page-header">
                <h1>Settings</h1>
                {data&&data.message}

            </div>
            <div className="card">
                <p style={{ padding: '2rem' }}>System settings coming soon...</p>
            </div>
        </Layout>
    );
}

export default Settings;
