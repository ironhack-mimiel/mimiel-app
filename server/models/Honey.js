const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const honeySchema = new Schema(
  {
    name: {type: String, required: true},
    type: {type: String},
    hive: { type: Schema.Types.ObjectId, ref: 'Hive' },
    pictureUrl: String
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Honey = mongoose.model('Honey', honeySchema);
module.exports = Honey;
