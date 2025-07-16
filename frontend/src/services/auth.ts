import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
}

export interface Role {
  id: number;
  name: string;
  permissions?: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const authService = {
  async login(data: LoginData): Promise<{ token: string; user: User }> {
    const response = await api.post('/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<{ token: string; user: User }> {
    const response = await api.post('/register', data);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  async getUser(): Promise<User> {
    const response = await api.get('/user');
    return response.data;
  },

  async getDashboard(): Promise<any> {
    const response = await api.get('/dashboard');
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/profile');
    return response.data;
  },
};