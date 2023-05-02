const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.post("/login", AdminController.loginAdmin);
router.post("/register", AdminController.registerAdmin);
router.get("/", AdminController.getAdmin);
router.post("/edit/:id", AdminController.editAdminbyID);
router.post("/delete/:id", AdminController.deleteAdminbyID);

module.exports = router;