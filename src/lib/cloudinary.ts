import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Types for Cloudinary responses
interface CloudinaryUploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
}

// Function to upload image to Cloudinary
export const uploadImage = async (file: File | string, folder?: string): Promise<CloudinaryUploadResult> => {
  try {
    // If file is a string (URL), upload from URL
    if (typeof file === 'string') {
      const result = await cloudinary.uploader.upload(file, {
        folder: folder || 'architecture-firm',
        resource_type: 'image',
        quality: 'auto:good',
        fetch_format: 'auto',
      });
      return result;
    }

    // If file is a File object, upload directly
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = await cloudinary.uploader.upload(reader.result as string, {
            folder: folder || 'architecture-firm',
            resource_type: 'image',
            quality: 'auto:good',
            fetch_format: 'auto',
          });
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsDataURL(file);
    });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

// Function to delete image from Cloudinary
export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw error;
  }
};

// Function to get a secure URL for an image
export const getImageUrl = (publicId: string, options?: any): string => {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  });
};

// Function to upload multiple images
export const uploadMultipleImages = async (files: (File | string)[], folder?: string): Promise<CloudinaryUploadResult[]> => {
  const uploadPromises = files.map(file => uploadImage(file, folder));
  return Promise.all(uploadPromises);
};

export default cloudinary;