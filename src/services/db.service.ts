import mongoose, { Model } from 'mongoose';

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/sagol360managementserver';

let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDb = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(MONGO_URI);
  }

  try {
    await connectionPromise;
  } catch (error) {
    connectionPromise = null;
    throw error;
  }
};

export const dbService = {
  get: async (model: Model<any>, filter: Record<string, unknown> = {}) => {
    return model.find(filter).lean();
  },

  insert: async (model: Model<any>, data: Record<string, unknown>) => {
    return model.create(data);
  },

  update: async (
    model: Model<any>,
    filter: Record<string, unknown>,
    data: Record<string, unknown>
  ) => {
    return model
      .findOneAndUpdate(filter, data, {
        new: true, 
        runValidators: true, 
      })
      .lean();
  },
};