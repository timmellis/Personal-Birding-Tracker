const { Schema } = require('mongoose');
const { ObjectId } = require('bson')

 
const SightingSchema = new Schema(
  {
    timestamp: { type: String, required: true },
    park_id: { type: ObjectId, required: true },
    notes: { type: String, required: false, default: "" }
  },
  {timestamps: true}
)

const Bird = new Schema(
  {
    name: { type: String, required: true },
    species_code: { type: String, required: false },
    keywords: { type: Array, required: false, default: [] },
    sightings: [SightingSchema],
    gallery: [
      {
        url: { type: String, required: false },
        note: { type: String, required: false, default: "" }
      }
    ],
    img: { type: String, required: false }, 
    description: {type: String, required: false, default: ""},
    notes: {type: String, required: false, default: ""}
  },
  {timestamps: true}
)
 
module.exports = Bird