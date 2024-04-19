const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect( 'mongodb://localhost:27017/Chrono-Log', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.uri}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process on error
    }
};

module.exports = connectDB;
