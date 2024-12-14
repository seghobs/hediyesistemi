import axios from 'axios';
import { User } from '@/types/user';

const API_URL = 'http://localhost:3001/api';

export const api = {
  fetchUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  addUsers: async (users: string[]): Promise<User[]> => {
    const response = await axios.post(`${API_URL}/users`, { users });
    return response.data;
  },

  giveGift: async (userId: string): Promise<void> => {
    await axios.post(`${API_URL}/users/${userId}/gift`);
  },

  removeGift: async (userId: string): Promise<void> => {
    await axios.delete(`${API_URL}/users/${userId}/gift`);
  },

  deleteUser: async (userId: string): Promise<void> => {
    await axios.delete(`${API_URL}/users/${userId}`);
  }
};