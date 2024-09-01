const mongoose = require('mongoose');


const librarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
