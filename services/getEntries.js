const getPool = require("../database/getDB")

const pool = getPool();


const getEntries = async ()=>{

    const [entries] = await  pool.query(`select * from publications`)

    return entries;

}

module.exports = getEntries;