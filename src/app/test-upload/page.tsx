"use client";

import { useState } from "react";
import { uploadImage, validateImageFile } from "@/lib/storage";
import { storage } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validationError = validateImageFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      setPreview("");
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult("");

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError("");
    setResult("");

    try {
      const url = await uploadImage(file, "test-uploads");
      setResult(`✅ Upload successful!\n\nDownload URL:\n${url}`);
    } catch (err) {
      setError(`❌ Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const checkFirebaseConfig = () => {
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      storageInstance: storage ? "✓ Initialized" : "✗ Not initialized",
    };

    console.log("Firebase Configuration:", config);
    alert(JSON.stringify(config, null, 2));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Firebase Upload Test</h1>
        <p className="text-gray-600 mb-8">
          Use this page to verify Firebase Storage uploads are working correctly.
        </p>

        {/* Firebase Config Check */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-blue-900 mb-2">Step 1: Check Configuration</h2>
          <button
            onClick={checkFirebaseConfig}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Check Firebase Config
          </button>
          <p className="text-sm text-blue-700 mt-2">
            Click to view Firebase configuration in console and alert
          </p>
        </div>

        {/* File Upload Test */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Step 2: Test File Upload</h2>

          {/* File Input */}
          <div className="mb-4">
            <label
              htmlFor="testFile"
              className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 block text-center transition-colors"
            >
              {file ? `📁 ${file.name}` : "📁 Choose an image file"}
              <input
                type="file"
                id="testFile"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Supported: JPEG, PNG, GIF, WebP (max 5MB)
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={300}
                className="rounded-lg object-cover max-h-64"
              />
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Test Image"}
          </button>

          {/* Results */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <pre className="text-sm text-red-800 whitespace-pre-wrap">{error}</pre>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <pre className="text-sm text-green-800 whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>

        {/* Troubleshooting */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h2 className="font-semibold text-yellow-900 mb-2">Troubleshooting</h2>
          <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
            <li>Check browser console (F12) for detailed errors</li>
            <li>Verify .env.local contains all NEXT_PUBLIC_FIREBASE_* variables</li>
            <li>Ensure Firebase Storage rules are deployed (see FIREBASE_VERIFICATION.md)</li>
            <li>Check Firebase Console → Storage to verify bucket exists</li>
            <li>Try restarting the dev server</li>
          </ul>
        </div>

        {/* Links */}
        <div className="mt-6 text-center">
          <Link
            href="/recipes/new"
            className="text-blue-600 hover:underline mr-4"
          >
            Go to New Recipe Page
          </Link>
          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
