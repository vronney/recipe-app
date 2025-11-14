import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { Recipe } from "@/models";
import { ObjectId } from "mongodb";

// GET single recipe (public access)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid recipe ID" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const recipe = await db
      .collection<Recipe>("recipes")
      .findOne({ _id: new ObjectId(id) });

    if (!recipe) {
      return NextResponse.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Get public recipe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
