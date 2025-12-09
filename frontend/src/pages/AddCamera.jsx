import Layout from '../components/Layout';

function AddCamera() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementation for form submission
        alert("Camera added! (This is a demo)");
    };

    return (
        <Layout>
            <div className="page-header">
                <h1>Add New Camera</h1>
                <p>Configure and connect a new camera to your surveillance system</p>
            </div>

            <div className="form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-section">
                        <div className="section-title">
                            <div className="section-icon">📹</div>
                            Camera Information
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="camera-name">Camera Name *</label>
                                <input type="text" id="camera-name" name="camera-name" placeholder="e.g., Entrance Camera" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="camera-location">Location *</label>
                                <input type="text" id="camera-location" name="camera-location" placeholder="e.g., Main Building - Floor 1" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="camera-ip">IP Address *</label>
                                <input type="text" id="camera-ip" name="camera-ip" placeholder="192.168.1.100" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="camera-port">Port</label>
                                <input type="number" id="camera-port" name="camera-port" placeholder="8080" />
                            </div>
                            <div className="form-group full-width">
                                <label htmlFor="camera-desc">Description (Optional)</label>
                                <textarea id="camera-desc" name="camera-desc" placeholder="Add additional notes about this camera..."></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <div className="section-title">
                            <div className="section-icon">🤖</div>
                            AI Detection Features
                        </div>
                        <div className="checkbox-group">
                            <label className="checkbox-item">
                                <input type="checkbox" name="feature-fall" value="fall" />
                                <div className="checkbox-content">
                                    <span className="checkbox-label">🚨 Fall Detection</span>
                                    <span className="checkbox-desc">Automatically detect when someone falls and needs assistance</span>
                                </div>
                            </label>
                            <label className="checkbox-item">
                                <input type="checkbox" name="feature-quality" value="quality" />
                                <div className="checkbox-content">
                                    <span className="checkbox-label">✅ Quality Control</span>
                                    <span className="checkbox-desc">Monitor production quality and flag defects in real-time</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Add Camera</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddCamera;
