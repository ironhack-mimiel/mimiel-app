const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hiveSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    location: { type: { type: String }, coordinates: [Number] },
    honey: { type: Schema.Types.ObjectId, ref: 'Honey' },
    sensor: { type: Schema.Types.ObjectId, ref: 'Sensor' },
    email: { type: String, required: true },
    phoneNumber: Number,
    picturesURL: [String],
    patrons: [Schema.Types.ObjectId]
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
