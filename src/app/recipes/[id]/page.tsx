"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/models";
import { convertGsUrlToHttp } from "@/lib/firebase-utils";

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${params.id}`);
        
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }

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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      const response = await fetch(`/api/recipes/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/recipes");
      } else {
        alert("Failed to delete recipe");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Recipe not found"}</p>
          <Link
            href="/recipes"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            ← Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/recipes"
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
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
            Back to Recipes
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/recipes/${params.id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
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

          <div className="p-8">
            {/* Title & Category */}
            <div className="mb-6">
              {recipe.category && (
                <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full mb-3">
                  {recipe.category}
                </span>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {recipe.title}
              </h1>
              <p className="text-xl text-gray-600">{recipe.description}</p>
            </div>

            {/* Recipe Info */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200 mb-8">
              <div className="text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Prep Time
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {recipe.prepTime} min
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🍳</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Cook Time
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {recipe.cookTime} min
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🍽️</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">
                  Servings
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {recipe.servings}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-medium mt-0.5">
                      ✓
                    </span>
                    <span className="text-lg">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <p className="text-lg text-gray-700 pt-0.5">
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
