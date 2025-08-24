const asyncWrapper = require('../middleware/asyncWrapper');
const Student = require('../models/student.model')
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');

const getStudents = asyncWrapper (
    async (req,res) =>{
        const lim = Math.max(req.query.limit || 10, 1);
        const page = Math.max(req.query.page || 1 , 1); 
        const students =await Student.find().skip (lim * (page-1)).limit(lim); // lim(0) = no limit

        res.status(200) .json({status: httpStatusText.SUCCESS, data: students})  ; 
    }
)

const getStudent = asyncWrapper(
    async(req,res,next) =>{     
        const id = req.params.studentId;

        const student = await Student.findOne({_id: id});
        if (!student) {
            const error =  appError.create ("student not found", 404 , httpStatusText.FAIL)
            return next (error);
        }
        res.status(200).json({status: httpStatusText.SUCCESS, data: student})
    }
 );

const createStudent = asyncWrapper(
    async (req, res, next) => {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: student });
    }
);

const updateStudent = asyncWrapper(
    async(req,res,next) =>{   
            const updatedStudent = await Student.findByIdAndUpdate(
                req.params.studentId,
                { $set: { ...req.body }},
                { new: true , runValidators:true}
            ); 
            if (!updatedStudent) {
                return next (appError.create ("student not found", 404 , httpStatusText.FAIL));        
            }
            res.status(200).json({ status : httpStatusText.SUCCESS , data : updatedStudent});      
    } 
)

const deleteStudent = asyncWrapper(
    async (req,res,next) =>{
            const studnet = await Student.findByIdAndDelete(req.params.studentId);
            if (!studnet) {
                return next(appError.create("Student not found", 404, httpStatusText.FAIL));
            }
            return res.status(200).json({status : httpStatusText.SUCCESS , data: "student deleted successfuly" });
    }
)


module.exports = {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}