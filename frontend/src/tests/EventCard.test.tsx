import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventCard from '../components/EventCard';
import { Event } from '../types';
import formatDateTime from '../utils';

const mockEvent: Event = {
    id: '1',
    eventName: 'Soccer',
    eventCategory: 'Sports',
    startTime: '2024-11-05T10:00:00',
    endTime: '2024-11-05T12:00:00',
    registered: false,
};

const mockOnClick = jest.fn();

describe('EventCard Component', () => {
    it('renders event details correctly', async () => {
        render(<EventCard event={mockEvent} onClick={mockOnClick} />);
        const categoryText = `Category: ${mockEvent.eventCategory}`;
        const startTimeText = formatDateTime(mockEvent.startTime);
        const endTimeText = formatDateTime(mockEvent.endTime);
        await waitFor(() => {
            expect(screen.getByText(mockEvent.eventName)).toBeInTheDocument();
        });
        expect(screen.getByText(`${startTimeText} - ${endTimeText}`)).toBeInTheDocument();
        expect(screen.getByText(categoryText)).toBeInTheDocument();
    });

    it('displays a conflict note when provided', () => {
        const note = "This event conflicts with your already registered events";
        render(<EventCard event={mockEvent} onClick={mockOnClick} note={note} />);

        expect(screen.getByTestId('conflict-note')).toHaveTextContent(note);
        expect(screen.getByTestId('conflict-note')).toBeInTheDocument();
    });

    it('calls onClick handler when the button is clicked', () => {
        render(<EventCard event={mockEvent} onClick={mockOnClick} />);

        fireEvent.click(screen.getByTestId('event-card-button'));
        expect(mockOnClick).toHaveBeenCalledWith(mockEvent);
    });

    it('disables the button when disabled prop is true', () => {
        render(<EventCard event={mockEvent} onClick={mockOnClick} disabled />);

        const button = screen.getByTestId('event-card-button');
        expect(button).toBeDisabled();
    });

    it('renders "Unregister" when event is registered', () => {
        const registeredEvent: Event = { ...mockEvent, registered: true };
        render(<EventCard event={registeredEvent} onClick={mockOnClick} />);

        expect(screen.getByTestId('event-card-button')).toHaveTextContent('Unregister');
    });

    it('renders "Register" when event is not registered', () => {
        render(<EventCard event={mockEvent} onClick={mockOnClick} />);

        expect(screen.getByTestId('event-card-button')).toHaveTextContent('Register');
    });
});
