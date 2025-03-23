import express from "express";
import { db } from "../../firebase-config.js";

const router = express.Router();

/**
 * Save public key to Firebase
 */
router.post("/save-public-key", async (req, res) => {
  try {
    const { userId, publicKey } = req.body;

    if (!userId || !publicKey) {
      return res.status(400).json({ error: "Missing userId or publicKey" });
    }

    await db.collection("users").doc(userId).set({ publicKey });

    res.json({ message: "Public key saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
