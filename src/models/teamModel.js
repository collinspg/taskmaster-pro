const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], 
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },        
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }      
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);