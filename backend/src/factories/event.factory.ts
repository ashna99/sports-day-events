import { EventRepository } from '../repositories/event.repository';
import { EventService } from '../services/event.service';

export class EventFactory {
    static createEventService(): EventService {
        const eventRepository = new EventRepository();
        return new EventService(eventRepository);
    }
}
