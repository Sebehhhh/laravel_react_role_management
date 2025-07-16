import api from './api';
import { Permission } from './auth';

export interface CreatePermissionData {
  name: string;
}

export interface UpdatePermissionData {
  name: string;
}

export const permissionService = {
  async getPermissions(page: number = 1): Promise<any> {
    const response = await api.get(`/permissions?page=${page}`);
    return response.data;
  },

  async getPermission(id: number): Promise<Permission> {
    const response = await api.get(`/permissions/${id}`);
    return response.data;
  },

  async createPermission(data: CreatePermissionData): Promise<Permission> {
    const response = await api.post('/permissions', data);
    return response.data;
  },

  async updatePermission(id: number, data: UpdatePermissionData): Promise<Permission> {
    const response = await api.put(`/permissions/${id}`, data);
    return response.data;
  },

  async deletePermission(id: number): Promise<void> {
    await api.delete(`/permissions/${id}`);
  },
};