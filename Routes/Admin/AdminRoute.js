const express = require('express');
const router = express.Router();

const {
    register,
    login ,
    resetPassword
   
} = require('../../Controller/Admin/RegitrationController');

// Customer Registration
router.post('/register', register);

// Customer Login
router.post('/login', login );

router.post('/resetpassword',resetPassword)




module.exports = router;
