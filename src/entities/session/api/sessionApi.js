// src/entities/session/api/sessionApi.js
import axios from 'axios';

export const BASE_URL = 'https://your-api-url.com'; // Replace with your actual API URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sessionApi = {
  // Login function
  async login({ email, password }) {
    const response = await axiosInstance.post('/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    return { token };
  },

  // Registration function
  async register({ email, password }) {
    const response = await axiosInstance.post('/register', { email, password });
    return response.data;
  },

  // Password Recovery
  async forgotPassword(email) {
    const response = await axiosInstance.post('/forgot-password', { email });
    return response.data;
  },

  // Check authentication status
  async check() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Unauthorized');
    return true;
  },

  // Logout function
  async logout() {
    localStorage.removeItem('token');
  },
  async forgotPassword(email) {
    try {
      await axiosInstance.post('/forgot-password', { email });
    } catch (error) {
      throw new Error('Failed to send password reset link');
    }
}, 
};
