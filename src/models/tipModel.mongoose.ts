import mongoose from 'mongoose';

export interface Tip {
  treatmentNumber: number;
  tip: string;
}

const tipSchema = new mongoose.Schema({
  treatmentNumber: { type: Number, required: true },
  tip: { type: String, required: true },
});

export const tipModel = mongoose.model('tip', tipSchema);
