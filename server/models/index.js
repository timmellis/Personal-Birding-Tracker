const { model } = require('mongoose')
const BirdSchema = require('./birdSchema')
const ParkSchema = require('./parkSchema')

const Bird = model('birds', BirdSchema)
const Park = model('parks', ParkSchema)

module.exports = {
    Bird,
    Park
}