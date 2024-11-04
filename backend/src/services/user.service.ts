import pool from '../db/db';
import { User } from '../models/user';

export const createUser = async (name: string, userId: string) => {
    const [rows] = await pool.query('INSERT INTO users (name, userId) VALUES (?, ?)', [name, userId]);
    return rows;
};

export const getUserByUserId = async (userId: string): Promise<User | null> => {
    const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
    const user = (rows  as User[]).length > 0 ? (rows  as User[])[0] as User : null;
    return user || null;
};
