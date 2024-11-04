import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserRepository } from '../repositories/user.repository';

const authService = new AuthService(new UserRepository());

export class AuthController {
    static async registerOrLogin(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are mandatory.' });
        }

        try {
            const token = await authService.login(username, password);
            return res.json({ token });
        } catch (error: any) {
            if (error.message === 'User not found') {
                await authService.register(username, password);
                const token = await authService.login(username, password); 
                return res.status(201).json({ token });
            }
            return res.status(400).json({ message: error.message });
        }
    }
}
