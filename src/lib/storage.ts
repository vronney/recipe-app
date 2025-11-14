import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Uploads an image file to Firebase Storage
 * @param file - The image file to upload
 * @param path - The storage path (e.g., 'recipes/recipe-id')
 * @returns The download URL of the uploaded image
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `${path}/${filename}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Deletes an image from Firebase Storage
 * @param imageUrl - The full download URL or storage path
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract the storage path from the URL
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error - image might already be deleted or not exist
  }
}

/**
 * Validates if a file is an allowed image type
 * @param file - The file to validate
 * @returns true if valid, false otherwise
 */
export function isValidImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type);
}

/**
 * Validates if a file size is within the limit
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5MB)
 * @returns true if valid, false otherwise
 */
export function isValidImageSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validates an image file (type and size)
 * @param file - The file to validate
 * @param maxSizeMB - Maximum file size in MB
 * @returns Error message if invalid, null if valid
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): string | null {
  if (!isValidImageFile(file)) {
    return 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)';
  }
  
  if (!isValidImageSize(file, maxSizeMB)) {
    return `Image size must be less than ${maxSizeMB}MB`;
  }
  
  return null;
}
