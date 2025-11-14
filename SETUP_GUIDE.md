# Recipe App - Setup Guide

## Overview
Your recipe app now has:
- **Public Landing Page** (/) - Displays all recipes to anyone visiting the site
- **Admin Dashboard** (/recipes) - Login required to add, edit, and delete recipes

## How It Works

### Public Access (No Login Required)
- **Home Page (/)** - Shows all recipes in a beautiful grid layout
- **Recipe Detail Page (/recipe/[id])** - Click any recipe to view full details including ingredients and instructions
- Anyone can view the recipes without signing in
- Displays recipe images, titles, descriptions, cooking times, and categories

### Admin Access (Login Required)
- **Admin Login** - Click "Admin Login" button on home page or visit `/auth/signin`
- **Admin Dashboard** (/recipes) - Manage all recipes after logging in
- **Add Recipe** - Create new recipes with images, ingredients, and instructions
- **Edit Recipe** - Modify existing recipes
- **Delete Recipe** - Remove recipes with confirmation

## API Endpoints

### Public API
- `GET /api/recipes/public` - Fetches all recipes (no authentication required)
- `GET /api/recipes/public/[id]` - Fetches single recipe details (no authentication required)

### Protected APIs (Require Authentication)
- `GET /api/recipes` - Get user's recipes
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/[id]` - Get single recipe
- `PUT /api/recipes/[id]` - Update recipe
- `DELETE /api/recipes/[id]` - Delete recipe

## Running the App

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 to see the public landing page

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Usage Flow

### For Visitors
1. Visit http://localhost:3000
2. Browse all available recipes
3. Click on any recipe card to view full details
4. See complete ingredients list and step-by-step instructions

### For Admins
1. Click "Admin Login" on the home page
2. Sign in with your credentials (or sign up if new)
3. Access the Admin Dashboard at /recipes
4. Add, edit, or delete recipes
5. Click "View Public Site" to see how recipes appear to visitors

## Features
- ✅ Public recipe gallery on landing page
- ✅ Admin authentication required for management
- ✅ Create, read, update, delete recipes (admin only)
- ✅ Image upload support
- ✅ Recipe categories and metadata
- ✅ Responsive design with Tailwind CSS
- ✅ MongoDB database storage
- ✅ NextAuth.js authentication

## Tech Stack
- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS
- MongoDB
- NextAuth.js v5

## Next Steps
1. Make sure MongoDB is running (see README.md for setup)
2. Configure your `.env.local` file with database credentials
3. Create an admin account at `/auth/signup`
4. Start adding recipes!
