const asyncWrapper = require('../middleware/asyncWrapper');
const User = require ('../models/user.model');
const bcrypt = require ('bcrypt')
const appError = require ("../utils/appError")
const httpStatusText = require ('../utils/httpStatusText')
const jwt = require ("jsonwebtoken")
const generateJWT = require ("../utils/generateJWT")
const validator = require('validator');
const PASSMESSAGE = "the password must be at least 8 characters, with 1 lowercase, 1 uppercase, 1 number, and 1 symbol"

const register =asyncWrapper(
     async(req,res,next) =>{
        const {firstName, secondName,role, email, password }= req.body;
        
        if (!validator.isStrongPassword(password)) {
            next(appError.create(PASSMESSAGE , 400, httpStatusText.FAIL))
        }
        
        const hashedPassword = await bcrypt.hash (password,10 ) ;
        const newUser = new User ({
            firstName ,
             secondName ,
             role,
             email , 
             password : hashedPassword }) ; 

          const token = await generateJWT({ email: newUser.email, id: newUser._id, role :newUser.role })
          newUser.token = token ;

         await newUser.save();
        res.status (201) .json (newUser)
     }
)
const login = asyncWrapper(
    async(req,res,next)=>{
        const {email ,password} = req.body ; 
        if (!email || !password){
            return next(appError.create("email and password are requried" , 400 , httpStatusText.FAIL));
        }
        
        const user = await User.findOne({email: email})
        if (!user ){
            return next(appError.create("there is no user with this email" , 400 , httpStatusText.FAIL));
        }
        const matchedPassword = await bcrypt.compare(password , user.password);
        if ( ! matchedPassword ){
            return next(appError.create("wrong password" , 400 , httpStatusText.FAIL));
        }

        const token =await generateJWT({ email: user.email, id: user._id, role  : user.role })
        user.token = token ;
          
        await user.save() 
          
        res.status(200).json({status: httpStatusText.SUCCESS , data : user})
    }
)



module.exports  = {
    register,
    login
}