const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const userSchema =  new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Author', 'Borrower'], required: true },
}, { timestamps: true });


userSchema.methods.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  

module.exports = mongoose.model('User', userSchema);
