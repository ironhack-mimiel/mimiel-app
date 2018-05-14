const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hiveSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    location: { type: { type: String }, coordinates: [Number] },
    beekeeper: { type: Schema.Types.ObjectId, ref: 'User' },
    honey: { type: Schema.Types.ObjectId, ref: 'Honey' },
    rpi: { type: Schema.Types.ObjectId, ref: 'Rpi' },
    picturesURL: [String],
    patrons: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Hive = mongoose.model('Hive', hiveSchema);
module.exports = Hive;
