import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../db/db';
import { User } from '../models/user';

export class UserRepository {
    async getUserByUsername(username: string): Promise<User | null> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT id, username, password, created_on AS createdOn, active 
             FROM users 
             WHERE username = ?`,
            [username]
        );
        return rows.length ? (rows[0] as User) : null;
    }

    async createUser(username: string, hashedPassword: string): Promise<void> {
        await pool.query<ResultSetHeader>(
            `INSERT INTO users (username, password, created_on, active) 
             VALUES (?, ?, NOW(), true)`,
            [username, hashedPassword]
        );
    }
}
