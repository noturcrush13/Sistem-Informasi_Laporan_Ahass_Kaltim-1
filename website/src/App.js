import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from './pages/Landing-Page';

import LoginPage from './pages/Login-Page/Admin';
import LoginPageUser from './pages/Login-Page/User';

import DashboardPage from './pages/Dashboard/Admin';
import DashboardPageUser from './pages/Dashboard/User';

import BuatLaporanAdminPage from './pages/Laporan/Buat-Laporan/Admin-view';
import BuatLaporanUserPage from './pages/Laporan/Buat-Laporan/User-VIew';

import LaporanHarianAdminPage from './pages/Laporan/Laporan-Harian/Admin-view';
import LaporanHarianUserPage from './pages/Laporan/Laporan-Harian/User-view';

import LaporanBulananAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view';
import LaporanBulananUserPage from './pages/Laporan/Laporan-Bulanan/User-view';

import LaporanTahunanAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view';
import LaporanTahunanUserPage from './pages/Laporan/Laporan-Tahunan/User-view';

import RankingBulananAdminPage from './pages/Ranking-Page/Ranking-Bulanan';

import RankingTahunanAdminPage from './pages/Ranking-Page/Ranking-Tahunan';

import BuatDealerAdminPage from './pages/Dealer/Buat-Dealer';

import DaftarDealerAdminPage from './pages/Dealer/Daftar-Dealer';

import BuatUserAdminPage from './pages/User/Buat-User';

import DaftarUserAdminPage from './pages/User/Daftar-User';

import BuatAdminPage from './pages/Admin-Page/Buat-Admin';

import DaftarAdminPage from './pages/Admin-Page/Daftar-Admin';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/user/login" element={<LoginPageUser />} />

          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/user/dashboard" element={<DashboardPageUser />} />

          <Route path="/admin/laporan/buat-laporan" element={<BuatLaporanAdminPage />} />
          <Route path="/user/laporan/buat-laporan" element={<BuatLaporanUserPage />} />

          <Route path="/admin/laporan/laporan-harian" element={<LaporanHarianAdminPage />} />
          <Route path="/user/laporan/laporan-harian" element={<LaporanHarianUserPage />} />

          <Route path="/admin/laporan/laporan-bulanan" element={<LaporanBulananAdminPage />} />
          <Route path="/user/laporan/laporan-bulanan" element={<LaporanBulananUserPage />} />

          <Route path="/admin/laporan/laporan-tahunan" element={<LaporanTahunanAdminPage />} />
          <Route path="/user/laporan/laporan-tahunan" element={<LaporanTahunanUserPage />} />

          <Route path="/admin/ranking/ranking-bulanan" element={<RankingBulananAdminPage />} />

          <Route path="/admin/ranking/ranking-tahunan" element={<RankingTahunanAdminPage />} />

          <Route path="/admin/dealer/buat-dealer" element={<BuatDealerAdminPage />} />
          <Route path="/admin/dealer/daftar-dealer" element={<DaftarDealerAdminPage />} />
          <Route path="/admin/user/buat-user" element={<BuatUserAdminPage />} />
          <Route path="/admin/user/daftar-user" element={<DaftarUserAdminPage />} />
          <Route path="/admin/set-admin/buat-admin" element={<BuatAdminPage />} />
          <Route path="/admin/set-admin/daftar-admin" element={<DaftarAdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
