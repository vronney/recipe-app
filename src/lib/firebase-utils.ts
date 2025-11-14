/**
 * Converts a Firebase Storage gs:// URL to an HTTP URL
 * @param gsUrl - The gs:// URL from Firebase Storage
 * @returns The HTTP URL that can be used in browsers and Next.js Image
 */
export function convertGsUrlToHttp(gsUrl: string): string {
  if (!gsUrl.startsWith('gs://')) {
    // Already an HTTP URL or invalid
    return gsUrl;
  }

  // Extract bucket and path from gs://bucket/path
  const withoutProtocol = gsUrl.replace('gs://', '');
  const [bucket, ...pathParts] = withoutProtocol.split('/');
  const path = pathParts.join('/');

  // Encode the path for URL
  const encodedPath = encodeURIComponent(path);

  // Return Firebase Storage HTTP URL
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media`;
}
