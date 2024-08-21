const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')


connectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//Available Routes
app.use('/api/notes', require('./routes/notes'))
app.use('/api/auth', require('./routes/auth'))


app.get('/', (req, res) => {
  res.send(req.body);
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`iNoteBook app listening`)
})
