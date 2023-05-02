const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.post("/login", AdminController.loginAdmin);
router.post("/register", AdminController.registerAdmin);
router.get("/", AdminController.getAdmin);

module.exports = router;