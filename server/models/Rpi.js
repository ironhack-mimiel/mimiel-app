const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rpiSchema = new Schema (
  {
    rpiId: Number,
    temperature: []
  },
  {
    timestamps: {
      createdAt: "created_at"
    }
  }
);

const Rpi = mongoose.model('Rpi', rpiSchema);
module.exports = Rpi