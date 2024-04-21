// const mongoose = require('mongoose');

// const DataSchema = new mongoose.Schema({
//     // Define your data fields here
//     name: {
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         min: 0
//     },
//     // Add more fields as needed
// });

// module.exports = mongoose.model('Data', DataSchema);

const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    // Define your data fields here
    name: {
        type: String,
        required: true
    },
    Password: {
        type: Number,
        min: 0
    },
    // Add more fields as needed
});

module.exports = mongoose.model('Data', DataSchema);