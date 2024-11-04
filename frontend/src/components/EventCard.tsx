import React from 'react';
import { Event } from '../types';
import './EventCard.css';
import formatDateTime from '../utils';

interface EventCardProps {
    event: Event;
    onClick: (event: Event) => void;
    disabled?: boolean;
    note?: string;
}


const EventCard: React.FC<EventCardProps> = ({ event, onClick, disabled = false, note }) => {
    return (
        <div className="event-card" data-testid="event-card">
            <h3>{event.eventName}</h3>
            <p>Category: {event.eventCategory}</p>
            <p>
                {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
            </p>
            {note && (
                <p 
                    className="event-note" 
                    style={{ color: '#d9534f', fontWeight: 'bold', fontSize: '0.7rem' }} 
                    data-testid="conflict-note"
                >
                    {note}
                </p>
            )}
            <button 
                className="btn-primary" 
                onClick={() => onClick(event)} 
                disabled={disabled} 
                data-testid="event-card-button"
            >
                {event.registered ? 'Unregister' : 'Register'}
            </button>
        </div>
    );
};

export default EventCard;
