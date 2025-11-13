import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🍳 Recipe App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Store, organize, and manage your favorite recipes
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/auth/signin"
            className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium text-lg border-2 border-gray-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
