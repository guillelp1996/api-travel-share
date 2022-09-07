require('dotenv/config')
const mysql = require('mysql2/promise');



const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASS,
    DB_MAIN
} = process.env

let pool;

const getPool = ()=>{
    const poolConfig = {
        host: DB_HOST,
        port:DB_PORT,
        user:DB_USER,
        password:DB_PASS,
        database:DB_MAIN,
        timezone:"Z",
        connectionLimit:10,
    }
    pool = pool || mysql.createPool(poolConfig);
    return pool;
}

module.exports = getPool;