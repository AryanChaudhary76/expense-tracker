import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  out: "./drizzle",
   dbCredentials: {
    url:'postgresql://neondb_owner:npg_gsZIoPrcYy42@ep-falling-lab-anw2p0km-pooler.c-6.us-east-1.aws.neon.tech/Expense-tracker?sslmode=require&channel_binding=require',
  },
  

});
