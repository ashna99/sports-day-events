import AxiosService from './axios';

class LoginService extends AxiosService {
    constructor() {
        super('http://localhost:8080/api'); 
    }

    async login(username: string, password: string) {
        return this.post<{ token: string }>('/auth/login', { username, password }); // Adjust the endpoint as needed
    }
}

export default new LoginService();
