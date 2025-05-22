/**
 * Calculates the positive modulo of a number, ensuring the result is always non-negative.
 *
 * This function performs modulo operation and ensures the result is positive, even when
 * the input value is negative. It's particularly useful for cyclic calculations where
 * negative results need to be converted to their positive equivalents.
 *
 * @param value - The dividend, which can be any integer (positive or negative)
 * @param modulus - The divisor used for the modulo operation (must be positive)
 * @returns A positive number in the range [0, modulus - 1]
 *
 * @example
 * // Positive input
 * _getPositiveModulo(8, 7); // Returns 1
 *
 * @example
 * // Negative input
 * _getPositiveModulo(-1, 7); // Returns 6
 *
 * @example
 * // Value within range
 * _getPositiveModulo(3, 7); // Returns 3
 */
function _getPositiveModulo(value: number, modulus: number): number {
  // Adding +0 to avoid negative zero (-0) result
  const remainder = (value % modulus) + 0;
  return remainder < 0 ? modulus + remainder : remainder;
}

export { _getPositiveModulo };
