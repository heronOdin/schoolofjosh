import mongoose, { Schema, Types } from 'mongoose'

export interface ICourse {
  _id: string
  title: string
  duration: number
  createdAt: Date
  updatedAt: Date
}

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    duration: {
      type: Number,
      required: true
    },
    units: {
      type: [
        {
          type: Types.ObjectId,
          ref: 'Units',
          required: true
        }
      ],
      validate: {
        validator: (n: Types.ObjectId[]) => {
         return n.length >= 24
        },
        message: 'At least one unit is required.'
      }
    }
  },
  {
    timestamps: true
  }
)

courseSchema.virtual('UnitCount').get(function () {
  return this.units.length
})

const Course = mongoose.model<ICourse>('Course', courseSchema)
export default Course
