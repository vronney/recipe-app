import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { Recipe } from "@/models";

// GET all recipes (public access)
export async function GET() {
  try {
    const db = await getDatabase();
    const recipes = await db
      .collection<Recipe>("recipes")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Get public recipes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
