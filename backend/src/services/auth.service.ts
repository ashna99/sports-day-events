import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import dotenv from 'dotenv';

dotenv.config();

export class AuthService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async register(username: string, password: string): Promise<void> {
        console.log("inside register");
        if (!username || !password) {
            throw new Error('Username and password are mandatory.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.createUser(username, hashedPassword);
    }

    async login(username: string, password: string): Promise<string> {
        if (!username || !password) {
            throw new Error('Username and password are mandatory.');
        }

        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }
        
        if (!(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid password');
        }
        
        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET ?? '', {
            expiresIn: '1h',
        });
        return token;
    }
}
