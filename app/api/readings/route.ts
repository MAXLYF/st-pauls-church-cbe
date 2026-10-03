import { NextRequest, NextResponse } from "next/server";

export interface ReadingItem {
  slug: string;
  sourceUrl: string;
  firstReading: string | null;
  psalm: string | null;
  secondReading: string | null;
  alleluia: string | null;
  gospel: string | null;
  dayDescription: string | null;
  tickerText: string;
}

export interface DualReadingsData {
  date: string;
  en: ReadingItem | null;
  ta: ReadingItem | null;
  enError?: string | null;
  taError?: string | null;
}

// In-memory cache for temporary date caching
const cache = new Map<string, { data: DualReadingsData; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function cleanRef(ref: string | null): string | null {
  if (!ref) return null;
  return ref
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;/g, "–")
    .replace(/&ndash;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/:\s+/g, ": ")
    .replace(/(\d+)\s*-\s*(\d+)/g, "$1–$2")
    .replace(/\s+/g, " ")
    .trim();
}

function extractEnglishSection(html: string, id: string, prefix: string): string | null {
  const idRegex = new RegExp(`<h2[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/h2>`, "i");
  let match = html.match(idRegex);
  if (!match) {
    const prefixRegex = new RegExp(`<h[23][^>]*>\\s*${prefix}:?([\\s\\S]*?)<\\/h[23]>`, "i");
    match = html.match(prefixRegex);
  }
  if (!match) return null;

  let text = match[1].replace(/<[^>]+>/g, "").trim();
  text = text.replace(new RegExp(`^${prefix}:?\\s*`, "i"), "").trim();
  return cleanRef(text);
}

function cleanTamilText(str: string | null): string | null {
  if (!str) return null;
  return str
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&ndash;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/✠/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function simplifyTamilCitation(text: string | null): string | null {
  if (!text) return null;
  const cleaned = text.trim();
  const verseMatch = cleaned.match(/(\d+\s*:\s*[\d\s,.\-–]+)/);
  if (!verseMatch) return cleaned;

  const verses = verseMatch[1].trim();

  let book = cleaned.replace(verseMatch[0], "").trim();
  book = book
    .replace(/^இறைவாக்கினர்\s+/i, "")
    .replace(/^திருத்தூதர்\s+பவுல்\s+/i, "")
    .replace(/^திருத்தூதர்\s+/i, "")
    .replace(/நூலிலிருந்து\s*வாசகம்/gi, "")
    .replace(/எழுதிய\s*(முதலாம்|இரண்டாம்|மூன்றாம்|தூய)?\s*திருமுகத்திலிருந்து\s*வாசகம்/gi, "")
    .replace(/எழுதப்பட்ட\s*திருமுகத்திலிருந்து\s*வாசகம்/gi, "")
    .replace(/எழுதிய\s*தூய\s*நற்செய்தியிலிருந்து\s*வாசகம்/gi, "")
    .replace(/எழுதிய\s*நற்செய்தியிலிருந்து\s*வாசகம்/gi, "")
    .replace(/நூலிலிருந்து/gi, "")
    .replace(/வாசகம்/gi, "")
    .trim();

  book = book.replace(/ருக்கு$|ருக்கு\s+/g, "ர்").replace(/க்கு$|க்கு\s+/g, "");

  if (book && book.length > 1) {
    return `${book} ${verses}`;
  }
  return cleaned;
}

function extractTamilCitation(content: string, type: string): string | null {
  const pMatches = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  for (const tag of pMatches) {
    const clean = cleanTamilText(tag);
    if (!clean) continue;
    if (
      clean === type ||
      clean === "முதல் வாசகம்" ||
      clean === "இரண்டாம் வாசகம்" ||
      clean === "நற்செய்தி வாசகம்" ||
      clean === "நற்செய்தி"
    ) {
      continue;
    }
    if (/\d+\s*:\s*\d+/.test(clean)) {
      return clean;
    }
  }
  return null;
}

function extractTamilPsalmCitation(content: string): string | null {
  const spanMatch = content.match(/<span[^>]*class="[^"]*italics[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
  if (spanMatch) {
    const clean = cleanTamilText(spanMatch[1]);
    if (clean) return clean;
  }
  const pMatches = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  for (const tag of pMatches) {
    const clean = cleanTamilText(tag);
    if (!clean) continue;
    if (clean.includes("பதிலுரைப் பாடல்") || clean.includes("பதிலுரைப்பாடல்")) continue;
    if (/திபா|திருப்பாடல்|\d+\s*:/.test(clean)) {
      return clean;
    }
  }
  return null;
}

function parseTamilHtml(html: string, slug: string): ReadingItem {
  let firstReading: string | null = null;
  let psalm: string | null = null;
  let secondReading: string | null = null;
  let gospel: string | null = null;

  const readingDivRegex = /<div\s+class="readings"[^>]*data-readingname="([^"]+)"[^>]*>([\s\S]*?)<\/div>/gi;
  let match: RegExpExecArray | null;
  while ((match = readingDivRegex.exec(html)) !== null) {
    const rawName = match[1].trim();
    const content = match[2];

    if (/முதல்\s*வாசகம்/i.test(rawName)) {
      const rawFr = extractTamilCitation(content, "முதல் வாசகம்");
      firstReading = simplifyTamilCitation(rawFr);
    } else if (/பதிலுரைப்?\s*பாடல்|திருப்பாடல்/i.test(rawName)) {
      psalm = extractTamilPsalmCitation(content);
    } else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) {
      const rawSr = extractTamilCitation(content, "இரண்டாம் வாசகம்");
      secondReading = simplifyTamilCitation(rawSr);
    } else if (/நற்செய்தி\s*வாசகம்|நற்செய்தி/i.test(rawName) && !/முன்\s*வாழ்த்தொலி/i.test(rawName)) {
      const rawGospel = extractTamilCitation(content, "நற்செய்தி வாசகம்");
      gospel = simplifyTamilCitation(rawGospel);
    }
  }

  // Day description / title
  const dayTitleMatch = html.match(/<h2[^>]*class="[^"]*dayTitle[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
  const dayDescription = dayTitleMatch ? cleanTamilText(dayTitleMatch[1]) : null;

  // Build ticker text:
  // 📖 இன்றைய திருப்பலி வாசகங்கள் | முதல் வாசகம்: ... | திருப்பாடல்: ... | நற்செய்தி: ...
  const parts: string[] = ["📖 இன்றைய திருப்பலி வாசகங்கள்"];
  if (firstReading) parts.push(`முதல் வாசகம்: ${firstReading}`);
  if (psalm) parts.push(`திருப்பாடல்: ${psalm}`);
  if (secondReading) parts.push(`இரண்டாம் வாசகம்: ${secondReading}`);
  if (gospel) parts.push(`நற்செய்தி: ${gospel}`);

  const tickerText = parts.join(" | ");

  return {
    slug,
    sourceUrl: `https://bible.catholicgallery.org/tamil-mass-reading/${slug}/`,
    firstReading,
    psalm,
    secondReading,
    alleluia: null,
    gospel,
    dayDescription,
    tickerText
  };
}

