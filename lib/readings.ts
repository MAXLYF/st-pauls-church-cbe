import fs from "fs";
import path from "path";
import readings2026Raw from "@/data/readings-2026.json";
import fullReadingsCacheRaw from "@/data/full-readings-cache.json";

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

export interface FullReadingSection {
  heading: string;
  reference: string;
  intro?: string;
  paragraphs: string[];
  response?: string;
}

export interface FullReadingItem {
  slug: string;
  sourceUrl: string;
  dayTitle: string | null;
  firstReading?: FullReadingSection | null;
  psalm?: FullReadingSection | null;
  secondReading?: FullReadingSection | null;
  alleluia?: FullReadingSection | null;
  gospel?: FullReadingSection | null;
}

export interface DualReadingsData {
  success: boolean;
  date: string;
  en: ReadingItem | null;
  ta: ReadingItem | null;
  fullEn?: FullReadingItem | null;
  fullTa?: FullReadingItem | null;
  enError?: string | null;
  taError?: string | null;
}

const readings2026: Record<string, { date: string; en: ReadingItem | null; ta: ReadingItem | null }> = readings2026Raw as any;
const fullReadingsCache: Record<string, { date: string; en: FullReadingItem | null; ta: FullReadingItem | null }> = fullReadingsCacheRaw as any;

const memoryFullCache = new Map<string, { en: FullReadingItem | null; ta: FullReadingItem | null }>();

// Seed memory cache
if (fullReadingsCache && typeof fullReadingsCache === "object") {
  for (const [key, value] of Object.entries(fullReadingsCache)) {
    if (value && (value.en || value.ta)) {
      memoryFullCache.set(key, { en: value.en, ta: value.ta });
    }
  }
}

