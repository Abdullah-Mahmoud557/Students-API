const usersController = require('../controllers/users.controller');
const express = require('express')
const validateUser = require("../middleware/DataValidation")
const router = express.Router() ;

router.route ("/auth/register") 
            .post(usersController.register, validateUser)
           
router.route ("/auth/login")        
            .post (usersController.login, validateUser) 
            
 module.exports = router ;
            