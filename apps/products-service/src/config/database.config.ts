// config/database.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10), // <-- 'port' သို့ ပြင်ဆင်ပြီး DATABASE_PORT ကို သုံးပါ
  username: process.env.DATABASE_USER || 'nickey',
  password: process.env.DATABASE_PASSWORD || '166495',
  database: process.env.DATABASE_NAME || 'app_db_nest',
}));
