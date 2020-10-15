require('dotenv').config();
const Pool = require('pg').Pool;

const devConfig = {
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(
    process.env.NODE_ENV === 'production' ? prodConfig : devConfig
);

module.exports = pool;
