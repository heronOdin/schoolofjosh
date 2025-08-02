import mongoose from 'mongoose'

const connectDB = async (mongoURI: string) => {
  if (!mongoURI) throw new Error('MONGO_URI is not defined')

  try {
    const connect = await mongoose.connect(mongoURI, {})
    await mongoose.connection.db?.admin().ping()

    console.log(`MongoDB connected: ${connect.connection.host}`)
    console.log(
      `MongoDB connection established at ${new Date().toISOString()}, and pinged successfully.`
    )
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }

  console.log('MongoDB connected successfully')
}

export default connectDB
