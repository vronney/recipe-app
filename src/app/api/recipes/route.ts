import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { auth } from "@/auth";
import { Recipe } from "@/models";
import { ObjectId } from "mongodb";

// GET all recipes for authenticated user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();
    const recipes = await db
      .collection<Recipe>("recipes")
      .find({ userId: new ObjectId(session.user.id) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Get recipes error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create new recipe
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      category,
      image,
    } = body;

    if (!title || !description || !ingredients || !instructions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const recipe: Omit<Recipe, "_id"> = {
      title,
      description,
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      instructions: Array.isArray(instructions) ? instructions : [instructions],
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      servings: Number(servings) || 1,
      category: category || "",
      image: image || "",
      userId: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Recipe>("recipes").insertOne(recipe);

    return NextResponse.json(
      {
        message: "Recipe created successfully",
        recipeId: result.insertedId.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create recipe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
