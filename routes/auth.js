const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController')


router.post("/", UserController.register);

router.post("/create", UserController.user_create);

router.post("/login", UserController.user_login);


module.exports = router;