const mongoose = require('mongoose');

const connectToMongoDB = (url) =>{
    const options = {
        serverSelectionTimeoutMS: 15000, // 15 seconds
        // Add other MongoDB connection options here if needed
      };
    return mongoose.connect(url,options);
}

module.exports = {
    connectToMongoDB
}