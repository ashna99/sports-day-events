import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import Home from '../pages/Home';
import EventsService from '../services/events';
import { Event } from '../types';

jest.mock('../services/events', () => ({
  getAllEvents: jest.fn(),
  registerForEvent: jest.fn(),
  unregisterForEvent: jest.fn()
}));

window.alert = jest.fn();

const mockEvents: Event[] = [
    { id: '1', eventName: 'Soccer', eventCategory: 'Sports', startTime: '2024-11-05T10:00:00', endTime: '2024-11-05T12:00:00', registered: false },
    { id: '2', eventName: 'Basketball', eventCategory: 'Sports', startTime: '2024-11-05T11:00:00', endTime: '2024-11-05T13:00:00', registered: false },
];

describe('Home Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state', () => {
        (EventsService.getAllEvents as jest.Mock).mockImplementation(() => new Promise(() => {})); 
        render(<Home />);

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
    it('fetches and displays all event cards', async () => {
        (EventsService.getAllEvents as jest.Mock).mockResolvedValue(mockEvents);
    
        render(<Home />);
    
        await waitFor(() => {
            const eventCards = screen.queryAllByTestId('event-card');
            expect(eventCards.length).toBe(mockEvents.length);
        });
    });
    

    it('increases registered events count on register', async () => {
        (EventsService.getAllEvents as jest.Mock)
            .mockResolvedValueOnce(mockEvents) 
            .mockResolvedValueOnce([{ ...mockEvents[0], registered: true }, mockEvents[1]]);
    
        render(<Home />);
    
        await waitFor(() => {
            const eventCards = screen.getAllByTestId('event-card');
            expect(eventCards.length).toBe(mockEvents.length);
        });
    
        (EventsService.registerForEvent as jest.Mock).mockResolvedValue(undefined);
    
        const registerButtons = within(screen.getByTestId('event-list')).getAllByTestId('event-card-button');
        fireEvent.click(registerButtons[0]);
    
        await waitFor(() => {
            const eventCards = screen.getAllByTestId('event-card');
            expect(eventCards.length).toBe(mockEvents.length);
        });
        await waitFor(() => {
            const registeredEventCards = within(screen.getByTestId('registered-events')).getAllByTestId('event-card');
            expect(registeredEventCards.length).toBe(1);
        });
    });
    
    it('decreases registered events count on unregister', async () => {
        (EventsService.getAllEvents as jest.Mock)
            .mockResolvedValueOnce([{ ...mockEvents[0], registered: true }, mockEvents[1]])
            .mockResolvedValueOnce(mockEvents) 
    
        render(<Home />);
  
        await waitFor(() => {
            const eventCards = screen.getAllByTestId('event-card');
            expect(eventCards.length).toBe(mockEvents.length);
        });
        
        await waitFor(() => {
            const registeredEventCards = within(screen.getByTestId('registered-events')).getAllByTestId('event-card');
            expect(registeredEventCards.length).toBe(1);
        });
    
        (EventsService.unregisterForEvent as jest.Mock).mockResolvedValue(undefined);

        const unregisterButtons = within(screen.getByTestId('registered-events')).getAllByTestId('event-card-button');
        fireEvent.click(unregisterButtons[0]);

        await waitFor(() => {
            const eventCards = screen.getAllByTestId('event-card');
            expect(eventCards.length).toBe(mockEvents.length);
        });


        const registeredEventCards = within(screen.getByTestId('registered-events')).getAllByTestId('event-card');
        expect(registeredEventCards.length).toBe(1);
    });
    

  it('shows alert when fetching events fails', async () => {
    (EventsService.getAllEvents as jest.Mock).mockRejectedValue(new Error('Failed to fetch events'));
    
    render(<Home />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to fetch events');
    });
    
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();

    expect(screen.getByText(/Welcome to the Event Manager/i)).toBeInTheDocument();
});

it('shows alert when registration fails', async () => {
    (EventsService.getAllEvents as jest.Mock)
        .mockResolvedValueOnce(mockEvents)
        .mockResolvedValueOnce(mockEvents);

    render(<Home />);

    await waitFor(() => {
        const eventCards = screen.getAllByTestId('event-card');
        expect(eventCards.length).toBe(mockEvents.length);
    });

    (EventsService.registerForEvent as jest.Mock).mockRejectedValue(new Error('Failed to register user for event'));

    const registerButtons = within(screen.getByTestId('event-list')).getAllByTestId('event-card-button');
    fireEvent.click(registerButtons[0]);

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to register user for event');
    });
});

it('shows alert when unregistration fails', async () => {
    (EventsService.getAllEvents as jest.Mock)
        .mockResolvedValueOnce([{ ...mockEvents[0], registered: true }, mockEvents[1]])
        .mockResolvedValueOnce([{ ...mockEvents[0], registered: true }, mockEvents[1]]);

    render(<Home />);

    await waitFor(() => {
        const eventCards = screen.getAllByTestId('event-card');
        expect(eventCards.length).toBe(mockEvents.length);
    });

    await waitFor(() => {
        const registeredEventCards = within(screen.getByTestId('registered-events')).getAllByTestId('event-card');
        expect(registeredEventCards.length).toBe(1);
    });

    (EventsService.unregisterForEvent as jest.Mock).mockRejectedValue(new Error('Failed to unregister user for event'));

    const unregisterButtons = within(screen.getByTestId('registered-events')).getAllByTestId('event-card-button');
    fireEvent.click(unregisterButtons[0]);

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Failed to unregister user for event');
    });
});

    
});