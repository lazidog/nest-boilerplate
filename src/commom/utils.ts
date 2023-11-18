import bcrypt from 'bcrypt';

/**
 * hash string
 * @param {string} text
 * @returns {string}
 */
export function generateHash(text: string): string {
  return bcrypt.hashSync(text, 10);
}

/**
 * validate hash
 * @param {string} text
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  text: string | undefined,
  hash: string | undefined | null,
): Promise<boolean> {
  if (!text || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(text, hash);
}
