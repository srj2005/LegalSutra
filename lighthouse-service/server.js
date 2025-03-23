import express from "express";
import cors from "cors";
import lighthouseRoutes from "./src/routes/lighthouseRoutes.js"; // Fixed path
import dotenv from "dotenv";
const app = express();

app.use(cors()); // Enable CORS if needed
app.use(express.json()); // Ensure JSON parsing is enabled

// ✅ Ensure the router is prefixed with "/lighthouse"
app.use("/lighthouse", lighthouseRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));