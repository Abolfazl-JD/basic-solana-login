const { PublicKey } = require('@solana/web3.js');

export const validateDestinationAddress = async (address: string) => {
  try {
    const userAddress = new PublicKey(address);
    const isValid = await PublicKey.isOnCurve(userAddress);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
