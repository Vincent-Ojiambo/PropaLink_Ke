import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper functions for common operations
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Property related functions
export const getProperties = async (filters: PropertyFilterParams = {}) => {
  const {
    page = 1,
    limit = 10,
    search,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    city,
    status,
    isFeatured,
    userId,
    favoritesOnly,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = filters;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from('properties')
    .select('*, images:property_images(*), profiles(full_name, avatar_url)', { count: 'exact' })
    .eq('is_active', true)
    .order(sortBy, { ascending: sortOrder === 'asc' });

  // Apply filters
  if (search) {
    query = query.ilike('title', `%${search}%`);
  }
  
  if (propertyType?.length) {
    query = query.in('property_type', propertyType);
  }
  
  if (minPrice) {
    query = query.gte('price', minPrice);
  }
  
  if (maxPrice) {
    query = query.lte('price', maxPrice);
  }
  
  if (bedrooms?.length) {
    query = query.in('bedrooms', bedrooms);
  }
  
  if (bathrooms?.length) {
    query = query.in('bathrooms', bathrooms);
  }
  
  if (minArea) {
    query = query.gte('area', minArea);
  }
  
  if (maxArea) {
    query = query.lte('area', maxArea);
  }
  
  if (city?.length) {
    query = query.in('city', city);
  }
  
  if (status?.length) {
    query = query.in('status', status);
  }
  
  if (isFeatured !== undefined) {
    query = query.eq('is_featured', isFeatured);
  }
  
  if (userId) {
    query = query.eq('user_id', userId);
  }
  
  if (favoritesOnly && userId) {
    const { data: favorites } = await supabase
      .from('favorites')
      .select('property_id')
      .eq('user_id', userId);
      
    if (favorites?.length) {
      query = query.in('id', favorites.map(fav => fav.property_id));
    } else {
      // Return empty result if no favorites
      return { data: [], count: 0 };
    }
  }

  // Execute the query with pagination
  const { data, error, count } = await query.range(from, to);
  
  if (error) throw error;
  
  // Transform the data to match our types
  const properties = (data || []).map(property => ({
    ...property,
    images: property.images || [],
    user: property.profiles ? {
      id: property.user_id,
      full_name: property.profiles.full_name,
      avatar_url: property.profiles.avatar_url,
    } : undefined,
    // @ts-ignore - Remove the profiles field after mapping
    profiles: undefined,
  }));

  return {
    data: properties,
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
};

export const getPropertyById = async (id: string) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*, images:property_images(*), profiles(full_name, avatar_url)')
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!data) return null;

  // Transform the data to match our type
  return {
    ...data,
    images: data.images || [],
    user: data.profiles ? {
      id: data.user_id,
      full_name: data.profiles.full_name,
      avatar_url: data.profiles.avatar_url,
    } : undefined,
    // @ts-ignore - Remove the profiles field after mapping
    profiles: undefined,
  };
};

export const createProperty = async (propertyData: CreatePropertyRequest) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const { images, ...property } = propertyData;
  
  // Create the property
  const { data: propertyResult, error: propertyError } = await supabase
    .from('properties')
    .insert([
      {
        ...property,
        user_id: user.id,
        status: property.status || 'for_sale',
        area_unit: property.area_unit || 'sqm',
        country: property.country || 'Kenya',
      },
    ])
    .select()
    .single();

  if (propertyError) throw propertyError;
  if (!propertyResult) throw new Error('Failed to create property');

  // Handle image uploads if any
  if (images?.length) {
    const imageUrls = [];
    
    for (const image of images) {
      if (typeof image === 'string') {
        // Already a URL, just add to the list
        imageUrls.push(image);
      } else if (image instanceof File) {
        // Upload the file to Supabase Storage
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `properties/${propertyResult.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, image);
          
        if (uploadError) continue; // Skip if upload fails
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        imageUrls.push(publicUrl);
      }
    }
    
    // Add images to the database
    if (imageUrls.length > 0) {
      const { error: imageError } = await supabase
        .from('property_images')
        .insert(
          imageUrls.map((url, index) => ({
            property_id: propertyResult.id,
            url,
            is_primary: index === 0, // First image is primary
          }))
        );
        
      if (imageError) console.error('Error adding images:', imageError);
    }
  }

  // Return the created property with images
  return getPropertyById(propertyResult.id);
};

export const updateProperty = async (id: string, updates: Partial<CreatePropertyRequest>) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const { images, ...propertyUpdates } = updates;
  
  // Update the property
  const { error: propertyError } = await supabase
    .from('properties')
    .update(propertyUpdates)
    .eq('id', id)
    .eq('user_id', user.id);

  if (propertyError) throw propertyError;

  // Handle image updates if any
  if (images?.length) {
    // First, delete existing images
    await supabase
      .from('property_images')
      .delete()
      .eq('property_id', id);
    
    // Then add the new ones
    const imageUrls = [];
    
    for (const image of images) {
      if (typeof image === 'string') {
        imageUrls.push(image);
      } else if (image instanceof File) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `properties/${id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(filePath, image);
          
        if (uploadError) continue;
        
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        imageUrls.push(publicUrl);
      }
    }
    
    if (imageUrls.length > 0) {
      await supabase
        .from('property_images')
        .insert(
          imageUrls.map((url, index) => ({
            property_id: id,
            url,
            is_primary: index === 0,
          }))
        );
    }
  }

  return getPropertyById(id);
};

export const deleteProperty = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  // Soft delete by setting is_active to false
  const { error } = await supabase
    .from('properties')
    .update({ is_active: false })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  return true;
};

// Favorite related functions
export const toggleFavorite = async (propertyId: string) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  // Check if already favorited
  const { data: existing } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('property_id', propertyId)
    .single();

  if (existing) {
    // Remove from favorites
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', existing.id);
      
    if (error) throw error;
    return { isFavorite: false };
  } else {
    // Add to favorites
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: user.id, property_id: propertyId }]);
      
    if (error) throw error;
    return { isFavorite: true };
  }
};

export const isPropertyFavorited = async (propertyId: string) => {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', user.id)
    .eq('property_id', propertyId)
    .single();

  return !!data;
};

export const getUserFavorites = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('property_id')
    .eq('user_id', userId);
    
  if (error) throw error;
  return data.map(fav => fav.property_id);
};

// User profile functions
export const updateProfile = async (updates: Partial<Profile>) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('user_id', user.id);
    
  if (error) throw error;
  
  // Return the updated profile
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();
    
  return data;
};

export const uploadAvatar = async (file: File) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `avatars/${fileName}`;
  
  // Upload the file
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    
  if (uploadError) throw uploadError;
  
  // Get the public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);
    
  // Update the profile with the new avatar URL
  await updateProfile({ avatar_url: publicUrl });
  
  return publicUrl;
};
