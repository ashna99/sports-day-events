import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4' 
});

export const checkDatabaseConnection = async () => {
    try {
        const [results]:any[] = await pool.query('SELECT DATABASE()');
        console.log("Connected to database:", results[0]['DATABASE()']);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        throw err;
    }
}

(async () => {
    try {
        await checkDatabaseConnection();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();


export default pool;
