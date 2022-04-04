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

/////   ↓↓ FOR LIVE DEPLOYMENT ↓↓   /////
app.use(express.static(`${__dirname}/client/build`));
/////   ↑↑ FOR LIVE DEPLOYMENT ↑↑   /////

app.use('/api', routes);

db.on('error', console.error.bind(console, 'MongoDB connection error:'))



/////   ↓↓ FOR LIVE DEPLOYMENT ↓↓   /////
app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})
/////   ↑↑ FOR LIVE DEPLOYMENT ↑↑   /////

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})