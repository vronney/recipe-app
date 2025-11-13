# Recipe App

A full-stack recipe management application built with Next.js, TypeScript, and Tailwind CSS. Users can create, edit, and delete their favorite recipes with a modern and responsive interface.

## Features

- 🔐 **Authentication** - Secure user authentication with NextAuth.js
- 📝 **Recipe Management** - Create, read, update, and delete recipes
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS
- 💾 **Database** - MongoDB for reliable data storage
- 📧 **Email Integration** - Nodemailer for email functionality
- 🔒 **Protected Routes** - User-specific recipe management
- ⚡ **Real-time Updates** - Instant UI updates after operations

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js v5
- **Database**: MongoDB
- **Email**: Nodemailer
- **Password Hashing**: bcryptjs

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or higher
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vronney/recipe-app.git
   cd recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```

   Update the `.env.local` file with your configuration:
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/recipeapp
   # Or use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recipeapp

   # NextAuth Configuration
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production
   NEXTAUTH_URL=http://localhost:3000

   # Email Configuration (Nodemailer)
   EMAIL_SERVER_USER=your-email@example.com
   EMAIL_SERVER_PASSWORD=your-email-password
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_FROM=noreply@recipeapp.com
   ```

   **Important**: 
   - Generate a secure `NEXTAUTH_SECRET` using: `openssl rand -base64 32`
   - For Gmail, you may need to create an [App Password](https://support.google.com/accounts/answer/185833)

4. **Set up MongoDB**

   **Option A: Local MongoDB**
   - Install MongoDB locally: https://docs.mongodb.com/manual/installation/
   - Start MongoDB service
   - The app will connect to `mongodb://localhost:27017/recipeapp`

   **Option B: MongoDB Atlas (Cloud)**
   - Create a free account at https://www.mongodb.com/cloud/atlas
   - Create a new cluster
   - Get your connection string and update `MONGODB_URI` in `.env.local`

## Running the Application

1. **Development mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production build**
   ```bash
   npm run build
   npm start
   ```

## Usage

1. **Sign Up**: Create a new account at `/auth/signup`
2. **Sign In**: Login at `/auth/signin`
3. **Add Recipe**: Click "Add Recipe" button on the recipes page
4. **Edit Recipe**: Click "Edit" on any recipe card
5. **Delete Recipe**: Click "Delete" on any recipe card (with confirmation)

## Project Structure

```
recipe-app/
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── recipes/    # Recipe CRUD endpoints
│   │   │   └── signup/     # User registration
│   │   ├── auth/           # Auth pages (signin, signup)
│   │   ├── recipes/        # Recipe pages (list, new, edit)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── lib/
│   │   └── mongodb.ts      # MongoDB connection
│   ├── models/
│   │   └── index.ts        # Data models (User, Recipe)
│   ├── types/
│   │   └── next-auth.d.ts  # NextAuth type definitions
│   └── auth.ts             # NextAuth configuration
├── .env.local.example      # Environment variables template
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Recipes
- `GET /api/recipes` - Get all recipes for authenticated user
- `POST /api/recipes` - Create new recipe
- `GET /api/recipes/[id]` - Get single recipe
- `PUT /api/recipes/[id]` - Update recipe
- `DELETE /api/recipes/[id]` - Delete recipe

## Database Schema

### Users Collection
```typescript
{
  _id: ObjectId
  name: string
  email: string
  password: string (hashed)
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
}
```

### Recipes Collection
```typescript
{
  _id: ObjectId
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  category?: string
  image?: string
  userId: ObjectId
  createdAt: Date
  updatedAt: Date
}
```

## Linting

```bash
npm run lint
```

## Building for Production

```bash
npm run build
```

## Troubleshooting

**MongoDB Connection Issues**
- Ensure MongoDB is running
- Check your connection string in `.env.local`
- For MongoDB Atlas, ensure your IP is whitelisted

**Authentication Issues**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your deployment URL

**Email Issues**
- For Gmail, use App Passwords instead of your regular password
- Check SMTP settings for your email provider

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Ron

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment tools
- MongoDB for the database
- NextAuth.js for authentication
