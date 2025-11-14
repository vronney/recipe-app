# Firebase Storage Upload Verification

This document helps you verify that Firebase Storage is correctly configured for file uploads.

## ✅ Configuration Checklist

### 1. Environment Variables
Your `.env.local` file should contain these variables (already configured ✓):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

**Status:** ✓ All variables are set in `.env.local`

### 2. Storage Bucket Format
Your storage bucket uses the newer Firebase domain format:
- Current: `mi-cocina-recipes.firebasestorage.app`
- This is correct! (Newer projects use `.firebasestorage.app` instead of `.appspot.com`)

**Status:** ✓ Correct format

### 3. Security Rules
Your project uses **NextAuth** (not Firebase Auth), so Firebase Storage rules must NOT require `request.auth`.

**Local rules file:** `firebase-storage.rules` ✓
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // Public read access
    }
    match /recipes/{imageId} {
      allow write: if request.resource.size < 5 * 1024 * 1024 
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

**⚠️ CRITICAL:** You must deploy these rules to Firebase Console!

### 4. Deploy Security Rules to Firebase

**Option A: Using Firebase CLI (Recommended)**
```powershell
# Install Firebase CLI if not installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init storage

# Deploy the rules
firebase deploy --only storage
```

**Option B: Manual Update via Firebase Console**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `mi-cocina-recipes`
3. Go to **Storage** → **Rules**
4. Copy the content from `firebase-storage.rules`
5. Paste it into the editor
6. Click **Publish**

## 🧪 Testing File Uploads

### Test 1: Check Firebase Connection
```powershell
# Run the dev server
npm run dev
```

### Test 2: Manual Upload Test
1. Open http://localhost:3000/recipes/new
2. Click "📁 Choose an image file"
3. Select a small test image (< 5MB)
4. Check browser console (F12) for errors
5. Submit the form

### Test 3: Check Firebase Console
After upload:
1. Go to Firebase Console → Storage
2. Navigate to `recipes/` folder
3. Verify the uploaded image appears

## 🐛 Common Issues & Solutions

### Issue 1: "Permission Denied" Errors
**Symptom:** Upload fails with permission/auth errors

**Cause:** Storage rules still require Firebase Auth

**Solution:**
1. Check Firebase Console → Storage → Rules
2. Ensure rules match `firebase-storage.rules`
3. Make sure `allow write: if request.auth != null` is REMOVED
4. Publish the updated rules

### Issue 2: CORS Errors
**Symptom:** Browser shows CORS policy errors

**Solution:** Firebase Storage automatically handles CORS for web apps. If you see CORS errors:
1. Check that your `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` is correct
2. Verify the bucket exists in Firebase Console
3. Try clearing browser cache

### Issue 3: "Failed to upload image"
**Symptom:** Generic upload failure

**Check:**
1. File size < 5MB? ✓
2. File type is image? (JPEG, PNG, GIF, WebP) ✓
3. Internet connection working? ✓
4. Firebase config variables set? ✓
5. Storage rules deployed? ⚠️

### Issue 4: Firebase Not Initialized
**Symptom:** Console error about Firebase not initialized

**Solution:**
1. Restart the dev server: `npm run dev`
2. Check all environment variables are set
3. Verify `.env.local` is in the project root

## 📝 Implementation Details

### Files Involved
- **`src/lib/firebase.ts`** - Firebase initialization ✓
- **`src/lib/storage.ts`** - Upload/delete functions ✓
- **`src/lib/firebase-utils.ts`** - URL conversion utilities ✓
- **`src/app/recipes/new/page.tsx`** - Upload UI implementation ✓

### Upload Flow
1. User selects image → validation (client-side)
2. Preview shown using FileReader
3. On submit → `uploadImage()` called
4. File uploaded to `recipes/{timestamp}-{filename}`
5. Download URL returned and saved to database

### Security Features
✓ File type validation (images only)
✓ File size limit (5MB)
✓ Unique filenames with timestamp
✓ Proper error handling

## 🔒 Security Considerations

### Current Setup
- **Read:** Public (anyone can view images)
- **Write:** Open with validation (file size + type checks only)

### For Production
Consider adding backend validation:
1. Create an API route for uploads
2. Verify user is logged in via NextAuth
3. Generate signed upload URLs
4. Add rate limiting

Example API route structure:
```typescript
// src/app/api/upload/route.ts
import { auth } from "@/auth";

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Handle upload with proper validation
}
```

## 🚀 Next Steps

1. ✅ Verify environment variables
2. ✅ Check storage bucket format
3. ⚠️ **Deploy security rules to Firebase Console**
4. ⚠️ **Test file upload**
5. ⬜ (Optional) Add backend upload validation
6. ⬜ (Optional) Implement image optimization

## 📞 Need Help?

If uploads still don't work:
1. Check browser console (F12) for detailed errors
2. Check Firebase Console → Storage → Files (verify bucket exists)
3. Check Firebase Console → Storage → Rules (verify rules are published)
4. Verify all environment variables are correctly set

## 🔍 Quick Diagnostics

Run this in your browser console on the upload page:
```javascript
console.log('Firebase Config:', {
  apiKey: import.meta.env?.NEXT_PUBLIC_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
  projectId: import.meta.env?.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not found',
  storageBucket: import.meta.env?.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'Not found'
});
```
