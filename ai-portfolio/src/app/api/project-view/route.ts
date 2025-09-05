import { db } from "@/lib/firebase.admin";
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    
    const ref = db.collection("projectViews").doc(slug);
    await ref.set({ count: 0 }, { merge: true });
    await ref.update({ count: FieldValue.increment(1) });
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error tracking project view:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
