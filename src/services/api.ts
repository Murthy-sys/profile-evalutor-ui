import axios from 'axios';

const API_URL = 'http://localhost:3000';
// const API_URL = 'https://resume-evaluator-backend-2.onrender.com'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Resume API
export const resumeAPI = {
  uploadResume: (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);
    return api.post('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getAllUsers: () => api.get('/resume/all'),
  getUserDetails: (id: string) => api.get(`/resume/${id}`),
  updateEmployeeStatus: (id: string, status: string, joiningDate?: string) =>
    api.put(`/resume/${id}/status`, { status, joiningDate }),
  deleteUser: (id: string) => api.delete(`/resume/${id}`),
  downloadResume: (id: string) => 
    api.get(`/resume/${id}/download`, { 
      responseType: 'blob'
    }),
};

export default api;
