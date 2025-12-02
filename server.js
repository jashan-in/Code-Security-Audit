// Import required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "server/routes/weatherRoutes";

// Load environment variables from .env file
dotenv.config();

// Create express app instance
const app = express();

// Enable CORS, frontend JS can call the API
app.use(cors());

// Allow JSON request bodies
app.use(express.json());

// Mount weather routes under /api/weather
app.use("/api/weather", weatherRoutes);

// Serve static files from the public folder
app.use(express.static("public"));

// setting port to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
