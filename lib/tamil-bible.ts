import fs from "fs";
import path from "path";
import https from "https";

export interface BibleBook {
  order: number;
  slug: string;
  tamilName: string;
  englishName: string;
  testament: "OT" | "NT";
  totalChapters: number;
  chapters: number[];
}

export type ChapterItem =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "verse"; verse: string; text: string };

export interface ChapterData {
  bookSlug: string;
  bookName: string;
  bookEnglishName: string;
  chapter: number;
  testament: "OT" | "NT";
  title: string;
  items: ChapterItem[];
  crossrefs: string[];
  footnotes: string[];
  prevChapter: { bookSlug: string; chapter: number; bookName: string } | null;
  nextChapter: { bookSlug: string; chapter: number; bookName: string } | null;
}

const CACHE_DIR = path.join(process.cwd(), "data", "tamil-bible-cache");

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

let booksCache: BibleBook[] | null = null;

export function getAllBooks(): BibleBook[] {
  if (booksCache) return booksCache;
  const filePath = path.join(process.cwd(), "data", "tamil-bible-books.json");
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf8");
    booksCache = JSON.parse(raw);
    return booksCache || [];
  }
  return [];
}

export function getBookBySlug(slug: string): BibleBook | undefined {
  const books = getAllBooks();
  return books.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
}

function decodeEntities(str: string): string {
  return str
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8230;/g, "…")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

