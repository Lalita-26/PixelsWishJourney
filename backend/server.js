// backend/server.js
import express from "express";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API: ดึงภาพทั้งหมดในโฟลเดอร์ pixels_on_stage
app.get("/images/pixels_on_stage", async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression("folder:pixels_on_stage")
      .sort_by("created_at", "desc")
      .max_results(200)
      .execute();

    res.json(result.resources);
  } catch (error) {
    console.error("Cloudinary error:", error);
    res.status(500).json({ error: "Failed to load images" });
  }
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
