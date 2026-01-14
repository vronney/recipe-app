import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  emailVerified?: Date;
  image?: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe {
  _id?: ObjectId;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  category?: string;
  image?: string;
  userId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
