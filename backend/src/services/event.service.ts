import { EventRepository } from '../repositories/event.repository';
import { Event } from '../models/event';

export class EventService {
    private readonly eventRepository: EventRepository;

    constructor(eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    async getAllEvents(userId: number): Promise<Event[]> {
        return await this.eventRepository.getAllEvents(userId);
    }

    async getUserRegisteredEvents(userId: number): Promise<Event[]> {
        return await this.eventRepository.getUserRegisteredEvents(userId);
    }

    async registerUserForEvent(userId: number, event: Event): Promise<void> {
        const registeredEvents = await this.eventRepository.getUserRegisteredEvents(userId);
        if (registeredEvents.length >= 3) {
            throw { status: 400, message: 'You can only register for 3 events' };
        }
        const hasConflict = await this.eventRepository.checkUserEventConflict(
            userId,
            event.startTime,
            event.endTime
        );
        if (hasConflict) {
            throw { status: 400, message: 'This event conflicts with another event you are registered for.' };
        }
        await this.eventRepository.registerEvent(userId, event.id);
    }

    async unregisterUserFromEvent(userId: number, eventId: number): Promise<void> {
        await this.eventRepository.unregisterEvent(userId, eventId);
    }

    async createEvent(event: Event): Promise<void> {
        if (!event.eventName || !event.eventCategory || !event.startTime || !event.endTime) {
            throw { status: 400, message: 'Mandatory fields missing!' };
        }

        await this.eventRepository.createEvent(event);
    }
}
