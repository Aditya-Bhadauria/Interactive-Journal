const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For JWT generation
// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/Chrono-Log';

const app = express();

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


// Hash password before saving user
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // Add other fields as needed, e.g., date (type: Date), author (type: String)
});

const Journal = mongoose.model('Journal', journalSchema);

// Journal Router
const journalRouter = express.Router();

journalRouter.get('/', async (req, res) => {
  try {
    const journals = await Journal.find();
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single journal by ID
journalRouter.get('/:id', async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new journal
journalRouter.post('/', async (req, res) => {
  const newJournal = new Journal(req.body);
  try {
    const savedJournal = await newJournal.save();
    res.status(201).json(savedJournal);
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle validation errors appropriately
  }
});

// PUT update a journal by ID
journalRouter.put('/:id', async (req, res) => {
  const updates = req.body;
  const allowedUpdates = ['title', 'content']; // Adjust as needed
  const isValidUpdate = Object.keys(updates).every(update => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).json({ error: 'Invalid update fields' });
  }
  try {
    const updatedJournal = await Journal.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json(updatedJournal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a journal by ID
journalRouter.delete('/:id', async (req, res) => {
  try {
    const deletedJournal = await Journal.findByIdAndDelete(req.params.id);
    if (!deletedJournal) {
      return res.status(404).json({ message: 'Journal not found' });
    }
    res.json({ message: 'Journal deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





// Signup API Endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login API Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Email or Password' });
    }

    const payload = { userId: user._id }; // Include relevant user data in the payload
    const secretKey = '12345678'; // Replace with a strong secret key for signing
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set an expiry time for the token
    console.log(`this is backend token ${token}`);
    
    // Implement JWT generation and sending here (not covered in this example)

    res.json({ message: 'Login successful', user,token }); // Replace with JWT response
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

const port = process.env.PORT || 5000;

app.use('/api/journals', journalRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));



