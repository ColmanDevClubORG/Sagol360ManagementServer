import mongoose from "mongoose"

export type Metrics = {
  patientId: string
  energyLevel: number
  sleepQuality: number
  painLevel: number
  concentration: number
  brainFog: number
  mood: number
}

const metricsSchema = new mongoose.Schema(
    {
        patientId: { type: String, required: true },
        energyLevel: { type: Number, required: true},
        sleepQuality: { type: Number, required: true},
        painLevel: { type: Number, required: true},
        concentration: { type: Number, required: true},
        brainFog: { type: Number, required: true},
        mood: { type: Number, required: true},
    },
    { timestamps: true }
)

export const metricsModel = mongoose.model('metrics', metricsSchema)