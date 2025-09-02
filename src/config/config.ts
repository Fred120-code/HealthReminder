export const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/healthreminder",
  jwtSecret: process.env.JWT_SECRET || "secret",
  aiApiKey: process.env.AI_API_KEY || "",
};