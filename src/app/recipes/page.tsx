"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/models";

export default function RecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        
        if (response.status === 401) {
          router.push("/auth/signin");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        setError("Failed to load recipes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRecipes(recipes.filter((recipe) => recipe._id?.toString() !== id));
      } else {
        alert("Failed to delete recipe");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  const handleSignOut = async () => {
    const { signOut } = await import("next-auth/react");
    await signOut({ callbackUrl: "/auth/signin" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Recipes</h1>
          <div className="flex gap-4">
            <Link
              href="/recipes/new"
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Recipe
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No recipes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new recipe.
            </p>
            <div className="mt-6">
              <Link
                href="/recipes/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                Add Your First Recipe
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div
                key={recipe._id?.toString()}
                className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              >
                {recipe.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-500 mb-4">
                    <span>⏱️ {recipe.prepTime + recipe.cookTime} min</span>
                    <span>🍽️ {recipe.servings} servings</span>
                  </div>
                  {recipe.category && (
                    <div className="mb-4">
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                        {recipe.category}
                      </span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Link
                      href={`/recipes/${recipe._id?.toString()}/edit`}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(recipe._id?.toString() || "")}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
