"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/models";
import { convertGsUrlToHttp } from "@/lib/firebase-utils";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch("/api/recipes/public");
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        }
      } catch (err) {
        console.error("Failed to load recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex flex-col">
      {/* Hero Section */}


      {/* Recipes Grid */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex-grow">
        {loading ? (
          <div className="flex items-center justify-center py-12 sm:py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading recipes...</p>
            </div>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-900">
              No recipes yet
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-500">
              Check back soon for delicious recipes!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <Link
                key={recipe._id?.toString()}
                href={`/recipe/${recipe._id?.toString()}`}
                className="bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-all active:scale-98 cursor-pointer block"
              >
                {recipe.image && (
                  <div className="relative w-full">
                    <Image
                      src={convertGsUrlToHttp(recipe.image)}
                      alt={recipe.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2 hover:text-orange-600 transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                    <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                    <span>🍽️ {recipe.servings} servings</span>
                  </div>
                  {recipe.category && (
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      {recipe.category}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-auto border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 text-center text-gray-600">
          <p className="text-xs sm:text-sm">Want to add your own recipes? <Link href="/auth/signin" className="text-orange-600 hover:text-orange-700 font-medium">Login as admin</Link></p>
        </div>
      </footer>
    </div>
  );
}
