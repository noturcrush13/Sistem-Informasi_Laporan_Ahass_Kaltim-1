const express = require("express");
const router = express.Router();

const DealerController = require("../controllers/DealerController");

router.post("/create", DealerController.createDealer);
router.get("/", DealerController.getDealer);
router.get("/:id", DealerController.getDealerById);
router.post("/edit/:id", DealerController.editDealerById);
router.delete("/delete/:id", DealerController.deleteDealerById)
router.get("/getdealername/:No_Ahass", DealerController.getDealerNoAHASS)

module.exports = router;