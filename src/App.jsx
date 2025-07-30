import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddAsset from './pages/AddAsset';
import EditAsset from './pages/EditAsset';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddAsset />} />
          <Route path="/edit/:id" element={<EditAsset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
