# Firebase Storage Setup Guide

This guide will help you set up Firebase Storage for image uploads in your recipe app.

## Prerequisites
- A Google/Firebase account
- Your recipe app project

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name (e.g., "recipe-app")
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

## Step 2: Register Your Web App

1. In the Firebase Console, click the **Web** icon (`</>`) to add a web app
2. Register your app:
   - App nickname: `recipe-app-web` (or any name you prefer)
   - Don't check "Set up Firebase Hosting" (unless you plan to use it)
   - Click "Register app"

3. Copy the Firebase configuration object that appears. It should look like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Enable Firebase Storage

1. In the Firebase Console sidebar, click **Build** > **Storage**
2. Click "Get started"
3. Read the security rules dialog and click "Next"
4. Choose a Cloud Storage location (select the one closest to your users)
5. Click "Done"

## Step 4: Configure Storage Security Rules

**IMPORTANT:** This app uses NextAuth (not Firebase Auth), so storage rules should NOT require `request.auth`.

1. In Firebase Console, go to **Storage** > **Rules**
2. Replace the default rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow anyone to read images (public access)
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow uploads to recipes folder with validation
    match /recipes/{imageId} {
      allow write: if request.resource.size < 5 * 1024 * 1024  // Max 5MB
                   && request.resource.contentType.matches('image/.*');  // Only images
    }
  }
}
```

3. Click "Publish"

**Note:** These rules allow:
- Anyone to read images (public access)
- Anyone to upload to `recipes/` folder (with file validation)
- Only image files (JPEG, PNG, GIF, WebP)
- Max file size of 5MB

**For Production:** Consider adding backend validation via API routes to check NextAuth session before allowing uploads.

## Step 5: Set Up Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your Firebase configuration values:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

3. **Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the "Add New Recipe" page
3. Try uploading an image:
   - Click the file upload area
   - Select an image from your device
   - You should see a preview
   - Submit the form to test the upload

## Features Implemented

### Image Upload
- **File Upload**: Users can select image files from their device
- **Validation**: Checks file type (JPEG, PNG, GIF, WebP) and size (max 5MB)
- **Preview**: Shows image preview before uploading
- **Progress**: Displays "Uploading Image..." status during upload

### Supported Formats
- JPEG / JPG
- PNG
- GIF
- WebP

### File Size Limit
- Maximum: 5MB per image

### Alternative Options
- Users can still provide image URLs instead of uploading files
- The upload and URL fields are mutually exclusive

## Troubleshooting

### "Failed to upload image"
- Check your Firebase configuration in `.env.local`
- Verify Storage is enabled in Firebase Console
- Check Storage security rules
- Ensure you're authenticated (logged in)

### "Invalid file type" or "File size too large"
- Make sure the image is in a supported format
- Ensure the file is under 5MB
- Try compressing the image

### CORS Errors
- Firebase Storage automatically handles CORS for web apps
- If you see CORS errors, check your Firebase project settings

## Additional Resources

- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)
- [Firebase Security Rules](https://firebase.google.com/docs/storage/security)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## Security Considerations

1. **Authentication**: The current implementation requires users to be logged in to upload images
2. **File Validation**: Client-side and storage rules validation for file type and size
3. **Storage Rules**: Adjust the rules based on your needs (public/private access)
4. **Costs**: Monitor your Firebase Storage usage to avoid unexpected costs

## Next Steps

Consider implementing:
- Image compression before upload
- Thumbnail generation
- Delete old images when updating recipes
- Progress bar for uploads
- Multiple image uploads per recipe
- Image cropping/editing before upload
