import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./express";
import logger from "./utils/logger";

dotenv.config();
const PORT = process.env.PORT || 4000;

mongoose.set("strictQuery", true);

const DB_CONNECTION_STRING =
  process.env.MONGO_URI || "mongodb://localhost:27017/fiverrclone";

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("Connect to database");
  } catch (e: any) {
    logger.error(e, "Failed to connect to database. Goodbye");
    process.exit(1);
  }
}

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at http://localhost:${PORT}`);
});
