import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './pages/Landing-Page';

import LoginPage from './pages/Login-Page';

import DashboardPage from './pages/Dashboard';

import BuatLaporanAdminPage from './pages/Laporan/Buat-Laporan/Admin-view';

import LaporanHarianAdminPage from './pages/Laporan/Laporan-Harian/Admin-view';

import LaporanBulananAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view';

import LaporanTahunanAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view';

import RankingBulananAdminPage from './pages/Ranking-Page/Ranking-Bulanan';

import RankingTahunanAdminPage from './pages/Ranking-Page/Ranking-Tahunan';

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
          <Route path="/laporan/laporan-tahunan" element={<LaporanTahunanAdminPage />} />
          <Route path="/ranking/ranking-bulanan" element={<RankingBulananAdminPage />} />
          <Route path="/ranking/ranking-tahunan" element={<RankingTahunanAdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
