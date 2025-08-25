const mongoose = require ('mongoose') ; 
const validator  = require ('validator')

const userSchema = mongoose.Schema({
    firstName :{
        type : String , 
        required : true
    },
    secondName :{
        type: String, 
        required: true
    },
    role:{
     type : String , 
     required : true ,
     enum :["ADMIN", "USER"] ,
     default: "USER"
    },
    email : {
        type : String , 
        required : true , 
        unique : true ,
        validate : [validator.isEmail , "not valid email adress"]
    },
    //  must be at least 8 characters, with 1 lowercase, 1 uppercase, 1 number, and 1 symbol ?!$ ...
        password : {
          type : String , 
          required  : true , 
        },
    token :{ 
        type:String , 
    }
})

module.exports = mongoose.model('user', userSchema) ;