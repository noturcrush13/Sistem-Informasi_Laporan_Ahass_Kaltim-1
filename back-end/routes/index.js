const express = require("express");

const AdminRoutes = require("./Admin");
const DealerRoutes = require("./Dealer");
const UserRoutes = require("./User");
const LaporanRoutes = require("./Laporan");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/ping", (res) => {
    const ready = {
        status: "Server is Ready"
    };

    res.status(200).send(ready);
})

router.use("/admin", AdminRoutes);
router.use("/dealer", auth, DealerRoutes);
router.use("/user", UserRoutes);
router.use("/laporan", auth, LaporanRoutes);

module.exports = router