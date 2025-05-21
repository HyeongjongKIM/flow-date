/**
 * Checks if a value can be converted to a valid Date.
 * Handles strings, numbers, and Date instances.
 *
 * Note: Unlike the Date constructor, returns false for false/null/undefined
 * to avoid misleading epoch time conversions.
 *
 * @param value - Value to check (string | number | Date | unknown)
 * @returns true if the value represents a valid date
 *
 * @example
 * // Valid cases
 * isValidDate(new Date('2024-01-01'));  // true
 * isValidDate('2024-01-01');            // true
 * isValidDate(1672531200);              // true
 *
 * @example
 * // Invalid cases
 * isValidDate('invalid-date');          // false
 * isValidDate(null);                    // false
 */
function isValidDate(value: unknown): boolean {
  if (value === false || value === null || value === undefined) {
    return false;
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    const parsedDate = value instanceof Date ? value : new Date(value);
    return !(
      parsedDate.toString() === 'Invalid Date' || isNaN(parsedDate.getTime())
    );
  }

  return false;
}

export { isValidDate };
