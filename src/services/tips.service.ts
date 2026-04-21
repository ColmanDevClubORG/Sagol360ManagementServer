import tips from '../db/tips.json'

export const getTip = (totalTreatments: number, currentTreatment: number): string => {
  if (totalTreatments === 60 && currentTreatment <= 60) {
    return tips[currentTreatment - 1].tip;
  }
  if (totalTreatments === 20 && currentTreatment <= 20) {
    return tips[(currentTreatment - 1) * 3].tip;
  }
  throw new Error('Invalid treatment parameters');
};
