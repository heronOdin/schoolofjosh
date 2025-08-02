import mongoose, { Schema } from 'mongoose'

const unitSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  }
})

const Units = mongoose.model('Units', unitSchema)

export default Units
