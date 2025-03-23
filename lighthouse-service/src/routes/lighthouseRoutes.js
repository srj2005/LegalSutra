import express from "express";
import { generateWallet } from "../utils/wallet.js";
import { db } from "../utils/firebase.js";
import { uploadEncrypted } from "../../upload-encrypted.js";
import { decryptFile } from "../../decrypt-file.js"; // ✅ Corrected Path
import dotenv from "dotenv";


dotenv.config();

const router = express.Router();

/**
 * ✅ Upload an encrypted file
 */
router.post("/upload-encrypted", async (req, res) => {
  try {
    const { documentTitle, cid, publicKey, signedMessage, apiKey } = req.body;

    if (!cid || !publicKey || !signedMessage || !apiKey) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 🔹 Verify Signature
    const authMessage = await kavach.getAuthMessage(publicKey);
    const verified = await kavach.verifyJWT(publicKey, signedMessage, authMessage.message);
    if (!verified) return res.status(401).json({ error: "Invalid signature" });

    // 🔹 Store file metadata in Firestore
    await db.collection("files").doc(cid).set({
      documentTitle,
      cid,
      publicKey,
      uploadedAt: new Date(),
    });

    res.json({ message: "File encrypted and uploaded successfully!", cid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * ✅ Retrieve & decrypt a file
 */
router.get("/retrieve-file/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { publicKey } = req.query;

    if (!publicKey) {
      return res.status(400).json({ error: "Public key is required." });
    }

    // ✅ Check if wallet exists in Firestore
    const walletRef = db.collection("wallets").doc(publicKey);
    const walletDoc = await walletRef.get();

    if (!walletDoc.exists) {
      return res.status(404).json({ error: "Wallet not found." });
    }

    // 🔐 Retrieve the correct private key securely
    const privateKey = walletDoc.data().privateKey;

    // ✅ Decrypt file
    const filePath = await decryptFile(cid, publicKey, privateKey);

    // ✅ Retrieve the original filename
    const fileMetadata = await db.collection("files").doc(cid).get();
    const originalFileName = fileMetadata.exists ? fileMetadata.data().originalFileName : `${cid}`;

    // 📤 Send the file as a response
    res.download(filePath, originalFileName, (err) => {
      if (err) {
        res.status(500).json({ error: "Error sending file", details: err.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/generate-wallet", (req, res) => {
  console.log("🔥 /generate-wallet route was hit!");
  
  try {
    const wallet = generateWallet();
    console.log("✅ Wallet Generated:", wallet);

    // Check if wallet object is valid
    if (!wallet || !wallet.publicKey || !wallet.privateKey) {
      throw new Error("Generated wallet is missing required fields");
    }

    res.json(wallet);
  } catch (error) {
    console.error("❌ Wallet Generation Error:", error);
    res.status(500).json({ error: "Failed to generate wallet" });
  }
});

export default router;
