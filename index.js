require('dotenv').config() ; 
const express = require("express") ;
const cors = require('cors')

const httpStatusText = require('./utils/httpStatusText');
const mongoose = require("mongoose") ;

const app = express() ; 

const url = process.env.MONGO_URL ;


mongoose.connect(url) .then(()=>{
    console.log("mongodb server started") ;
})

app.use(cors() ) 
app.use(express.json() ) 


const studentRoute = require ('./routes/students.route');
const userRoute = require ('./routes/users.route.js');
app.use('/api/student',studentRoute) ;
app.use('/api/user', userRoute);


//default error handler
app.use((error, req, res, next) => {
      return res.status(error.statusCode||500).json({
        status: error.statusText||"fail",
        data: error.message
    });
});

//route not found 404 error handler
app.use((req, res) => {
    return res.status(404).json({
        status: httpStatusText.FAIL,
        data: "resource not found"
    });
});

app.listen(process.env.PORT,()=> {
    console.log(`listening on port : ${process.env.PORT}`)
})