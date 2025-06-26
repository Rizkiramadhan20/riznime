import { NextResponse } from "next/server";

import { auth, db } from "@/utils/firebase/firebase-admin";

import { Role } from "@/utils/context/types/Auth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ uid: string }> }
) {
  try {
    // Verify admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);

    // Get user's role from Firestore
    const userDoc = await db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(decodedToken.uid)
      .get();

    const userData = userDoc.data();

    // Check if user is an admin
    if (!userData || userData.role !== Role.ADMINS) {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    // Get request body
    const { isActive } = await request.json();
    if (typeof isActive !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body: isActive must be a boolean" },
        { status: 400 }
      );
    }

    const resolvedParams = await context.params;

    // Update user in Firebase Auth
    await auth.updateUser(resolvedParams.uid, {
      disabled: !isActive,
    });

    // Update user in Firestore
    const userRef = db
      .collection(process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string)
      .doc(resolvedParams.uid);
    await userRef.update({
      isActive: isActive,
    });

    return NextResponse.json(
      { message: "User status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}
