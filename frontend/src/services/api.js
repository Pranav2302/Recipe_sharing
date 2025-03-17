import axios from 'axios';
import { getValidToken, clearAuthData } from '../utils/authUtils';

const API_URL = 'http://localhost:3500/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getValidToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle 401 errors (expired tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthData(); // Clear token on 401 response
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/users/profile'),
};

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put(`/users/${userData.id}`, userData),
};

// Recipe services
export const recipeService = {
  getAllRecipes: (page = 1, limit = 10) => 
    api.get(`/recipes?page=${page}&limit=${limit}`),
  getRecipeById: (id) => api.get(`/recipes/${id}`),
  createRecipe: (recipeData) => api.post('/recipes', recipeData),
  updateRecipe: (id, recipeData) => api.put(`/recipes/${id}`, recipeData),
  deleteRecipe: (id) => api.delete(`/recipes/${id}`),
  searchRecipes: (query) => api.get(`/recipes/search?query=${query}`),
  getRecipePdf: (id) => api.get(`/recipes/${id}/pdf`, { responseType: 'blob' }),
};

export default api;