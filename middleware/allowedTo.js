const appError = require ('../utils/appError')
const httpStatusText = require ('../utils/httpStatusText')
module.exports = (...roles) =>{
     const check = (req,res ,next ) =>{
        const role = req.currentUser.role ;
        console.log(role);
        if (!roles.includes(role)){
            next(appError.create(`YOUR ROLE : ${role} IS NOT AUTHORIZED TO DO THIS ACTION` , 401 ,httpStatusText.FAIL))
        }
        next();
    }
   return check;
}