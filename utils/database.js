const { default: mongoose } = require('mongoose');

require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGODB_CONNECTION)

