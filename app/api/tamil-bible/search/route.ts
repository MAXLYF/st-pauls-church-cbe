import { NextRequest, NextResponse } from "next/server";
import { searchCachedBible } from "@/lib/tamil-bible";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const limitStr = searchParams.get("limit") || "40";
  const limit = Math.min(100, Math.max(1, parseInt(limitStr, 10) || 40));

  if (!q || q.trim().length < 2) {
    return NextResponse.json({ query: q, results: [] });
  }

  try {
    const results = searchCachedBible(q, limit);
    return NextResponse.json({ query: q, count: results.length, results });
  } catch (err: any) {
    console.error("API /api/tamil-bible/search error:", err);
    return NextResponse.json({ query: q, results: [], error: err?.message }, { status: 500 });
  }
}
