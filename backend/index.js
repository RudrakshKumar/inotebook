require('dotenv').config({ path: '../backend/.env' });  
const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = ['https://i-notebook-eta-six.vercel.app', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'], 
  credentials: true,
  optionsSuccessStatus: 204,
  preflightContinue: false,
  maxAge: 86400,
  exposedHeaders: ['Content-Length', 'X-Kuma-Revision'],
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
