export function generateRandomCode(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateReferralCode() {
  const number = Math.floor(1000000 + Math.random() * 9000000); // Generates a 9-digit number
  return `${number}`;
}

export function generateRandomTelegramID() {
  let prefix = '99999'; // Starting with five 9's
  let numberOfDigits = 9; // We need 9 more digits to make it 14 digits in total

  // Generate the remaining 9 digits
  let randomDigits = '';
  for (let i = 0; i < numberOfDigits; i++) {
    randomDigits += Math.floor(Math.random() * 10); // Generates a random integer between 0 to 9
  }

  // Combine the prefix and the random digits
  return prefix + randomDigits;
}
