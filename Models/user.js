const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userCart.model', // Reference to the Cart model
  },
  balance: {
    type: Number,
    default: 10000,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
