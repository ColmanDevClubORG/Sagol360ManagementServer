import mongoose from 'mongoose';
const { Schema } = mongoose;

export const appointmentSchema = new Schema({
  title: String,
  startAt: Date,
  durationMinutes: Number,
  location: String,
  type: String,
});

export const appointmentModel = mongoose.model('appointment', appointmentSchema);