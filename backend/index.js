require('dotenv').config({ path: '../backend/.env' });  
const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

const PORT = process.env.PORT || 5000;
const app = express();
const corsOptions = {
  origin: 'https://inotebook-indol.vercel.app/', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
  preflightContinue: false, // Pass the CORS preflight response to the next handler
  maxAge: 86400, // Cache the preflight response for 24 hours
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'], // Headers exposed to the browser
};

app.use(cors(corsOptions));
app.use(express.json());

// Available Routes
app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`iNoteBook app listening on port ${PORT}`);
});
