const moongoose = require('mongoose');
const serverConfig = require('./serverConfig');

async function connectDB() {
    try {
        await moongoose.connect(serverConfig.MONGODB_URL);
        console.log('Connected to MongoDB server');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    
    }

}

module.exports = connectDB;