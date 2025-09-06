import { db } from "@/lib/firebase.admin";
import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    
    // If no database configured, just return success (tracking is optional)
    if (!db) {
      console.log("Firestore not configured, skipping project view tracking");
      return NextResponse.json({ ok: true, message: "Tracking disabled" });
    }
    
    try {
      const ref = db.collection("projectViews").doc(slug);
      await ref.set({ count: 0 }, { merge: true });
      await ref.update({ count: FieldValue.increment(1) });
      
      return NextResponse.json({ ok: true });
    } catch (firestoreError: any) {
      // If Firestore API is not enabled, log and continue gracefully
      if (firestoreError.code === 7 || firestoreError.message?.includes('SERVICE_DISABLED')) {
        console.log("Firestore API not enabled, skipping project view tracking");
        return NextResponse.json({ ok: true, message: "Tracking disabled - Firestore not enabled" });
      }
      
      // Re-throw other Firestore errors
      throw firestoreError;
    }
  } catch (error) {
    console.error("Error tracking project view:", error);
    // Return success even if tracking fails - don't break the site
    return NextResponse.json({ ok: true, message: "Tracking failed but continuing" });
  }
}
