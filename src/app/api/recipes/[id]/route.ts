import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { auth } from "@/auth";
import { Recipe } from "@/models";
import { ObjectId } from "mongodb";

// GET single recipe
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();
    const recipe = await db.collection<Recipe>("recipes").findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Get recipe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT update recipe
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

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

    const db = await getDatabase();

    // Verify ownership
    const existingRecipe = await db.collection<Recipe>("recipes").findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });

    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const updateData: Partial<Recipe> = {
      ...(title && { title }),
      ...(description && { description }),
      ...(ingredients && {
        ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      }),
      ...(instructions && {
        instructions: Array.isArray(instructions)
          ? instructions
          : [instructions],
      }),
      ...(prepTime !== undefined && { prepTime: Number(prepTime) }),
      ...(cookTime !== undefined && { cookTime: Number(cookTime) }),
      ...(servings !== undefined && { servings: Number(servings) }),
      ...(category !== undefined && { category }),
      ...(image !== undefined && { image }),
      updatedAt: new Date(),
    };

    await db
      .collection<Recipe>("recipes")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({ message: "Recipe updated successfully" });
  } catch (error) {
    console.error("Update recipe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE recipe
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDatabase();

    // Verify ownership before deleting
    const result = await db.collection<Recipe>("recipes").deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete recipe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
