import { Metrics, metricsModel } from "@/models/metricsModel.mongoose"
import { REPORT_ALREADY_SUBMITTED } from "@/constants/error.constants"

export const SentToday = async (patientId: string) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const alreadySubmitted = await metricsModel.exists({
        patientId,
        createdAt: {$gte: startOfDay}
    })
    return alreadySubmitted ? true : false
}

export const SubmitReport = async (patientId: string, metrics: Omit<Metrics, 'patientId'>) => {
    const alreadySubmitted = await SentToday(patientId)
    if (alreadySubmitted){
        throw new Error(REPORT_ALREADY_SUBMITTED);
    }
    return metricsModel.create({patientId, ...metrics})
}