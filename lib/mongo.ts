import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

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
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).mongooseCache = cached; // guardamos en global para HMR
  return cached.conn;
}

export default dbConnect;
