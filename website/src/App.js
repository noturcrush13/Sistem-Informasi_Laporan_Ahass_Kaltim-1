import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './pages/Landing-Page';

import LoginPage from './pages/Login-Page';

import DashboardPage from './pages/Dashboard';

import BuatLaporanAdminPage from './pages/Laporan/Buat-Laporan/Admin-view';

import BuatLaporanUserPage from './pages/Laporan/Buat-Laporan/User-VIew';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/laporan/buat-laporan" element={<BuatLaporanAdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
