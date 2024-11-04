import React from 'react';
import { render, screen, within } from '@testing-library/react';
import EventList from '../pages/Home/EventList';
import { Event } from '../types';

const mockEvents: Event[] = [
    { id: '1', eventName: 'Soccer', eventCategory: 'Sports', startTime: '2024-11-05T10:00:00', endTime: '2024-11-05T12:00:00', registered: false },
    { id: '2', eventName: 'Basketball', eventCategory: 'Sports', startTime: '2024-11-05T11:00:00', endTime: '2024-11-05T13:00:00', registered: false },
    { id: '3', eventName: 'Swimming', eventCategory: 'Sports', startTime: '2024-11-05T14:00:00', endTime: '2024-11-05T15:00:00', registered: false },
];

const mockRegisteredEvents: Event[] = [
    { id: '1', eventName: 'Soccer', eventCategory: 'Sports', startTime: '2024-11-05T10:00:00', endTime: '2024-11-05T12:00:00', registered: true },
];

describe('EventList Component', () => {
    it('displays conflict message for events with timing conflicts', () => {
        render(<EventList events={mockEvents} registeredEvents={mockRegisteredEvents} onRegister={() => {}} />);

        const conflictNotes = screen.getAllByTestId('conflict-note');
        expect(conflictNotes.length).toBeGreaterThan(0);
    });

    it('disables only the buttons for events that have a timing conflict with registered events', () => {
        render(<EventList events={mockEvents} registeredEvents={mockRegisteredEvents} onRegister={() => {}} />);
        const eventCards = screen.getAllByTestId('event-card');
    
        const disabledEventCards = eventCards.filter((card) => {
          const conflictNote = within(card).queryByTestId('conflict-note');
          return conflictNote !== null;
        });
    
        const enabledEventCards = eventCards.filter((card) => {
          const conflictNote = within(card).queryByTestId('conflict-note');
          return conflictNote === null;
        });
    
        expect(disabledEventCards.length).toBeGreaterThan(0);
        expect(enabledEventCards.length).toBeGreaterThan(0);
    
        disabledEventCards.forEach((card) => {
          const eventCardButton = within(card).getByTestId('event-card-button');
          expect(eventCardButton).toBeDisabled();
        });
    
        enabledEventCards.forEach((card) => {
          const eventCardButton = within(card).getByTestId('event-card-button');
          expect(eventCardButton).toBeEnabled();
        });
      });
});
