import mongoose, { Schema, Types } from 'mongoose'

export interface IEnrollment extends Document {
  studentId: Types.ObjectId
  courseId: Types.ObjectId
  semester: string
  enrolledAt: Date
}

const EnrollSchema = new Schema<IEnrollment>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Student'
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course'
    },
    semester: {
      type: String,
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollSchema)

export default Enrollment