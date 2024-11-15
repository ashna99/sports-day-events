import { RowDataPacket, ResultSetHeader } from 'mysql2';
import pool from '../db/db';
import { Event, EventResponse } from '../models/event';

export class EventRepository {
    async getAllEvents(userId: number): Promise<EventResponse[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT e.id, e.event_name AS eventName, e.event_category AS eventCategory,
                    e.start_time AS startTime, e.end_time AS endTime,
                    e.created_on AS createdOn, e.modified_on AS modifiedOn,
                    ue.created_on AS registrationDate,
                    (ue.user_id IS NOT NULL) AS registered
             FROM events e
             LEFT JOIN user_events ue ON e.id = ue.event_id AND ue.user_id = ?`,
            [userId]
        );
    
        return rows as EventResponse[];
    }
    

    async getUserRegisteredEvents(userId: number): Promise<Event[]> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT e.id, e.event_name AS eventName, e.event_category AS eventCategory,
                    e.start_time AS startTime, e.end_time AS endTime,
                    ue.created_on AS createdOn
             FROM user_events ue 
             JOIN events e ON ue.event_id = e.id
             WHERE ue.user_id = ?`,
            [userId]
        );
        return rows as Event[];
    }
    

    async createEvent(event: Event): Promise<number> {
        const { eventName, eventCategory, startTime, endTime } = event;
        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO events (event_name, event_category, start_time, end_time, created_on, modified_on) 
             VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [eventName, eventCategory, startTime, endTime]
        );
        return result.insertId;
    }

    async updateEvent(event: Event): Promise<void> {
        const { id, eventName, eventCategory, startTime, endTime } = event;
        await pool.query<ResultSetHeader>(
            `UPDATE events 
             SET event_name = ?, event_category = ?, start_time = ?, end_time = ?, modified_on = NOW() 
             WHERE id = ?`,
            [eventName, eventCategory, startTime, endTime, id]
        );
    }

    async registerEvent(userId: number, eventId: number): Promise<void> {
        await pool.query<ResultSetHeader>(
            'INSERT INTO user_events (user_id, event_id) VALUES (?, ?)',
            [userId, eventId]
        );
    }

    async unregisterEvent(userId: number, eventId: number): Promise<void> {
        await pool.query<ResultSetHeader>(
            'DELETE FROM user_events WHERE user_id = ? AND event_id = ?',
            [userId, eventId]
        );
    }

    async checkUserEventConflict(userId: number, eventStartTime: string, eventEndTime: string): Promise<boolean> {
        const [rows] = await pool.query<RowDataPacket[]>(
            `SELECT * FROM user_events ue 
             JOIN events e ON ue.event_id = e.id 
             WHERE ue.user_id = ? 
               AND (? < e.end_time AND ? > e.start_time) 
             LIMIT 1`,
            [userId, eventEndTime, eventStartTime]
        );
        return rows.length > 0;
    }
}
