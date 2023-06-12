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
import LaporanHarianHasilAdminPage from './pages/Laporan/Laporan-Harian/Admin-view/hasil-data';
import LaporanHarianHasilUserPage from './pages/Laporan/Laporan-Harian/User-view/hasil-data';

import LaporanBulananAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view';
import LaporanBulananNoAHASSAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view/hasil_noAhass';
import LaporanBulananBulanAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view/hasil_bulan';
import LaporanBulananKabupatenAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view/hasil_kabupaten';
import LaporanBulananKecamatanAdminPage from './pages/Laporan/Laporan-Bulanan/Admin-view/hasil_kecamatan';
import LaporanBulananUserPage from './pages/Laporan/Laporan-Bulanan/User-view';
import LaporanBulananNoAHASSUserPage from './pages/Laporan/Laporan-Bulanan/User-view/hasil_noAhass';
import LaporanBulananBulanSayaUserPage from './pages/Laporan/Laporan-Bulanan/User-view/hasil_bulan';

import LaporanTahunanAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view';
import LaporanTahunanNoAHASSAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view/hasil_noAhass';
import LaporanTahunanTahunAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view/hasil_tahun';
import LaporanTahunanKabupatenAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view/hasil_kabupaten';
import LaporanTahunanKecamatanAdminPage from './pages/Laporan/Laporan-Tahunan/Admin-view/hasil_kecamatan';
import LaporanTahunanUserPage from './pages/Laporan/Laporan-Tahunan/User-view';
import LaporanTahunanNoAHASSUserPage from './pages/Laporan/Laporan-Tahunan/User-view/hasil_noAhass';
import LaporanTahunanTahunSayaUserPage from './pages/Laporan/Laporan-Tahunan/User-view/hasil_tahun';

import RankingBulananAdminPage from './pages/Ranking-Page/Ranking-Bulanan';
import RankingBulananBulanAdminPage from './pages/Ranking-Page/Ranking-Bulanan/hasil_bulan';
import RankingBulananKabupatenAdminPage from './pages/Ranking-Page/Ranking-Bulanan/hasil_kabupaten';
import RankingBulananKecamatanAdminPage from './pages/Ranking-Page/Ranking-Bulanan/hasil_kecamatan';

import RankingTahunanAdminPage from './pages/Ranking-Page/Ranking-Tahunan';
import RankingTahunanTahunAdminPage from './pages/Ranking-Page/Ranking-Tahunan/hasil_tahun';
import RankingTahunanKabupatenAdminPage from './pages/Ranking-Page/Ranking-Tahunan/hasil_kabupaten';
import RankingTahunanKecamatanAdminPage from './pages/Ranking-Page/Ranking-Tahunan/hasil_kecamatan';

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
          <Route path="/admin/laporan/laporan-harian/hasil-data" element={<LaporanHarianHasilAdminPage />} />
          <Route path="/user/laporan/laporan-harian" element={<LaporanHarianUserPage />} />
          <Route path="/user/laporan/laporan-harian/hasil-data" element={<LaporanHarianHasilUserPage />} />

          <Route path="/admin/laporan/laporan-bulanan" element={<LaporanBulananAdminPage />} />
          <Route path="/admin/laporan/laporan-bulanan/no-ahass/hasil-data/" element={<LaporanBulananNoAHASSAdminPage />} />
          <Route path="/admin/laporan/laporan-bulanan/bulan/hasil-data/" element={<LaporanBulananBulanAdminPage />} />
          <Route path="/admin/laporan/laporan-bulanan/kabupaten/hasil-data/" element={<LaporanBulananKabupatenAdminPage />} />
          <Route path="/admin/laporan/laporan-bulanan/kecamatan/hasil-data/" element={<LaporanBulananKecamatanAdminPage />} />

          <Route path="/user/laporan/laporan-bulanan" element={<LaporanBulananUserPage />} />
          <Route path="/user/laporan/laporan-bulanan/no-ahass/hasil-data/" element={<LaporanBulananNoAHASSUserPage />} />
          <Route path="/user/laporan/laporan-bulanan/bulan-saya/hasil-data/" element={<LaporanBulananBulanSayaUserPage />} />

          <Route path="/admin/laporan/laporan-tahunan" element={<LaporanTahunanAdminPage />} />
          <Route path="/admin/laporan/laporan-tahunan/no-ahass/hasil-data/" element={<LaporanTahunanNoAHASSAdminPage />} />
          <Route path="/admin/laporan/laporan-tahunan/tahun/hasil-data/" element={<LaporanTahunanTahunAdminPage />} />
          <Route path="/admin/laporan/laporan-tahunan/kabupaten/hasil-data/" element={<LaporanTahunanKabupatenAdminPage />} />
          <Route path="/admin/laporan/laporan-tahunan/kecamatan/hasil-data/" element={<LaporanTahunanKecamatanAdminPage />} />

          <Route path="/user/laporan/laporan-tahunan" element={<LaporanTahunanUserPage />} />
          <Route path="/user/laporan/laporan-tahunan/no-ahass/hasil-data/" element={<LaporanTahunanNoAHASSUserPage />} />
          <Route path="/user/laporan/laporan-tahunan/tahun-saya/hasil-data/" element={<LaporanTahunanTahunSayaUserPage />} />

          <Route path="/admin/ranking/ranking-bulanan" element={<RankingBulananAdminPage />} />
          <Route path="/admin/ranking/ranking-bulanan/bulan/hasil-data/" element={<RankingBulananBulanAdminPage />} />
          <Route path="/admin/ranking/ranking-bulanan/kabupaten/hasil-data/" element={<RankingBulananKabupatenAdminPage />} />
          <Route path="/admin/ranking/ranking-bulanan/kecamatan/hasil-data/" element={<RankingBulananKecamatanAdminPage />} />

          <Route path="/admin/ranking/ranking-tahunan" element={<RankingTahunanAdminPage />} />
          <Route path="/admin/ranking/ranking-tahunan/tahun/hasil-data/" element={<RankingTahunanTahunAdminPage />} />
          <Route path="/admin/ranking/ranking-tahunan/kabupaten/hasil-data/" element={<RankingTahunanKabupatenAdminPage />} />
          <Route path="/admin/ranking/ranking-tahunan/kecamatan/hasil-data/" element={<RankingTahunanKecamatanAdminPage />} />

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
