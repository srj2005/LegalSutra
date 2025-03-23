import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "./lighthouse-service/.env" });

// 🔑 Sign Authentication Message
const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

// 🔓 Decrypt File
export const decryptFile = async (cid, publicKey, privateKey) => {
  try {
    if (!cid || !publicKey || !privateKey) {
      throw new Error("Missing required fields for decryption.");
    }

    // 🔑 Sign authentication message
    const signedMessage = await signAuthMessage(publicKey, privateKey);

    // 🔐 Fetch encryption key
    const fileEncryptionKey = await lighthouse.fetchEncryptionKey(cid, publicKey, signedMessage);

    if (!fileEncryptionKey.data || !fileEncryptionKey.data.key) {
      throw new Error("Failed to fetch encryption key.");
    }

    // 🔓 Decrypt the file
    const decrypted = await lighthouse.decryptFile(cid, fileEncryptionKey.data.key);

    // 📁 Save File Locally (optional)
    const filePath = `./downloads/${cid}.png`;
    fs.writeFileSync(filePath, Buffer.from(decrypted));

    return filePath; // Return file path for downloading
  } catch (error) {
    console.error("Error decrypting file:", error);
    throw error;
  }
};
