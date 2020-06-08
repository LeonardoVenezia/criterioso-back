const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user: {
      type: String,
      unique: true
  },
  pass: {
    type: String,
  },
  listaCriterios : [
    {
      value: {
        type: String
      },
      criterioIndex: {
        type: Number
      },
      estado: {
        type: String
      },
      comments: {
        type: Array,
        default: []
      }
    }
  ]
  // listaCriterios: {
  //     type: Array,
  //     default: []
  // }
})

module.exports = mongoose.model('user', userSchema)