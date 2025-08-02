import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // You'll need to set this in your .env file

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function setupStorage() {
  try {
    console.log('Setting up storage buckets...');
    
    // Create property-images bucket if it doesn't exist
    const { data: propertyImagesBucket, error: propertyImagesError } = 
      await supabase.storage.createBucket('property-images', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 1024 * 1024 * 5, // 5MB
      });
    
    if (propertyImagesError && propertyImagesError.message !== 'Bucket already exists') {
      throw propertyImagesError;
    }
    
    console.log('✅ property-images bucket is ready');
    
    // Create avatars bucket if it doesn't exist
    const { data: avatarsBucket, error: avatarsError } = 
      await supabase.storage.createBucket('avatars', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 1024 * 1024 * 2, // 2MB
      });
    
    if (avatarsError && avatarsError.message !== 'Bucket already exists') {
      throw avatarsError;
    }
    
    console.log('✅ avatars bucket is ready');
    
    // Set bucket policies
    await setBucketPolicies();
    
    console.log('\n✨ Supabase storage setup completed successfully!');
  } catch (error) {
    console.error('Error setting up storage:', error);
    process.exit(1);
  }
}

async function setBucketPolicies() {
  // Policy for property images
  const propertyImagesPolicy = {
    policy: {
      actions: ['buckets:read', 'objects:read', 'objects:create', 'objects:update', 'objects:delete'],
      resources: ['b/property-images/*'],
      effect: 'allow',
    },
  };
  
  // Policy for avatars
  const avatarsPolicy = {
    policy: {
      actions: ['buckets:read', 'objects:read', 'objects:create', 'objects:update', 'objects:delete'],
      resources: ['b/avatars/*'],
      effect: 'allow',
    },
  };
  
  // Apply policies
  const { error: propertyImagesPolicyError } = await supabase.rpc(
    'create_or_update_policy',
    {
      policy_name: 'Allow public access to property images',
      definition: propertyImagesPolicy,
      check: null,
      roles: ['authenticated', 'anon'],
      schema_name: 'storage',
      table_name: 'objects',
    }
  );
  
  if (propertyImagesPolicyError) {
    console.error('Error setting property images policy:', propertyImagesPolicyError);
  } else {
    console.log('✅ Set policy for property-images bucket');
  }
  
  const { error: avatarsPolicyError } = await supabase.rpc(
    'create_or_update_policy',
    {
      policy_name: 'Allow public access to avatars',
      definition: avatarsPolicy,
      check: null,
      roles: ['authenticated', 'anon'],
      schema_name: 'storage',
      table_name: 'objects',
    }
  );
  
  if (avatarsPolicyError) {
    console.error('Error setting avatars policy:', avatarsPolicyError);
  } else {
    console.log('✅ Set policy for avatars bucket');
  }
}

// Run the setup
setupStorage();
