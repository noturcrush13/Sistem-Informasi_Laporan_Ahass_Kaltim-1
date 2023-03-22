import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './pages/Landing-Page';

import LoginPage from './pages/Login-Page';

import DashboardPage from './pages/Dashboard';

import BuatLaporanAdminPage from './pages/Laporan/Buat-Laporan/Admin-view';

import LaporanHarianAdminPage from './pages/Laporan/Laporan-Harian/Admin-view';

import LaporanBulananAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view';



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/laporan/buat-laporan" element={<BuatLaporanAdminPage />} />
          <Route path="/laporan/laporan-harian" element={<LaporanHarianAdminPage />} />
          <Route path="/laporan/laporan-bulanan" element={<LaporanBulananAdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
