import { ethers } from "ethers";

/**
 * Generates a new Ethereum wallet
 * @returns {object} - Wallet containing address and private key
 */
export const generateWallet = () => {
  try {
    const wallet = ethers.Wallet.createRandom();

    if (!wallet.address || !wallet.privateKey) {
      throw new Error("Generated wallet is invalid");
    }

    return {
      publicKey: wallet.address,   // Store this in database
      privateKey: wallet.privateKey // DO NOT STORE THIS IN DATABASE
    };
  } catch (error) {
    console.error("❌ Error generating wallet:", error);
    return null;
  }
};
