import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT;

console.log(PORT);

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bots access denied" });
      } else {
        res.status(403).json({ error: "else erroru" });
      }
      return;
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed Bot detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet Error", error);
    next(error);
  }
});
app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    console.log("Database is initialized successfully");
  } catch (error) {
    console.log("Error while initiation", error);
  }
}

initDB().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port " + PORT);
  });
});
