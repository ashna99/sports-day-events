import React, { useState, useEffect, useCallback } from 'react';
import EventList from './EventList';
import RegisteredEvents from './RegisteredEvents';
import { Event } from '../../types';
import './Home.css';
import EventsService from '../../services/events';
import { CircularProgress } from '@mui/material';

const Home: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const fetchEvents = useCallback(async () => {
        try {
            setLoading(true);
            const eventsData = await EventsService.getAllEvents();
            setEvents(eventsData);
        } catch (err) {
            alert('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleRegister = async (eventToRegister: Event) => {
        try {
            setLoading(true);
            await EventsService.registerForEvent(eventToRegister);
            await fetchEvents();
        } catch (error) {
            alert('Failed to register user for event');
        } finally {
            setLoading(false);
        }
    };

    const handleUnregister = async (eventToUnregister: Event) => {
        try {
            setLoading(true);
            await EventsService.unregisterForEvent(eventToUnregister?.id ?? '');
            await fetchEvents();
        } catch (error) {
            alert('Failed to unregister user for event');
        } finally {
            setLoading(false);
        }
    };

    const availableEvents = events.filter((event) => !event.registered);
    const registeredEvents = events.filter((event) => event.registered);

    return (
        <div className="home-page">
            <h1>Welcome to the Event Manager</h1>
            <div className="alert alert-warning" style={{ marginBottom: '20px', fontWeight: 'bold', color: '#d9534f' }}>
                Note: You can only register for a maximum of 3 events.
            </div>
            <div className="event-container">
                <EventList events={availableEvents} onRegister={handleRegister} registeredEvents={registeredEvents} />
                <RegisteredEvents events={registeredEvents} onUnregister={handleUnregister} />
            </div>

            {loading && (
                <div className="loading-overlay">
                    <CircularProgress size="3rem" />
                </div>
            )}
        </div>
    );
};

export default Home;
