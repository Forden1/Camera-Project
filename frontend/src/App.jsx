import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import AddCamera from './pages/AddCamera';
import MyCameras from './pages/MyCameras';
import Customizations from './pages/Customizations';
import Settings from './pages/Settings';
import Support from './pages/Support';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/add-camera" element={<PrivateRoute><AddCamera /></PrivateRoute>} />
          <Route path="/my-cameras" element={<PrivateRoute><MyCameras /></PrivateRoute>} />
          <Route path="/customizations" element={<PrivateRoute><Customizations /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
          <Route path="/support" element={<PrivateRoute><Support /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
