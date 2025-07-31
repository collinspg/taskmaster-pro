const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
