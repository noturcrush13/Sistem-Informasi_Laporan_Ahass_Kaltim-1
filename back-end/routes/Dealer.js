const express = require("express");
const router = express.Router();

const DealerController = require("../controllers/DealerController");

router.post("/create", DealerController.createDealer);
router.get("/", DealerController.getDealer);

module.exports = router;