const express = require("express");
const router = express.Router();

const DealerController = require("../controllers/DealerController");

router.post("/create", DealerController.createDealer);
router.get("/", DealerController.getDealer);
router.get("/:id", DealerController.getDealerById);
router.post("/edit/:id", DealerController.editDealerById);
router.post("/delete/:id", DealerController.deleteDealerById)

module.exports = router;