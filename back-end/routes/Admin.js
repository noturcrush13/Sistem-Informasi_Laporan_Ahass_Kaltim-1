const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.post("/login", AdminController.loginAdmin);
router.post("/register", AdminController.registerAdmin);
router.get("/", AdminController.getAdmin);
router.get("/:id", AdminController.getAdminbyID);
router.post("/edit/:id", AdminController.editAdminbyID);
router.delete("/delete/:id", AdminController.deleteAdminbyID);

module.exports = router;