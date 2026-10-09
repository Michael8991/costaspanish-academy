import mongoose from "mongoose";

/**
 * Cached connection for MongoDB.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongooseCache ?? { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("Please define the MONGO_URI environment variable");
    }

    cached.promise = mongoose.connect(mongoUri).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).mongooseCache = cached; // guardamos en global para HMR
  return cached.conn;
}

export default dbConnect;
