import { isDigitsOnly } from '../../utils/regex';

export const parsePatientId = (value: string | undefined): string | null => {
  if (!value || !isDigitsOnly(value)) {
    return null;
  }

  return value;
};
