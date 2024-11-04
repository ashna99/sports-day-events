import React, { useCallback } from 'react';
import EventCard from '../../components/EventCard';
import { Event } from '../../types';

interface EventListProps {
    events: Event[];
    registeredEvents: Event[];
    onRegister: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, registeredEvents, onRegister }) => {
    const isEventConflicting = useCallback((event: Event): boolean => {
        return registeredEvents.some((registeredEvent) => {
            return (
                (event.startTime < registeredEvent.endTime && event.endTime > registeredEvent.startTime)
            );
        });
    },[registeredEvents]);

    const isMaxSelected = registeredEvents.length >= 3;

    return (
        <div className="event-list" data-testid="event-list"> 
            <h2>Available Events</h2>
            <div className="event-grid">
                {events.map((event) => {
                    const isConflicting = isEventConflicting(event);
                    const note = !event.registered && isConflicting && !isMaxSelected
                        ? 'This event conflicts with your already registered events.'
                        : undefined;

                    return (
                        <EventCard
                            key={event.id}
                            event={event}
                            onClick={onRegister}
                            disabled={!event.registered && (isMaxSelected || isConflicting)}
                            note={note} 
                        />
                    );
                })}
                 {
                    events.length === 0 ? <p> There are no upcoming events</p> 
                    :<></>
                }
            </div>
        </div>
    );
};

export default EventList;
