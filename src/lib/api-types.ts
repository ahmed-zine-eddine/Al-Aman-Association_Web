export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type MediaType = 'IMAGE' | 'PDF' | 'VIDEO';
export type ContactStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
export type VolunteerStatus = 'PENDING' | 'REVIEWING' | 'ACCEPTED' | 'REJECTED';
export type EventStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
export type ProgramStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED';
export type ActivityCategory = 'EDUCATION' | 'HEALTHCARE' | 'RAMADAN' | 'ORPHAN_CARE' | 'COMMUNITY' | 'EMERGENCY' | 'OTHER';

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: ApiMeta;
  errors?: any;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  publicId: string | null;
  mediaType: MediaType;
  altText: string | null;
  altTextAr: string | null;
  folder: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
}

export interface Program {
  id: string;
  featuredImageId: string | null;
  title: string;
  titleAr: string | null;
  slug: string;
  description: string;
  descriptionAr: string | null;
  status: ProgramStatus;
  isFeatured: boolean;
  featuredImage?: Media | null;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  featuredImageId: string | null;
  title: string;
  titleAr: string | null;
  slug: string;
  description: string;
  descriptionAr: string | null;
  category: ActivityCategory;
  activityDate: string | null;
  status: ContentStatus;
  isFeatured: boolean;
  featuredImage?: Media | null;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  titleAr: string | null;
  slug: string;
  description: string | null;
  coverUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  items?: GalleryItem[];
}

export interface GalleryItem {
  id: string;
  media: Media;
  caption: string | null;
}

export interface AuthResponse {
  admin: Admin;
  accessToken: string;
}
