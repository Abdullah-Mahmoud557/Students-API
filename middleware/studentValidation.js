const httpStatusText = require('../utils/httpStatusText');

function studentValidation(err, req, res, next) {
    if (err.name === 'ValidationError' ) {
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: err.message
        });
    }
    //doublicate email 
    if (err.code === 11000){  
        return res.status(400).json({
            status: httpStatusText.FAIL,
            data: "this email is already taken"
        });
    }
    next(err);
}
 
module.exports = studentValidation;