export function cleanHtmlText(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8211;/g, "–")
    .replace(/&ndash;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/✠/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function parseEnglishFull(html: string, slug: string): FullReadingItem {
  const dayDescMatch = html.match(/<h2[^>]*id=["']cgdaydesc["'][^>]*>([\s\S]*?)<\/h2>/i);
  const dayTitle = dayDescMatch ? cleanHtmlText(dayDescMatch[1]) : null;

  const parseSection = (srcId: string, txtId: string, defaultHeading: string): FullReadingSection | null => {
    const srcRegex = new RegExp(`<h2[^>]*id=["']${srcId}["'][^>]*>([\\s\\S]*?)<\\/h2>`, "i");
    const txtRegex = new RegExp(`<div[^>]*id=["']${txtId}["'][^>]*>([\\s\\S]*?)<\\/div>`, "i");
    const srcMatch = html.match(srcRegex);
    const txtMatch = html.match(txtRegex);

    if (!srcMatch && !txtMatch) return null;

    let heading = defaultHeading;
    let reference = "";
    if (srcMatch) {
      const fullHeading = cleanHtmlText(srcMatch[1]);
      const colonIdx = fullHeading.indexOf(":");
      if (colonIdx !== -1) {
        heading = fullHeading.substring(0, colonIdx).trim();
        reference = fullHeading.substring(colonIdx + 1).trim();
      } else {
        reference = fullHeading;
      }
    }

    const paragraphs: string[] = [];
    let response = "";

    if (txtMatch) {
      const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      let pMatch: RegExpExecArray | null;
      while ((pMatch = pRegex.exec(txtMatch[1])) !== null) {
        const pClean = cleanHtmlText(pMatch[1]);
        if (!pClean) continue;
        if (pClean.startsWith("R.") || pClean.includes("Responsorial") || /^\s*R\./i.test(pClean)) {
          if (!response) {
            response = pClean;
            if (response.includes("R.")) {
              response = response.substring(response.indexOf("R.")).trim();
            }
          }
        }
        paragraphs.push(pClean);
      }
    }

    if (paragraphs.length === 0 && !reference) return null;

    return {
      heading,
      reference,
      paragraphs,
      response: response || undefined
    };
  };

  return {
    slug,
    sourceUrl: `https://www.catholicgallery.org/mass-reading/${slug}/`,
    dayTitle,
    firstReading: parseSection("cgfrsrc", "cgfrtxt", "First Reading"),
    psalm: parseSection("cgrpsrc", "cgrptxt", "Responsorial Psalm"),
    secondReading: parseSection("cgsrsrc", "cgsrtxt", "Second Reading"),
    alleluia: parseSection("cgasrc", "cgatxt", "Alleluia"),
    gospel: parseSection("cggsrc", "cggtxt", "Gospel")
  };
}

export function parseTamilFull(html: string, slug: string): FullReadingItem {
  const dayTitleMatch = html.match(/<h2[^>]*class="[^"]*dayTitle[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
  const dayTitle = dayTitleMatch ? cleanHtmlText(dayTitleMatch[1]) : null;

  let firstReading: FullReadingSection | null = null;
  let psalm: FullReadingSection | null = null;
  let secondReading: FullReadingSection | null = null;
  let alleluia: FullReadingSection | null = null;
  let gospel: FullReadingSection | null = null;

  const readingDivRegex = /<div\s+class="readings"[^>]*data-readingname="([^"]+)"[^>]*>([\s\S]*?)<\/div>/gi;
  let match: RegExpExecArray | null;

  while ((match = readingDivRegex.exec(html)) !== null) {
    const rawName = match[1].trim();
    const content = match[2];

    const introMatch = content.match(/<p[^>]*class="[^"]*readingIntro[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const intro = introMatch ? cleanHtmlText(introMatch[1]) : undefined;

    let reference = "";
    const citeMatch = content.match(/<span[^>]*class="[^"]*italics[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    if (citeMatch) {
      reference = cleanHtmlText(citeMatch[1]);
    } else {
      const pCites = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      for (const c of pCites) {
        const text = cleanHtmlText(c);
        if (
          /\d+\s*:\s*\d+/.test(text) &&
          !text.includes("பதிலுரைப்") &&
          !text.includes("முதல் வாசகம்") &&
          !text.includes("நற்செய்தி வாசகம்")
        ) {
          reference = text;
          break;
        }
      }
    }

    const paragraphs: string[] = [];
    let response = "";

    if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) {
      const respMatch = content.match(/<p[^>]*>([\s\S]*?பல்லவி[\s\S]*?)<\/p>/i);
      if (respMatch) {
        let rawResp = cleanHtmlText(respMatch[1]);
        const lastIdx = rawResp.lastIndexOf("பல்லவி:");
        if (lastIdx !== -1) {
          rawResp = rawResp.substring(lastIdx).trim();
        } else {
          const fallbackIdx = rawResp.lastIndexOf("பல்லவி");
          if (fallbackIdx !== -1) rawResp = rawResp.substring(fallbackIdx).trim();
        }
        response = rawResp;
      }
      const strophes = content.match(/<span class="psmvcont">([\s\S]*?)<\/span>/gi) || [];
      if (strophes.length > 0) {
        for (const st of strophes) {
          const t = cleanHtmlText(st);
          if (t) paragraphs.push(t);
        }
      } else {
        const pList = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        for (const p of pList) {
          const t = cleanHtmlText(p);
          if (t && !t.includes("பதிலுரைப் பாடல்")) paragraphs.push(t);
        }
      }
    } else if (/வாழ்த்தொலி/i.test(rawName)) {
      const alleluiaMatch = content.match(/<p[^>]*class="[^"]*alleluiaTxt[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      if (alleluiaMatch) {
        paragraphs.push(cleanHtmlText(alleluiaMatch[1]));
      } else {
        const pList = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        for (const p of pList) {
          const t = cleanHtmlText(p);
          if (t && !t.includes("வாழ்த்தொலி")) paragraphs.push(t);
        }
      }
    } else {
      const pList = content.match(/<p[^>]*class="[^"]*readingTxt[^"]*"[^>]*>([\s\S]*?)<\/p>/gi) || [];
      if (pList.length > 0) {
        for (const p of pList) {
          const t = cleanHtmlText(p);
          if (t) paragraphs.push(t);
        }
      } else {
        const anyP = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        for (const p of anyP) {
          const t = cleanHtmlText(p);
          if (t && !t.includes("வாசகம்") && t !== intro && t !== reference) {
            paragraphs.push(t);
          }
        }
      }
    }

    let heading = rawName;
    if (/முதல்\s*வாசகம்/i.test(rawName)) heading = "முதல் வாசகம்";
    else if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) heading = "பதிலுரைப் பாடல்";
    else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) heading = "இரண்டாம் வாசகம்";
    else if (/வாழ்த்தொலி/i.test(rawName)) heading = "நற்செய்திக்கு முன் வாழ்த்தொலி";
    else if (/நற்செய்தி/i.test(rawName)) heading = "நற்செய்தி வாசகம்";

    const sectionData: FullReadingSection = {
      heading,
      reference,
      intro,
      paragraphs,
      response: response || undefined
    };

    if (/முதல்\s*வாசகம்/i.test(rawName)) {
      firstReading = sectionData;
    } else if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) {
      psalm = sectionData;
    } else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) {
      secondReading = sectionData;
    } else if (/வாழ்த்தொலி/i.test(rawName)) {
      alleluia = sectionData;
    } else if (/நற்செய்தி/i.test(rawName)) {
      gospel = sectionData;
    }
  }

  return {
    slug,
    sourceUrl: `https://bible.catholicgallery.org/tamil-mass-reading/${slug}/`,
    dayTitle,
    firstReading,
    psalm,
    secondReading,
    alleluia,
    gospel
  };
}

