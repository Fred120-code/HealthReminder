import express from "express";
import type { Request, Response } from "express";
import { config } from "./config/config";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "HealthReminder Pro Backend" });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});