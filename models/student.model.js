const mongoose = require ("mongoose");
const validator = require ("validator");

const studentSchema = mongoose.Schema({
firstName :{
    type: String,
    required: true,
    validate : [validator.isAlpha , "firstName should only contain characters"],
    minlength: [3, "First name must be at least 3 characters long"],
},
lastName :{
    type: String,
    required: true,
    validate : [validator.isAlpha , "secondName should only contain characters"],
    minlength: [3, "Second name must be at least 3 characters long"],
},
email :{
   type: String,
   required: true,
   unique: true, 
   validate: [validator.isEmail, 'not valid email adress']
},
},{timestamps : true})


module.exports= mongoose.model("Student" ,studentSchema);