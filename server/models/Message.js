const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    message: {type: String},
    hive: { type: Schema.Types.ObjectId, ref: 'Hive' },
    isRead: {type: Boolean, default: false}
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;