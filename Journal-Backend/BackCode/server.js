const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataModel = require('./Models/datamodel'); // Import your data model

// Assuming your db connection file is named 'db.js' in the same directory
const connectDB = require('./Db'); // Connect to MongoDB using the previously created file 'db.js'

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json()); // Enable parsing of JSON data from React

// Get all data
app.get('/api/data', async (req, res) => {
  try {
    const data = await dataModel.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Server Error');
  }
});

// Save new data (replace with your actual logic)
app.post('/api/data', async (req, res) => {
  const { name, age } = req.body; // Destructure data from request body
  try {
    const newData = new dataModel({ name, age });
    await newData.save();
    res.json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error.message);
    // Consider more specific error handling based on error type (e.g., validation error)
    res.status(400).send('Error saving data');
  }
});

(async () => {
  try {
    await connectDB(); // Connect to MongoDB before starting server
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1); // Exit process on error
  }
})();


