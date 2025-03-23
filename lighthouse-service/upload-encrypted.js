import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import kavach from "@lighthouse-web3/kavach";
import dotenv from "dotenv";

dotenv.config({ path: "./lighthouse-service/.env" });

// 🔐 Generate JWT for Authentication
const signAuthMessage = async (privateKey) => {
  try {
    const signer = new ethers.Wallet(privateKey);
    const authMessage = await kavach.getAuthMessage(signer.address);
    const signedMessage = await signer.signMessage(authMessage.message);
    const { JWT, error } = await kavach.getJWT(signer.address, signedMessage);

    
    if (error) {
      throw new Error("Failed to generate JWT");
    }

    return JWT;
  } catch (error) {
    console.error("Error in signAuthMessage:", error);
    throw error;
  }
};

// 📤 Upload Encrypted File
export const uploadEncrypted = async (filePath, publicKey, privateKey) => {
  try {
    const apiKey = process.env.LIGHTHOUSE_API_KEY;
    if (!apiKey) {
      throw new Error("Missing Lighthouse API Key in .env file.");
    }

    // ✅ Authenticate with JWT
    const signedMessage = await signAuthMessage(privateKey);

    // ✅ Upload File
    const response = await lighthouse.uploadEncrypted(filePath, apiKey, publicKey, signedMessage);

    if (!response || !response.data) {
      throw new Error("File upload failed.");
    }

    return response.data[0]; // Returning uploaded file details
  } catch (error) {
    console.error("Error in uploadEncrypted:", error);
    throw error;
  }
};
