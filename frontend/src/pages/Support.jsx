import Layout from '../components/Layout';

function Support() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('dashboard/');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="page-header">
                <h1>Support</h1>
                <p>Get help and support</p>
            </div>
            <div className="card">
                <p style={{ padding: '2rem' }}>Support resources coming soon...</p>
            </div>
        </Layout>
    );
}

export default Support;
