const mongoose = require('mongoose');
import dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})

const connection= async () => {
    try {
     await mongoose.connect(process.env.URI)
        
        console.log("MongoDB Connected:")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); 
    }
};

connection()
