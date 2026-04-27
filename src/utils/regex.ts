export const DIGITS_ONLY_REGEX = /^\d+$/;

export const isDigitsOnly = (value: string): boolean => DIGITS_ONLY_REGEX.test(value);
