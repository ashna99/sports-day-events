import React from 'react';
import EventCard from '../../components/EventCard';
import { Event } from '../../types';

interface RegisteredEventsProps {
    events: Event[];
    onUnregister: (event: Event) => void;
}

const RegisteredEvents: React.FC<RegisteredEventsProps> = ({ events, onUnregister }) => {
    return (
        <div className="registered-events" data-testid="registered-events">
            <h2>Registered Events</h2>
            <div className="event-grid">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} onClick={onUnregister} />
                ))}
                {
                    events.length === 0 ? <p> User has not registered for any events</p> 
                    :<></>
                }
            </div>
        </div>
    );
};

export default RegisteredEvents;
