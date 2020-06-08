const mongoose = require('mongoose')

const criterioSchema = new mongoose.Schema({
  criterios: [{
      value: {
          type: String
      },
      criterioId: {
          type: Number
      },
      comments: {
          type: Array
      },
      estado: {
          type: String
      }
  }],
  user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
  }
})

module.exports = mongoose.model('criterio', criterioSchema)