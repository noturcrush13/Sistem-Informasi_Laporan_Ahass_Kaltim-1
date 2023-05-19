const express = require("express");
const router = express.Router();

const LaporanController = require("../controllers/LaporanController");

router.post("/create", LaporanController.createLaporan);
router.get("/getlaporanharian/:id_dealer/:first_date/:last_date", LaporanController.getLaporanByFirstandLastDate)
router.get("/", LaporanController.getLaporan);
router.get("/:id", LaporanController.getLaporanById);
router.post("/delete/:id", LaporanController.deleteLaporan);
router.get("/getlaporanbulanan/:id_dealer/:bulan/:tahun", LaporanController.getLaporanBulanan);
router.get("/getalllaporanbulanan/:bulan/:tahun", LaporanController.getAllLaporanBulananbyBulan);

module.exports = router;