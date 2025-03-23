import { ethers } from "ethers";
import lighthouse from '@lighthouse-web3/sdk';
import kavach from "@lighthouse-web3/kavach";
import dotenv from "dotenv";

dotenv.config();

const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;

// 🔑 Sign authentication message for Lighthouse
const signAuthMessage = async (privateKey) => {
  try {
    const signer = new ethers.Wallet(privateKey);
    const authMessage = await kavach.getAuthMessage(signer.address);
    const signedMessage = await signer.signMessage(authMessage.message);
    const { JWT } = await kavach.getJWT(signer.address, signedMessage);
    return JWT;
  } catch (error) {
    console.error("Error signing authentication message:", error);
    throw error;
  }
};

// 🔐 Upload Encrypted File
export const uploadEncryptedFile = async (req, res) => {
  try {
    const { filePath, publicKey, privateKey } = req.body;

    if (!filePath || !publicKey || !privateKey) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const signedMessage = await signAuthMessage(privateKey);
    const response = await lighthouse.uploadEncrypted(filePath, LIGHTHOUSE_API_KEY, publicKey, signedMessage);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "File upload failed", details: error.message });
  }
};

// 🔑 Generate Ethereum Wallet
export const createWallet = async (req, res) => {
  try {
    const wallet = ethers.Wallet.createRandom();
    res.json({
      publicKey: wallet.address,
      privateKey: wallet.privateKey
    });
  } catch (error) {
    res.status(500).json({ error: "Wallet creation failed", details: error.message });
  }
};
// 🔓 Decrypt File
export const decryptFile = async (req, res) => {
  try {
    const { cid, publicKey, privateKey } = req.body;

    if (!cid || !publicKey || !privateKey) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 🔑 Authenticate using Lighthouse
    const signedMessage = await signAuthMessage(privateKey);

    // 🔓 Decrypt file from Lighthouse
    const response = await lighthouse.decryptFile(cid, LIGHTHOUSE_API_KEY, signedMessage);

    res.json({
      message: "File decrypted successfully!",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ error: "File decryption failed", details: error.message });
  }
};

    