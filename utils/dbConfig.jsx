import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from  './schema'
const sql = neon('postgresql://neondb_owner:npg_gsZIoPrcYy42@ep-falling-lab-anw2p0km-pooler.c-6.us-east-1.aws.neon.tech/Expense-tracker?sslmode=require&channel_binding=require');
 export const db = drizzle({ client: sql,schema }); 