import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  authService, 
  programsService, 
  activitiesService, 
  galleryService, 
  mediaService 
} from '@/lib/api-services';

export const useAdminProfile = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authService.getMe().then(res => res.data),
    retry: false,
  });
};

export const useAdminPrograms = () => {
  return useQuery({
    queryKey: ['admin-programs'],
    queryFn: () => programsService.getAll().then(res => res.data),
  });
};

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: programsService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-programs'] }),
  });
};

export const useAdminActivities = () => {
  return useQuery({
    queryKey: ['admin-activities'],
    queryFn: () => activitiesService.getAll().then(res => res.data),
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activitiesService.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-activities'] }),
  });
};

export const useAdminGallery = () => {
  return useQuery({
    queryKey: ['admin-gallery'],
    queryFn: () => galleryService.getAlbums().then(res => res.data),
  });
};

export const useUploadMedia = () => {
  return useMutation({
    mutationFn: ({ file, folder }: { file: File; folder: string }) => mediaService.upload(file, folder),
  });
};
