const {connectToMongoDB} = require('./dbConfig/connect')
const express = require("express");
const app = express();
require('dotenv').config();
const userRoute = require('./routes/userRoute');

const port = process.env.PORT || 8000;

connectToMongoDB(process.env.mongo_url)
 .then(()=>{
    console.log("Database Connected Successfully");
 })
 .catch(()=>{
    console.log("Database Not Connected");
 })


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/api/user',userRoute);

app.listen(port,()=>{
    console.log(`Server Listening on port:${port}`);
})