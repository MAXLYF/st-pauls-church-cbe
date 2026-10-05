import { NextRequest, NextResponse } from "next/server";
import { getChapter, getBookBySlug } from "@/lib/tamil-bible";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookSlug = searchParams.get("book") || "genesis";
  const chapterStr = searchParams.get("chapter") || "1";
  const chapter = parseInt(chapterStr, 10);

  if (isNaN(chapter) || chapter < 1) {
    return NextResponse.json({ error: "Invalid chapter number" }, { status: 400 });
  }

  const book = getBookBySlug(bookSlug);
  if (!book) {
    return NextResponse.json({ error: "Bible book not found" }, { status: 404 });
  }

  try {
    const data = await getChapter(bookSlug, chapter);
    if (!data) {
      return NextResponse.json(
        { error: "Could not retrieve Bible chapter from source." },
        { status: 502 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800"
      }
    });
  } catch (err: any) {
    console.error("API /api/tamil-bible/chapter error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
