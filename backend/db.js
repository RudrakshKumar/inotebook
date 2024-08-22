const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Export the connectToMongo function
module.exports = connectToMongo; 


 