const mongoose = require('mongoose');

const connectToMongoDB = async(url) =>{
    console.log("Inside connectBD")
    const options = {
        serverSelectionTimeoutMS: 15000, // 15 seconds
        // Add other MongoDB connection options here if needed
      };
    return await mongoose.connect(url,options);
}

module.exports = {
    connectToMongoDB
}