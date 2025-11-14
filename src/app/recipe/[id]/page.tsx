"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/models";
import { convertGsUrlToHttp } from "@/lib/firebase-utils";

export default function PublicRecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/public/${params.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadRecipe();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Recipe not found"}</p>
          <Link
            href="/"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Link
            href="/auth/signin"
            className="text-orange-600 hover:text-orange-700 font-medium text-sm sm:text-base"
          >
            Admin
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-8 pb-6">
        <article className="bg-white sm:rounded-lg sm:shadow-lg overflow-hidden">
          {/* Hero Image */}
          {recipe.image && (
            <div className="relative w-full">
              <Image
                src={convertGsUrlToHttp(recipe.image)}
                alt={recipe.title}
                width={1200}
                height={800}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          )}

          <div className="p-4 sm:p-8">
            {/* Title & Category */}
            <div className="mb-4 sm:mb-6">
              {recipe.category && (
                <span className="inline-block bg-orange-100 text-orange-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full mb-2 sm:mb-3">
                  {recipe.category}
                </span>
              )}
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                {recipe.title}
              </h1>
              <p className="text-base sm:text-xl text-gray-600">{recipe.description}</p>
            </div>

            {/* Recipe Info */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-6 border-y border-gray-200 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">⏱️</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Prep
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900">
                  {recipe.prepTime} min
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🍳</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Cook
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900">
                  {recipe.cookTime} min
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🍽️</div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                  Servings
                </div>
                <div className="text-sm sm:text-lg font-semibold text-gray-900">
                  {recipe.servings}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2 sm:space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 text-gray-700"
                  >
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs sm:text-sm font-medium mt-0.5">
                      ✓
                    </span>
                    <span className="text-sm sm:text-lg">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Instructions
              </h2>
              <ol className="space-y-4 sm:space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3 sm:gap-4">
                    <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                      {index + 1}
                    </span>
                    <p className="text-sm sm:text-lg text-gray-700 pt-0.5 sm:pt-1">
                      {instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
