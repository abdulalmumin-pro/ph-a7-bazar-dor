import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// MongoDB client instance
const client = new MongoClient(process.env.BETTER_AUTH_DB as string);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000", 
  secret: process.env.BETTER_AUTH_SECRET, 
});