const express = require("express");
const router = express.Router();

const LaporanController = require("../controllers/LaporanController");

router.post("/create", LaporanController.createLaporan);
router.get("/getlaporanharian/:id_dealer/:first_date/:last_date", LaporanController.getLaporanByFirstandLastDate)
router.get("/getlaporanharian/:first_date/:last_date", LaporanController.getLaporanAllDealerByFirstandLastDate);
router.get("/", LaporanController.getLaporan);
router.get("/:id", LaporanController.getLaporanById);
router.post("/update/:id", LaporanController.updateLaporan);
router.delete("/delete/:id", LaporanController.deleteLaporan);
router.get("/getlaporanharianuser/:tanggal", LaporanController.getLaporanbyDate);
router.get("/getlaporanbulanan/:id_dealer/:bulan/:tahun", LaporanController.getLaporanBulanan);
router.get("/getlaporanbulanansemua/:bulan/:tahun", LaporanController.getAllLaporanBulananAllDealer);
router.get("/getlaporanbulanandashboard/:id_dealer/:bulan/:tahun", LaporanController.getAllLaporanBulananOneDealer);
router.get("/getlaporanbulanansaya/:id_dealer/:bulan/:tahun", LaporanController.getAllLaporanBulananByidDealer);
router.get("/getalllaporanbulanan/:bulan/:tahun", LaporanController.getAllLaporanBulananbyBulan);
router.get("/getrekaplaporanbulanan/:bulan/:tahun", LaporanController.getAllLaporanBulananPerDealer);
router.get("/getrekaplaporanbulanankabupaten/:bulan/:tahun/:kabupaten", LaporanController.getAllLaporanBulananPerDealerbyKabupaten);
router.get("/getrekaplaporanbulanankecamatan/:bulan/:tahun/:kecamatan", LaporanController.getAllLaporanBulananPerDealerbyKecamatan);
router.get("/getlaporantahunan/:id_dealer/:tahun", LaporanController.getAllLaporanTahunan);
router.get("/getrekaplaporantahunan/:tahun", LaporanController.getAllLaporanTahunanbyTahun);
router.get("/getlaporantahunansaya/:id_dealer/:tahun", LaporanController.getAllLaporanTahunanByIdDealer)
router.get("/getrekaplaporantahunankabupaten/:tahun/:kabupaten", LaporanController.getAllLaporanTahunanbyKabupaten);
router.get("/getrekaplaporantahunankecamatan/:tahun/:kecamatan", LaporanController.getAllLaporanTahunanPerDealerbyKecamatan);
router.get("/rankingbulananbybulan/:bulan/:tahun", LaporanController.RankingBulanananbyBulan);
router.get("/rankingbulananbykabupaten/:bulan/:tahun/:kabupaten", LaporanController.RankingBulananByKabupaten);
router.get("/rankingbulananbykecamatan/:bulan/:tahun/:kecamatan", LaporanController.RankingBulananByKecamatan);
router.get("/rankingtahunanbytahun/:tahun", LaporanController.RankingTahunanByTahun);
router.get("/rankingtahunanbykabupaten/:tahun/:kabupaten", LaporanController.RankingTahunanByKabupaten);
router.get("/rankingtahunanbykecamatan/:tahun/:kecamatan", LaporanController.RankingTahunanByKecamatan);

module.exports = router;