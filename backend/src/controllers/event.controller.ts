import { Request, Response, NextFunction } from 'express';
import { EventService } from '../services/event.service';
import { Event } from '../models/event';

interface AuthenticatedRequest extends Request {
    user?: { id: number };
}

export class EventController {
    private readonly eventService: EventService;

    constructor(eventService: EventService) {
        this.eventService = eventService;
    }

    async getAllEvents(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'User not authenticated' });
            }
            const events = await this.eventService.getAllEvents(userId);
            res.json(events);
        } catch (error) {
            next(error);
        }
    }

    async registerUserForEvent(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const userId = req.user?.id;
        const event: Event = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        try {
            await this.eventService.registerUserForEvent(userId, event);
            res.status(201).json({ message: 'Registered successfully' });
        } catch (error) {
            next(error);
        }
    }

    async unregisterUserFromEvent(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const userId = req.user?.id;
        const eventId = Number(req.params.eventId);

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        try {
            await this.eventService.unregisterUserFromEvent(userId, eventId);
            res.json({ message: 'Unregistered successfully' });
        } catch (error) {
            next(error);
        }
    }

    async createEvent(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const event: Event = req.body;

        try {
            await this.eventService.createEvent(event);
            res.status(201).json({ message: 'Event created successfully' });
        } catch (error) {
            next(error);
        }
    }

    async getUserRegisteredEvents(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        try {
            const registeredEvents = await this.eventService.getUserRegisteredEvents(userId);
            res.json(registeredEvents);
        } catch (error) {
            next(error);
        }
    }
}