async function fetchEnglishReading(enSlug: string, year: number): Promise<ReadingItem> {
  const dailyUrl = `https://www.catholicgallery.org/mass-reading/${enSlug}/`;

  let res = await fetch(dailyUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    const indexUrl = `https://www.catholicgallery.org/mass-reading/daily-mass-readings-${year}/`;
    const indexRes = await fetch(indexUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });

    if (!indexRes.ok) {
      throw new Error("English Catholic Gallery index unavailable");
    }

    const indexHtml = await indexRes.text();
    const linkMatch = indexHtml.match(
      new RegExp(`href=["'](https:\\/\\/www\\.catholicgallery\\.org\\/mass-reading\\/${enSlug}\\/?)["']`, "i")
    );

    if (!linkMatch) {
      throw new Error(`English Catholic Gallery reading link for ${enSlug} not found`);
    }

    res = await fetch(linkMatch[1], {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch resolved English page");
    }
  }

  const html = await res.text();

  const firstReading = extractEnglishSection(html, "cgfrsrc", "First Reading");
  let psalm = extractEnglishSection(html, "cgrpsrc", "Responsorial Psalm");
  if (psalm) {
    psalm = psalm.replace(/^Psalms\b/i, "Psalm");
  }
  const secondReading = extractEnglishSection(html, "cgsrsrc", "Second Reading");
  const alleluia = extractEnglishSection(html, "cgasrc", "Alleluia");
  const gospel = extractEnglishSection(html, "cggsrc", "Gospel");

  const dayDescMatch = html.match(/<h2[^>]*id=["']cgdaydesc["'][^>]*>([\s\S]*?)<\/h2>/i);
  const dayDescription = dayDescMatch ? dayDescMatch[1].replace(/<[^>]+>/g, "").trim() : null;

  const parts: string[] = ["📖 TODAY'S MASS READINGS"];
  if (firstReading) parts.push(`First Reading: ${firstReading}`);
  if (psalm) parts.push(`Psalm: ${psalm}`);
  if (secondReading) parts.push(`Second Reading: ${secondReading}`);
  if (gospel) parts.push(`Gospel: ${gospel}`);

  const tickerText = parts.join(" | ");

  return {
    slug: enSlug,
    sourceUrl: dailyUrl,
    firstReading,
    psalm,
    secondReading,
    alleluia,
    gospel,
    dayDescription,
    tickerText
  };
}

async function fetchTamilReading(taSlug: string, year: number): Promise<ReadingItem> {
  const dailyUrl = `https://bible.catholicgallery.org/tamil-mass-reading/${taSlug}/`;

  let res = await fetch(dailyUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    // If direct link fails, check the year index page
    const indexUrl = `https://bible.catholicgallery.org/tamil-mass-reading/tr-${year}/`;
    const indexRes = await fetch(indexUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });

    if (!indexRes.ok) {
      throw new Error("Tamil Catholic Gallery index unavailable");
    }

    const indexHtml = await indexRes.text();
    const linkMatch = indexHtml.match(
      new RegExp(`href=["'](https:\\/\\/bible\\.catholicgallery\\.org\\/tamil-mass-reading\\/${taSlug}\\/?)["']`, "i")
    );

    if (!linkMatch) {
      throw new Error(`Tamil reading for ${taSlug} not found in index`);
    }

    res = await fetch(linkMatch[1], {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch resolved Tamil reading page");
    }
  }

  const html = await res.text();
  return parseTamilHtml(html, taSlug);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date"); // e.g. "2026-10-03"

    let targetDate: Date;
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      const [y, m, d] = dateParam.split("-").map(Number);
      targetDate = new Date(y, m - 1, d);
    } else {
      targetDate = new Date();
    }

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();

    const dd = String(day).padStart(2, "0");
    const mm = String(month).padStart(2, "0");
    const yy = String(year).slice(-2);

    const enSlug = `${dd}${mm}${yy}`;
    const taSlug = `tr-${dd}${mm}${yy}`;
    const dateKey = `${year}-${mm}-${dd}`;

    // Check temporary in-memory cache
    const cached = cache.get(dateKey);
    const now = Date.now();
    if (cached && now - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        ...cached.data,
        // Backward compatibility top-level fields
        ...(cached.data.en || {})
      });
    }

    // Fetch both English and Tamil readings in parallel
    const [enResult, taResult] = await Promise.allSettled([
      fetchEnglishReading(enSlug, year),
      fetchTamilReading(taSlug, year)
    ]);

    let enData: ReadingItem | null = null;
    let enError: string | null = null;
    if (enResult.status === "fulfilled") {
      enData = enResult.value;
    } else {
      console.warn("Failed to fetch English daily mass readings:", enResult.reason);
      enError = "Today's Mass Readings are temporarily unavailable. Please try again shortly.";
    }

    let taData: ReadingItem | null = null;
    let taError: string | null = null;
    if (taResult.status === "fulfilled") {
      taData = taResult.value;
    } else {
      console.warn("Failed to fetch Tamil daily mass readings:", taResult.reason);
      taError = "தமிழ் திருப்பலி வாசகங்கள் தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்.";
    }

    // If both failed, return error
    if (!enData && !taData) {
      return NextResponse.json(
        {
          success: false,
          error: "Today's Mass Readings are temporarily unavailable. Please try again shortly.",
          taError: "தமிழ் திருப்பலி வாசகங்கள் தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்."
        },
        { status: 502 }
      );
    }

    const dualData: DualReadingsData = {
      date: dateKey,
      en: enData,
      ta: taData,
      enError,
      taError
    };

    // Cache successful reading
    cache.set(dateKey, { data: dualData, timestamp: Date.now() });

    return NextResponse.json({
      success: true,
      ...dualData,
      // Backward compatibility top-level fields
      ...(enData || {})
    });
  } catch (error: any) {
    console.error("Error retrieving daily mass readings:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Today's Mass Readings are temporarily unavailable. Please try again shortly.",
        taError: "தமிழ் திருப்பலி வாசகங்கள் தற்போது கிடைக்கவில்லை. சிறிது நேரம் கழித்து முயற்சிக்கவும்."
      },
      { status: 500 }
    );
  }
}

