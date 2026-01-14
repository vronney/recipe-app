"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="hover:opacity-80 transition-opacity">
                            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                                🍳 Recipe Collection
                            </h1>
                        </Link>
                        <p className="hidden lg:block text-sm sm:text-lg text-gray-600 ml-4">
                            Discover and explore delicious recipes
                        </p>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link
                            href="/guides/wedding-cake"
                            className="text-orange-600 hover:text-orange-700 font-medium transition-colors text-sm sm:text-base"
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

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                            aria-label="Toggle menu"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-2 border-t border-gray-100 pt-2">
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/guides/wedding-cake"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-2 py-2 text-orange-600 font-medium rounded-md hover:bg-orange-50"
                            >
                                Wedding Cake Guide
                            </Link>
                            <Link
                                href="/auth/signin"
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-2 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-50"
                            >
                                Admin Login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
