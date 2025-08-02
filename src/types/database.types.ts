// Database enums that match our SQL enums
export type PropertyType = 
  | 'apartment' 
  | 'house' 
  | 'villa' 
  | 'office' 
  | 'land' 
  | 'commercial' 
  | 'other';

export type PropertyStatus = 
  | 'for_sale' 
  | 'for_rent' 
  | 'sold' 
  | 'rented';

// Database table types
export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  property_type: PropertyType;
  status: PropertyStatus;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number;
  area_unit: string;
  address: string;
  city: string;
  state: string | null;
  postal_code: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  is_featured: boolean;
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Relations
  images?: PropertyImage[];
  user?: Profile;
  is_favorite?: boolean;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  is_primary: boolean;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
  property?: Property;
}

// Request/Response types for API
export interface CreatePropertyRequest {
  title: string;
  description?: string;
  price: number;
  property_type: PropertyType;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  area: number;
  area_unit?: string;
  address: string;
  city: string;
  state?: string;
  postal_code?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  is_featured?: boolean;
  images?: File[] | string[];
}

export interface UpdatePropertyRequest extends Partial<CreatePropertyRequest> {
  id: string;
}

export interface PropertyFilterParams {
  minPrice?: number;
  maxPrice?: number;
  propertyType?: PropertyType[];
  bedrooms?: number[];
  bathrooms?: number[];
  minArea?: number;
  maxArea?: number;
  city?: string[];
  status?: PropertyStatus[];
  search?: string;
  isFeatured?: boolean;
  userId?: string;
  favoritesOnly?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
