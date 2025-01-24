/**
 * Gets a nested string value from the translations object using dot notation
 * @param obj The translations object with unknown structure
 * @param path The path to the value (e.g. "PAGE.COMMON.TITLE")
 * @throws Error when the path is invalid, empty, or value is not convertible to string
 * @returns The string value at the specified path
 */
export function getNestedTranslation(
  obj: Record<string, unknown>,
  path: string
): string {
  if (!path) {
    throw new Error('Translation path cannot be empty');
  }

  const value = path.split('.').reduce((current: unknown, key: string) => {
    if (!current || typeof current !== 'object') {
      throw new Error(`Invalid path: ${path}`);
    }

    const nextValue = (current as Record<string, unknown>)[key];
    if (nextValue === undefined) {
      throw new Error(`Translation not found for path: ${path}`);
    }

    return nextValue;
  }, obj as unknown);

  if (value === null || value === undefined) {
    throw new Error(`Translation value is null or undefined for path: ${path}`);
  }

  if (typeof value === 'object') {
    throw new Error(
      `Translation value is an object for path: ${path}. Expected a string value.`
    );
  }

  return String(value);
}
