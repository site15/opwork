import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  const hashed = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hashed}`; // Сохраняем соль вместе с хэшем
};

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  const buffer = scryptSync(password, salt, 64);
  return timingSafeEqual(buffer, Buffer.from(hash, 'hex'));
}
