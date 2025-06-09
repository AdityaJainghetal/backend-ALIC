const express = require ("express")
const router = express.Router();
const userController = require("../../Controller/Admin/RegitrationController")

router.post("/register",userController.register)

router.post('/login', userController.login);



module.exports = router