async function fetchEnglishHtml(enSlug: string, year: number): Promise<string> {
  const dailyUrl = `https://www.catholicgallery.org/mass-reading/${enSlug}/`;

  let res = await fetch(dailyUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    signal: AbortSignal.timeout(6000),
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
      throw new Error(`English reading link for ${enSlug} not found`);
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

  return await res.text();
}

async function fetchTamilHtml(taSlug: string, year: number): Promise<string> {
  const dailyUrl = `https://bible.catholicgallery.org/tamil-mass-reading/${taSlug}/`;

  let res = await fetch(dailyUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    signal: AbortSignal.timeout(6000),
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
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

  return await res.text();
}

export async function getReadingsForDate(dateStr: string): Promise<DualReadingsData> {
  let targetDate: Date;
  if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-").map(Number);
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

  // 1. Ticker entry
  const tickerEntry = readings2026[dateKey];
  let enSummary: ReadingItem | null = tickerEntry?.en || null;
  let taSummary: ReadingItem | null = tickerEntry?.ta || null;

  // 2. Full cache
  let fullEn: FullReadingItem | null = null;
  let fullTa: FullReadingItem | null = null;

  if (memoryFullCache.has(dateKey)) {
    const cached = memoryFullCache.get(dateKey)!;
    fullEn = cached.en;
    fullTa = cached.ta;
  }

  // 3. Fallback live fetch
  if (!fullEn || !fullTa) {
    try {
      const [enHtmlResult, taHtmlResult] = await Promise.allSettled([
        !fullEn ? fetchEnglishHtml(enSlug, year) : Promise.resolve(null),
        !fullTa ? fetchTamilHtml(taSlug, year) : Promise.resolve(null)
      ]);

      if (enHtmlResult.status === "fulfilled" && enHtmlResult.value) {
        fullEn = parseEnglishFull(enHtmlResult.value, enSlug);
      }
      if (taHtmlResult.status === "fulfilled" && taHtmlResult.value) {
        fullTa = parseTamilFull(taHtmlResult.value, taSlug);
      }

      if (fullEn || fullTa) {
        memoryFullCache.set(dateKey, { en: fullEn, ta: fullTa });

        try {
          const cachePath = path.join(process.cwd(), "data", "full-readings-cache.json");
          if (fs.existsSync(cachePath)) {
            const diskData = JSON.parse(fs.readFileSync(cachePath, "utf8"));
            diskData[dateKey] = { date: dateKey, en: fullEn, ta: fullTa };
            fs.writeFileSync(cachePath, JSON.stringify(diskData, null, 2), "utf8");
          }
        } catch (writeErr) {
          // Non-fatal
        }
      }
    } catch (fetchErr) {
      console.warn("Live fetch error for", dateKey, fetchErr);
    }
  }

  // Derive summaries if missing
  if (!enSummary && fullEn) {
    const parts: string[] = ["📖 TODAY'S MASS READINGS"];
    if (fullEn.firstReading?.reference) parts.push(`First Reading: ${fullEn.firstReading.reference}`);
    if (fullEn.psalm?.reference) parts.push(`Psalm: ${fullEn.psalm.reference}`);
    if (fullEn.secondReading?.reference) parts.push(`Second Reading: ${fullEn.secondReading.reference}`);
    if (fullEn.gospel?.reference) parts.push(`Gospel: ${fullEn.gospel.reference}`);
    enSummary = {
      slug: enSlug,
      sourceUrl: fullEn.sourceUrl,
      firstReading: fullEn.firstReading?.reference || null,
      psalm: fullEn.psalm?.reference || null,
      secondReading: fullEn.secondReading?.reference || null,
      alleluia: fullEn.alleluia?.reference || null,
      gospel: fullEn.gospel?.reference || null,
      dayDescription: fullEn.dayTitle,
      tickerText: parts.join(" | ")
    };
  }

  if (!taSummary && fullTa) {
    const parts: string[] = ["📖 இன்றைய திருப்பலி வாசகங்கள்"];
    if (fullTa.firstReading?.reference) parts.push(`முதல் வாசகம்: ${fullTa.firstReading.reference}`);
    if (fullTa.psalm?.reference) parts.push(`திருப்பாடல்: ${fullTa.psalm.reference}`);
    if (fullTa.secondReading?.reference) parts.push(`இரண்டாம் வாசகம்: ${fullTa.secondReading.reference}`);
    if (fullTa.gospel?.reference) parts.push(`நற்செய்தி: ${fullTa.gospel.reference}`);
    taSummary = {
      slug: taSlug,
      sourceUrl: fullTa.sourceUrl,
      firstReading: fullTa.firstReading?.reference || null,
      psalm: fullTa.psalm?.reference || null,
      secondReading: fullTa.secondReading?.reference || null,
      alleluia: fullTa.alleluia?.reference || null,
      gospel: fullTa.gospel?.reference || null,
      dayDescription: fullTa.dayTitle,
      tickerText: parts.join(" | ")
    };
  }

  return {
    success: true,
    date: dateKey,
    en: enSummary,
    ta: taSummary,
    fullEn,
    fullTa,
    enError: !enSummary && !fullEn ? "English reading unavailable" : null,
    taError: !taSummary && !fullTa ? "Tamil reading unavailable" : null
  };
}
