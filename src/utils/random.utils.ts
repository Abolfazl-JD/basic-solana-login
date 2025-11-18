const ALPHA_NUMERIC_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const crypto = require('crypto');

export function generateRandomId(targetLength: number) {
  let randomId = '';
  while (randomId.length < targetLength)
    randomId += ALPHA_NUMERIC_CHARS.charAt(
      Math.floor(Math.random() * ALPHA_NUMERIC_CHARS.length),
    );
  return randomId;
}

export function generateRandomNumber(length) {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
  );
}

export function generateRandomNumberOptional(min, max, decimal) {
  const randomNumber = Math.random() * (max - min) + min;
  return parseFloat(randomNumber.toFixed(decimal));
}

export function uuidToFiveDigitNumber(uuid) {
  // Create a SHA-256 hash from the UUID
  const hash = crypto.createHash('sha256');
  hash.update(uuid);
  const hashedOutput = hash.digest('hex');

  // Convert the first part of the hash to a large integer
  const bigInt = parseInt(hashedOutput.substr(0, 12), 16);

  // Use modulus to reduce it to a 5-digit number
  let fiveDigitNumber = bigInt % 100000;

  // Adjust the number to make sure it's always five digits
  if (fiveDigitNumber < 10000) {
    fiveDigitNumber += 10000;
  }

  return fiveDigitNumber;
}

export function generateRandomNounce(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
