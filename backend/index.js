const connectToMongo = require('./db');
const express = require('express');
const user = require('./models/User');
const { query } = require('express-validator');
const JWT_SECRET="harry is a good boy";

var cors = require('cors')

connectToMongo();

const app = express();
const port = 5000;


app.use(cors())

app.use(express.json()); 

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`);
});
