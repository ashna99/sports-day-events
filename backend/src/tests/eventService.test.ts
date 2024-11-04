import { EventService } from '../services/event.service';
import { EventRepository } from '../repositories/event.repository';
import { Event, EventResponse } from '../models/event';

const mockEventRepository = {
    getAllEvents: jest.fn(),
    getUserRegisteredEvents: jest.fn(),
    registerEvent: jest.fn(),
    unregisterEvent: jest.fn(),
    createEvent: jest.fn(),
    checkUserEventConflict: jest.fn(),
} as jest.Mocked<EventRepository>;

const eventService = new EventService(mockEventRepository);

describe('EventService', () => {
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should get all events for a user', async () => {
        const mockEvents: EventResponse[] = [
            { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01', registered: false },
            { id: 2, eventName: 'Event 2', eventCategory: 'Category 2', startTime: '2024-02-01', endTime: '2024-02-01', registered:true },
        ];
        mockEventRepository.getAllEvents.mockResolvedValue(mockEvents);

        const result = await eventService.getAllEvents(1);
        expect(result).toEqual(mockEvents);
        expect(mockEventRepository.getAllEvents).toHaveBeenCalledWith(1);
    });

    it('should get registered events for a user', async () => {
        const mockRegisteredEvents: Event[] = [
            { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' },
        ];
        mockEventRepository.getUserRegisteredEvents.mockResolvedValue(mockRegisteredEvents);

        const result = await eventService.getUserRegisteredEvents(1);
        expect(result).toEqual(mockRegisteredEvents);
        expect(mockEventRepository.getUserRegisteredEvents).toHaveBeenCalledWith(1);
    });

    it('should register a user for an event if under the limit and no conflict', async () => {
        const mockEvent: Event = { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' };
        mockEventRepository.getUserRegisteredEvents.mockResolvedValue([]); 
        mockEventRepository.checkUserEventConflict.mockResolvedValue(false);

        await eventService.registerUserForEvent(1, mockEvent);
        expect(mockEventRepository.registerEvent).toHaveBeenCalledWith(1, mockEvent.id);
    });

    it('should throw an error if a user tries to register for more than 3 events', async () => {
        const mockEvent: Event = { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' };
        mockEventRepository.getUserRegisteredEvents.mockResolvedValue([
            { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' },
            { id: 2, eventName: 'Event 2', eventCategory: 'Category 2', startTime: '2024-02-01', endTime: '2024-02-01' },
            { id: 3, eventName: 'Event 3', eventCategory: 'Category 3', startTime: '2024-03-01', endTime: '2024-03-01' },
        ]); 

        await expect(eventService.registerUserForEvent(1, mockEvent)).rejects.toEqual({ status: 400, message: 'You can only register for 3 events' });
    });

    it('should throw an error if there is a scheduling conflict', async () => {
        const mockEvent: Event = { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' };
        mockEventRepository.getUserRegisteredEvents.mockResolvedValue([]); 
        mockEventRepository.checkUserEventConflict.mockResolvedValue(true); 

        await expect(eventService.registerUserForEvent(1, mockEvent)).rejects.toEqual({ status: 400, message: 'This event conflicts with another event you are registered for.' });
    });

    it('should unregister a user from an event', async () => {
        await eventService.unregisterUserFromEvent(1, 1);
        expect(mockEventRepository.unregisterEvent).toHaveBeenCalledWith(1, 1);
    });

    it('should create an event if all required fields are provided', async () => {
        const mockEvent: Event = { id: 1, eventName: 'Event 1', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' };

        await eventService.createEvent(mockEvent);
        expect(mockEventRepository.createEvent).toHaveBeenCalledWith(mockEvent);
    });

    it('should throw an error if mandatory fields are missing when creating an event', async () => {
        const mockEvent: Event = { id: 1, eventName: '', eventCategory: 'Category 1', startTime: '2024-01-01', endTime: '2024-01-01' };

        await expect(eventService.createEvent(mockEvent)).rejects.toEqual({ status: 400, message: 'Mandatory fields missing!' });
    });
});
