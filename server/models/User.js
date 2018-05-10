const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: {type: String},
    surname: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    hive: { type: Schema.Types.ObjectId, ref: 'Hive' },
    paymentMethod: {type: String, enum: ["Contrareembolso", "Tarjeta", "PayPal"], default: "Contrareembolso"},
    isApicultor: { type: Boolean, default: false },
    isFilled: {type: Boolean, default: false},
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
