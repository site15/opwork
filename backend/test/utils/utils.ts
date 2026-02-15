import { createHashFromString } from '../../src/utils/create-hash-from-string';

export const getRandomSha7 = () =>
  createHashFromString(Date.now().toString()).slice(0, 7);
