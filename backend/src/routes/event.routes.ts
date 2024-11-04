import { Router } from 'express';
import { EventFactory } from '../factories/event.factory';
import { EventController } from '../controllers/event.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const eventService = EventFactory.createEventService();
const eventController = new EventController(eventService);

router.get('/events', authenticateToken, eventController.getAllEvents.bind(eventController));
router.post('/events/register', authenticateToken, eventController.registerUserForEvent.bind(eventController));
router.delete('/events/unregister/:eventId', authenticateToken, eventController.unregisterUserFromEvent.bind(eventController));
router.post('/events', authenticateToken, eventController.createEvent.bind(eventController));
router.get('/registered-events', authenticateToken, eventController.getUserRegisteredEvents.bind(eventController));

export default router;