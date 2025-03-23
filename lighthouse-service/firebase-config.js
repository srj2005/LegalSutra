import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const serviceAccountPath = process.env.FIREBASE_CREDENTIALS;

if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
  throw new Error("❌ Firebase service account JSON file is missing or path is incorrect.");
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
