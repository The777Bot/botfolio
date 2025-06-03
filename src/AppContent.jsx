import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import OtherPage from './pages/OtherPage';
import NotFound from './pages/NotFound';

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/other" element={<OtherPage />} />
      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppContent;
