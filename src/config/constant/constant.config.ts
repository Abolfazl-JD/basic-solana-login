import * as dotenv from 'dotenv';
dotenv.config();
export const constant = {
  JWT_CONFIG: {
    USER_JWT_SECRET: process.env.USER_AUTH_JWT_SECRET,
    USER_JWT_EXPIRES_IN_HOURS: process.env.USER_AUTH_JWT_EXPIRES_IN_HOURS,
    ADMIN_JWT_SECRET: process.env.ADMIN_AUTH_JWT_SECRET,
    ADMIN_JWT_EXPIRES_IN_HOURS: process.env.ADMIN_AUTH_JWT_EXPIRES_IN_HOURS,
  },
  DATABASE_CONFIG: {
    DATABASE_NAME: process.env.DATABASE_NAME,
    MONGO_URL: process.env.DATABASE_URL,
  },
  BLOCKCHAIN: {
    DEFAULT_WALLET_ADDRESS: process.env.DEFAULT_WALLET_ADDRESS,
  },
};
