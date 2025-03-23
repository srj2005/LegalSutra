import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import kavach from "@lighthouse-web3/kavach";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const signAuthMessage = async (privateKey) => {
  try {
    const signer = new ethers.Wallet(privateKey);
    const authMessage = await kavach.getAuthMessage(signer.address);
    const signedMessage = await signer.signMessage(authMessage.message);
    const { JWT, error } = await kavach.getJWT(signer.address, signedMessage);

    if (error) throw new Error(error);
    return JWT;
  } catch (err) {
    console.error("Error signing auth message:", err);
    return null;
  }
};

const uploadEncrypted = async () => {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const apiKey = process.env.API_KEY;
    const filePath = process.env.FILE_PATH;

    if (!privateKey || !apiKey || !filePath) {
      throw new Error("Missing environment variables. Check .env file.");
    }

    const signer = new ethers.Wallet(privateKey);
    const publicKey = signer.address; // Derive public key from private key.

    console.log(`🔹 Signing authentication message for: ${publicKey}`);
    const signedMessage = await signAuthMessage(privateKey);
    if (!signedMessage) throw new Error("Failed to sign authentication message.");

    console.log(`🔹 Uploading file: ${filePath}`);
    const response = await lighthouse.uploadEncrypted(filePath, apiKey, publicKey, signedMessage);
    
    console.log("✅ Upload successful:", response);
  } catch (err) {
    console.error("❌ File upload failed:", err);
  }
};

// Run the function
uploadEncrypted();
