const express = require('express')
const routes = require('./routes')
const db = require('./db')

const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.json());

app.use('/api', routes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})