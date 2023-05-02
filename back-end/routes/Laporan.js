const express = require("express");
const router = express.Router();

const LaporanController = require("../controllers/LaporanController");

router.post("/create", LaporanController.createLaporan);
router.get("/", LaporanController.getLaporan);
router.get("/:id", LaporanController.getLaporanById);
router.post("/delete/:id", LaporanController.deleteLaporan);

module.exports = router;