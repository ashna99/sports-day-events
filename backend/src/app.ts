import express, { Request, Response, NextFunction } from 'express';
import eventRoutes from './routes/event.routes';
import authRoutes from './routes/auth.routes';
import { authenticateToken } from './middlewares/auth.middleware';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};

app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api', authenticateToken, eventRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
});
app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
