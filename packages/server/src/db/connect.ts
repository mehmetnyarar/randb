import mongoose from 'mongoose'

/**
 * Connects to a MongoDB database.
 * @param uri Connection URI.
 * @returns Mongoose.
 */
export const connect = async (uri: string) => {
  return mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}
