const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nama tidak boleh kosong'] },
  age: { type: Number, required: [true, 'Umur tidak boleh kosong'] },
  status: {
    type: String,
    enum: ['active', 'non active'],
    default: 'non active',
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
