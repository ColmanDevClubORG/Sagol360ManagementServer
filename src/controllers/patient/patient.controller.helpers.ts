import { DIGITS_ONLY_REGEX } from '../../utils/regex';

export const parsePatientSerializeNumber = (
  value: string | string[] | undefined,
): number | null => {
  const serializeNumber = Array.isArray(value) ? value[0] : value;

  if (!serializeNumber || !DIGITS_ONLY_REGEX.test(serializeNumber)) {
    return null;
  }

  return Number(serializeNumber);
};
