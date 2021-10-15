const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController')


router.post("/", UserController.register);
router.post("/create", UserController.user_create);


module.exports = router;