const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);
router.get("/", UserController.getUser);
router.post("/edit/:id", UserController.editUserById)
router.post("/delete/:id", UserController.deleteUserById)

module.exports = router;