import { NextRequest, NextResponse } from "next/server";
import { getReadingsForDate, ReadingItem, FullReadingItem, FullReadingSection, DualReadingsData } from "@/lib/readings";

export type { ReadingItem, FullReadingItem, FullReadingSection, DualReadingsData };

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date") || "";

    const result = await getReadingsForDate(dateParam);

    return NextResponse.json({
      ...result,
      // Backward compatibility top-level fields for legacy callers
      ...(result.en || {})
    });
  } catch (error: any) {
    console.error("Error retrieving daily mass readings:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Mass Readings temporarily unavailable.",
        taError: "திருப்பலி வாசகங்கள் தற்காலிகமாக கிடைக்கவில்லை."
      },
      { status: 500 }
    );
  }
}
