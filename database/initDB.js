
const {faker} = require("@faker-js/faker");
require("dotenv").config();
const getPool = require("./getDB");

const initDB = async () => {
  try {
    const pool = getPool();

    console.log("Creating Database...");
    await pool.query("DROP DATABASE IF EXISTS app");
    await pool.query("CREATE DATABASE app");
    await pool.query("USE app");

    console.log("Deleting tables...");
    await pool.query("DROP TABLE IF EXISTS publications;");
    await pool.query("DROP TABLE IF EXISTS users;");

    console.log("Creating users table...");
    await pool.query(`CREATE TABLE users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        name VARCHAR(100),
        role VARCHAR(10) NOT NULL,
        registrationCode VARCHAR(100),
        image LONGBLOB
      );`);

    console.log("Creating publications table...");
    await pool.query(`CREATE TABLE publications (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        date datetime default now(),
        user_id INT UNSIGNED,
        category VARCHAR(20),
        title VARCHAR(100) NOT NULL,
        description VARCHAR(100) NOT NULL,
        image LONGBLOB,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

  

    console.log("¡All done!");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

initDB();

