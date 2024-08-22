require('dotenv').config({ path: '../backend/.env' });  
const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

// Connect to MongoDB
connectToMongo();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
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
