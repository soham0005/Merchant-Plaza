const {connectToMongoDB} = require('./dbConfig/connect')
const express = require("express");
const app = express();
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const productRoute = require("./routes/productRoute");

const port = process.env.PORT || 8000;
app.use(express.json());

connectToMongoDB("mongodb+srv://soham215:DatabasePassword123!!@cluster0.n1osarv.mongodb.net/merchantplaza")
 .then(()=>{
    console.log("Database Connected Successfully");
 })
 
 .catch((error)=>{
    console.log("Database Not Connected:",error.message);
 })


app.use(express.urlencoded({extended:false}))
app.use('/api/user',userRoute);
app.use('/api/product',productRoute);


app.listen(port,()=>{
    console.log(`Server Listening on port:${port}`);
})