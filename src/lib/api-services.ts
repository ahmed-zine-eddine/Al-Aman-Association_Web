import { apiClient } from './api-client';
import type { 
  AuthResponse, 
  Program, 
  Activity, 
  GalleryAlbum,
  Admin,
  Media
} from './api-types';

export const authService = {
  login: (data: any) => apiClient.post<AuthResponse>('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getMe: () => apiClient.get<Admin>('/auth/me'),
};

export const programsService = {
  getAll: () => apiClient.get<Program[]>('/programs'),
  getById: (id: string) => apiClient.get<Program>(`/programs/${id}`),
  create: (data: any) => apiClient.post<Program>('/programs', data),
  update: (id: string, data: any) => apiClient.put<Program>(`/programs/${id}`, data),
  delete: (id: string) => apiClient.delete(`/programs/${id}`),
};

export const activitiesService = {
  getAll: () => apiClient.get<Activity[]>('/activities'),
  getById: (id: string) => apiClient.get<Activity>(`/activities/${id}`),
  create: (data: any) => apiClient.post<Activity>('/activities', data),
  update: (id: string, data: any) => apiClient.put<Activity>(`/activities/${id}`, data),
  delete: (id: string) => apiClient.delete(`/activities/${id}`),
};

export const galleryService = {
  getAlbums: () => apiClient.get<GalleryAlbum[]>('/gallery'),
  getAlbumById: (id: string) => apiClient.get<GalleryAlbum>(`/gallery/${id}`),
  createAlbum: (data: any) => apiClient.post<GalleryAlbum>('/gallery', data),
  updateAlbum: (id: string, data: any) => apiClient.put<GalleryAlbum>(`/gallery/${id}`, data),
  deleteAlbum: (id: string) => apiClient.delete(`/gallery/${id}`),
};

export const mediaService = {
  upload: (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return apiClient.post<Media>('/media/upload', formData);
  },
  delete: (id: string) => apiClient.delete(`/media/${id}`),
};
