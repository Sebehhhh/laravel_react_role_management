import api from './api';
import { Role } from './auth';

export interface CreateRoleData {
  name: string;
  permissions?: string[];
}

export interface UpdateRoleData {
  name?: string;
  permissions?: string[];
}

export const roleService = {
  async getRoles(page: number = 1): Promise<any> {
    const response = await api.get(`/roles?page=${page}`);
    return response.data;
  },

  async getRole(id: number): Promise<Role> {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  },

  async createRole(data: CreateRoleData): Promise<Role> {
    const response = await api.post('/roles', data);
    return response.data;
  },

  async updateRole(id: number, data: UpdateRoleData): Promise<Role> {
    const response = await api.put(`/roles/${id}`, data);
    return response.data;
  },

  async deleteRole(id: number): Promise<void> {
    await api.delete(`/roles/${id}`);
  },
};