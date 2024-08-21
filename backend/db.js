const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://kumar2rudraksh:yM2zPrfYcFeAGojc@cluster0.8khdn.mongodb.net/inotebook";

const connectToMongo = async () => {   
    try {
        await mongoose.connect(mongoURI),
        console.log("Connected to Mongo");
    } catch (error) {
        console.error("Error connecting to Mongo:", error);
    }
};

module.exports = connectToMongo;
 