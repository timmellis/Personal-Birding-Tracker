const { Schema } = require('mongoose');
 

const Park = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: false },
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
 
module.exports = Park
