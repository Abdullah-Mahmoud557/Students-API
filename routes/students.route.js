const express = require ('express') ;
const studentValidation = require('../middleware/studentValidation');

const router = express.Router() ;

const StudentsController = require('../controllers/students.controller');
const checkId = require('../middleware/checkId');

router.route('/')
        .get(StudentsController.getStudents)
        .post(StudentsController.createStudent,studentValidation) 

router.route('/:studentId')
       .get(checkId,StudentsController.getStudent)
       .patch(checkId, StudentsController.updateStudent, studentValidation)
       .delete(checkId , StudentsController.deleteStudent)         

module.exports = router ;