import { Metrics, metricsModel } from '@/models/metricsModel.mongoose';
import { REPORT_ALREADY_SUBMITTED } from '@/constants/error.constants';
import { getStartOfDay } from '@/utils/date';

const isSentToday = async (patientId: string) => {
  const startOfDay = getStartOfDay();
  const alreadySubmitted = await metricsModel.exists({
    patientId,
    createdAt: { $gte: startOfDay },
  });
  return Boolean(alreadySubmitted);
};

const SubmitReport = async (patientId: string, metrics: Omit<Metrics, 'patientId'>) => {
  const alreadySubmitted = await isSentToday(patientId);
  if (alreadySubmitted) {
    throw new Error(REPORT_ALREADY_SUBMITTED);
  }
  return metricsModel.create({ patientId, ...metrics });
};

export const metricsService = {
  isSentToday,
  SubmitReport,
};
