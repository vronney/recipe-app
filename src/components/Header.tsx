import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                                🍳 Recipe Collection
                            </h1>
                        </Link>
                        <p className="text-sm sm:text-lg text-gray-600 hidden sm:block">
                            Discover and explore delicious recipes
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/guides/wedding-cake"
                            className="text-orange-600 hover:text-orange-700 font-medium transition-colors text-sm sm:text-base hidden sm:block"
                        >
                            Wedding Cake Guide
                        </Link>
                        <Link
                            href="/auth/signin"
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