export function parseBibleHtml(html: string): {
  items: ChapterItem[];
  crossrefs: string[];
  footnotes: string[];
} {
  const startIndex = html.indexOf('id="etbcont"');
  if (startIndex === -1) {
    return { items: [], crossrefs: [], footnotes: [] };
  }

  let endIndex = html.length;
  const navIdx = html.indexOf("<nav", startIndex);
  if (navIdx !== -1 && navIdx < endIndex) endIndex = navIdx;
  const commentsIdx = html.indexOf('id="comments"', startIndex);
  if (commentsIdx !== -1 && commentsIdx < endIndex) endIndex = commentsIdx;

  const fullSectionHtml = html.substring(startIndex, endIndex);

  // Extract cross-references
  const crossrefs: string[] = [];
  const crRegex = /<div class=["']crossref["']>([\s\S]*?)<\/div>/gi;
  let crMatch;
  while ((crMatch = crRegex.exec(fullSectionHtml)) !== null) {
    const text = decodeEntities(crMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (text) crossrefs.push(text);
  }

  // Extract footnotes
  const footnotes: string[] = [];
  const fnRegex = /<div class=["']footnote["']>([\s\S]*?)<\/div>/gi;
  let fnMatch;
  while ((fnMatch = fnRegex.exec(fullSectionHtml)) !== null) {
    const text = decodeEntities(fnMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (text) footnotes.push(text);
  }

  // Verses body is strictly before cgcrossref, cgfootnote, or etbcopy
  let versesEnd = fullSectionHtml.length;
  const crPos = fullSectionHtml.search(/<div[^>]*class=["']cgcrossref["']/i);
  if (crPos !== -1 && crPos < versesEnd) versesEnd = crPos;
  const fnPos = fullSectionHtml.search(/<div[^>]*class=["']cgfootnote["']/i);
  if (fnPos !== -1 && fnPos < versesEnd) versesEnd = fnPos;
  const copyPos = fullSectionHtml.search(/<div[^>]*id=["']etbcopy["']/i);
  if (copyPos !== -1 && copyPos < versesEnd) versesEnd = copyPos;

  const cleanHtml = fullSectionHtml
    .substring(0, versesEnd)
    .replace(/<div class=["'][^"']*cgAd[^"']*["']>[\s\S]*?<\/div>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "");

  const marked = cleanHtml
    .replace(/<h2[^>]*class=["'][^"']*cg_heading[^"']*["'][^>]*>([\s\S]*?)<\/h2>/gi, "\n§§HEADING::$1§§\n")
    .replace(/<p[^>]*class=["'][^"']*cg_subhdg[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, "\n§§SUBHEADING::$1§§\n")
    .replace(/<span[^>]*class=["'][^"']*bibvnum[^"']*["']>([\s\S]*?)<\/span>/gi, "\n§§VERSE::$1§§\n");

  const parts = marked.split("§§");
  const items: ChapterItem[] = [];
  let currentVerseNum: string | null = null;
  let currentVerseText = "";

  function flushVerse() {
    if (currentVerseNum && currentVerseText.trim()) {
      items.push({
        type: "verse",
        verse: currentVerseNum,
        text: decodeEntities(currentVerseText.trim().replace(/\s+/g, " "))
      });
    }
    currentVerseNum = null;
    currentVerseText = "";
  }

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;

    if (part.startsWith("HEADING::")) {
      flushVerse();
      const txt = decodeEntities(
        part.replace("HEADING::", "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      );
      if (txt) items.push({ type: "heading", text: txt });
    } else if (part.startsWith("SUBHEADING::")) {
      flushVerse();
      const txt = decodeEntities(
        part.replace("SUBHEADING::", "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      );
      if (txt) items.push({ type: "subheading", text: txt });
    } else if (part.startsWith("VERSE::")) {
      flushVerse();
      currentVerseNum = part.replace("VERSE::", "").replace(/<[^>]+>/g, "").trim();
    } else {
      const cleanText = part
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/p>/gi, " ")
        .replace(/<[^>]+>/g, " ");

      if (currentVerseNum) {
        currentVerseText += " " + cleanText;
      }
    }
  }
  flushVerse();

  return { items, crossrefs, footnotes };
}

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
          }
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            fetchUrl(res.headers.location).then(resolve);
            return;
          }
          const chunks: Buffer[] = [];
          res.on("data", (d) => chunks.push(d));
          res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        }
      )
      .on("error", () => resolve(""));
  });
}

export function computeNavigation(
  bookSlug: string,
  chapter: number
): {
  prev: { bookSlug: string; chapter: number; bookName: string } | null;
  next: { bookSlug: string; chapter: number; bookName: string } | null;
} {
  const books = getAllBooks();
  const bookIndex = books.findIndex((b) => b.slug.toLowerCase() === bookSlug.toLowerCase());
  if (bookIndex === -1) return { prev: null, next: null };

  const currentBook = books[bookIndex];

  let prev: { bookSlug: string; chapter: number; bookName: string } | null = null;
  let next: { bookSlug: string; chapter: number; bookName: string } | null = null;

  // Previous Chapter
  if (chapter > 1) {
    prev = {
      bookSlug: currentBook.slug,
      chapter: chapter - 1,
      bookName: currentBook.tamilName
    };
  } else if (bookIndex > 0) {
    const prevBook = books[bookIndex - 1];
    prev = {
      bookSlug: prevBook.slug,
      chapter: prevBook.totalChapters,
      bookName: prevBook.tamilName
    };
  }

  // Next Chapter
  if (chapter < currentBook.totalChapters) {
    next = {
      bookSlug: currentBook.slug,
      chapter: chapter + 1,
      bookName: currentBook.tamilName
    };
  } else if (bookIndex < books.length - 1) {
    const nextBook = books[bookIndex + 1];
    next = {
      bookSlug: nextBook.slug,
      chapter: 1,
      bookName: nextBook.tamilName
    };
  }

  return { prev, next };
}

export async function getChapter(bookSlug: string, chapter: number): Promise<ChapterData | null> {
  const book = getBookBySlug(bookSlug);
  if (!book) return null;

  const validChapter = Math.max(1, Math.min(chapter, book.totalChapters));
  const cacheFile = path.join(CACHE_DIR, `${book.slug}-${validChapter}.json`);

  // Check disk cache first
  if (fs.existsSync(cacheFile)) {
    try {
      const data: ChapterData = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
      // Ensure navigation is dynamically accurate
      const nav = computeNavigation(book.slug, validChapter);
      data.prevChapter = nav.prev;
      data.nextChapter = nav.next;
      return data;
    } catch (e) {
      // If corrupted, re-fetch
    }
  }

  // Fetch from Catholic Gallery
  const url = `https://bible.catholicgallery.org/tamil/etb-${book.slug}-${validChapter}/`;
  const html = await fetchUrl(url);
  if (!html) return null;

  const parsed = parseBibleHtml(html);
  if (parsed.items.length === 0) return null;

  const nav = computeNavigation(book.slug, validChapter);

  const chapterData: ChapterData = {
    bookSlug: book.slug,
    bookName: book.tamilName,
    bookEnglishName: book.englishName,
    chapter: validChapter,
    testament: book.testament,
    title: `${book.tamilName} — அதிகாரம் ${validChapter}`,
    items: parsed.items,
    crossrefs: parsed.crossrefs,
    footnotes: parsed.footnotes,
    prevChapter: nav.prev,
    nextChapter: nav.next
  };

  // Cache to disk
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(chapterData, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write chapter cache:", err);
  }

  return chapterData;
}

export interface SearchResult {
  bookSlug: string;
  bookName: string;
  bookEnglishName: string;
  chapter: number;
  verse: string;
  text: string;
}

export function searchCachedBible(query: string, limit = 50): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  if (!fs.existsSync(CACHE_DIR)) return results;

  const files = fs.readdirSync(CACHE_DIR).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    if (results.length >= limit) break;
    try {
      const filePath = path.join(CACHE_DIR, file);
      const data: ChapterData = JSON.parse(fs.readFileSync(filePath, "utf8"));

      for (const item of data.items) {
        if (item.type === "verse" && item.text.toLowerCase().includes(q)) {
          results.push({
            bookSlug: data.bookSlug,
            bookName: data.bookName,
            bookEnglishName: data.bookEnglishName,
            chapter: data.chapter,
            verse: item.verse,
            text: item.text
          });
          if (results.length >= limit) break;
        }
      }
    } catch {
      // Continue to next file
    }
  }

  return results;
}
