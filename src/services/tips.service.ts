import tips from '../db/tips.json';
import { TOTAL_TREATMENTS_20, TOTAL_TREATMENTS_60 } from '@/constants/tips.constants';

export const getTip = (totalTreatments: number, currentTreatment: number): string => {
  if (totalTreatments === TOTAL_TREATMENTS_60 && currentTreatment <= TOTAL_TREATMENTS_60) {
    return tips[currentTreatment - 1].tip;
  }
  if (totalTreatments === TOTAL_TREATMENTS_20 && currentTreatment <= TOTAL_TREATMENTS_20) {
    return tips[(currentTreatment - 1) * 3].tip;
  }
  throw new Error('Invalid treatment parameters');
};
