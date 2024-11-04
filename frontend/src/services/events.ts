import BaseApi from './baseApi';
import {Event} from "../types/index"

class EventsService extends BaseApi {
    constructor() {
        super('http://localhost:8080/api'); 
    }

    public getAllEvents() {
        return this.get<Event[]>('/events');
    }

    public registerForEvent(event: Event) {
        return this.post(`/events/register`, event);
    }
    
    public unregisterForEvent(eventId: string) {
        return this.delete(`/events/unregister/${eventId}`)
    }

}

 const eventsService = new EventsService();
 export default eventsService;
