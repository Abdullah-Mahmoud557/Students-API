const express = require ('express') ;
const studentValidation = require('../middleware/DataValidation');

const router = express.Router() ;

const StudentsController = require('../controllers/students.controller');
const checkId = require('../middleware/checkId');
const verfiyToken=require ('../middleware/verfiyToken')
const allowedTo = require ('../middleware/allowedTo');

router.route('/')
        .get(verfiyToken,allowedTo("ADMIN","USER"),StudentsController.getStudents)
        .post(verfiyToken , allowedTo("ADMIN") ,StudentsController.createStudent,studentValidation) 

router.route('/:studentId')
       .get(verfiyToken, allowedTo("ADMIN","USER"), StudentsController.getStudent,checkId)
       .patch(verfiyToken, allowedTo("ADMIN"), StudentsController.updateStudent, checkId  , studentValidation)
       .delete(verfiyToken ,allowedTo("ADMIN"),   StudentsController.deleteStudent ,checkId  )         

module.exports = router ;