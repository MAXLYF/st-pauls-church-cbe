const https = require('https');
const fs = require('fs');
const path = require('path');

const outputFile = path.join(__dirname, '..', 'data', 'readings-2026.json');
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load existing data if any so we can resume or append
let database = {};
if (fs.existsSync(outputFile)) {
  try {
    database = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    console.log(`Loaded ${Object.keys(database).length} existing dates from database.`);
  } catch (e) {
    database = {};
  }
}

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      },
      res => {
        let data = '';
        res.on('data', d => (data += d));
        res.on('end', () => resolve({ ok: res.statusCode === 200, status: res.statusCode, html: data }));
      }
    ).on('error', (err) => resolve({ ok: false, status: 500, error: err.message }));
  });
}

function cleanRef(ref) {
  if (!ref) return null;
  return ref
    .replace(/<[^>]+>/g, '')
    .replace(/&#8211;/g, '–')
    .replace(/&ndash;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/:\s+/g, ': ')
    .replace(/(\d+)\s*-\s*(\d+)/g, '$1–$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractEnglishSection(html, id, prefix) {
  const idRegex = new RegExp(`<h2[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/h2>`, 'i');
  let match = html.match(idRegex);
  if (!match) {
    const prefixRegex = new RegExp(`<h[23][^>]*>\\s*${prefix}:?([\\s\\S]*?)<\\/h[23]>`, 'i');
    match = html.match(prefixRegex);
  }
  if (!match) return null;

  let text = match[1].replace(/<[^>]+>/g, '').trim();
  text = text.replace(new RegExp(`^${prefix}:?\\s*`, 'i'), '').trim();
  return cleanRef(text);
}

function cleanTamilText(str) {
  if (!str) return null;
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&ndash;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/✠/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function simplifyTamilCitation(text) {
  if (!text) return null;
  const cleaned = text.trim();
  const verseMatch = cleaned.match(/(\d+\s*:\s*[\d\s,.\-–]+)/);
  if (!verseMatch) return cleaned;

  const verses = verseMatch[1].trim();

  let book = cleaned.replace(verseMatch[0], '').trim();
  book = book
    .replace(/^இறைவாக்கினர்\s+/i, '')
    .replace(/^திருத்தூதர்\s+பவுல்\s+/i, '')
    .replace(/^திருத்தூதர்\s+/i, '')
    .replace(/நூலிலிருந்து\s*வாசகம்/gi, '')
    .replace(/எழுதிய\s*(முதலாம்|இரண்டாம்|மூன்றாம்|தூய)?\s*திருமுகத்திலிருந்து\s*வாசகம்/gi, '')
    .replace(/எழுதப்பட்ட\s*திருமுகத்திலிருந்து\s*வாசகம்/gi, '')
    .replace(/எழுதிய\s*தூய\s*நற்செய்தியிலிருந்து\s*வாசகம்/gi, '')
    .replace(/எழுதிய\s*நற்செய்தியிலிருந்து\s*வாசகம்/gi, '')
    .replace(/நூலிலிருந்து/gi, '')
    .replace(/வாசகம்/gi, '')
    .trim();

  book = book.replace(/ருக்கு$|ருக்கு\s+/g, 'ர்').replace(/க்கு$|க்கு\s+/g, '');

  if (book && book.length > 1) {
    return `${book} ${verses}`;
  }
  return cleaned;
}

function extractTamilCitation(content, type) {
  const pMatches = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  for (const tag of pMatches) {
    const clean = cleanTamilText(tag);
    if (!clean) continue;
    if (
      clean === type ||
      clean === 'முதல் வாசகம்' ||
      clean === 'இரண்டாம் வாசகம்' ||
      clean === 'நற்செய்தி வாசகம்' ||
      clean === 'நற்செய்தி'
    ) {
      continue;
    }
    if (/\d+\s*:\s*\d+/.test(clean)) {
      return clean;
    }
  }
  return null;
}

function extractTamilPsalmCitation(content) {
  const spanMatch = content.match(/<span[^>]*class="[^"]*italics[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
  if (spanMatch) {
    const clean = cleanTamilText(spanMatch[1]);
    if (clean) return clean;
  }
  const pMatches = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  for (const tag of pMatches) {
    const clean = cleanTamilText(tag);
    if (!clean) continue;
    if (clean.includes('பதிலுரைப் பாடல்') || clean.includes('பதிலுரைப்பாடல்')) continue;
    if (/திபா|திருப்பாடல்|\d+\s*:/.test(clean)) {
      return clean;
    }
  }
  return null;
}

function parseEnglishHtml(html, slug) {
  const firstReading = extractEnglishSection(html, 'cgfrsrc', 'First Reading');
  let psalm = extractEnglishSection(html, 'cgrpsrc', 'Responsorial Psalm');
  if (psalm) {
    psalm = psalm.replace(/^Psalms\b/i, 'Psalm');
  }
  const secondReading = extractEnglishSection(html, 'cgsrsrc', 'Second Reading');
  const alleluia = extractEnglishSection(html, 'cgasrc', 'Alleluia');
  const gospel = extractEnglishSection(html, 'cggsrc', 'Gospel');

  const dayDescMatch = html.match(/<h2[^>]*id=["']cgdaydesc["'][^>]*>([\s\S]*?)<\/h2>/i);
  const dayDescription = dayDescMatch ? dayDescMatch[1].replace(/<[^>]+>/g, '').trim() : null;

  const parts = ["📖 TODAY'S MASS READINGS"];
  if (firstReading) parts.push(`First Reading: ${firstReading}`);
  if (psalm) parts.push(`Psalm: ${psalm}`);
  if (secondReading) parts.push(`Second Reading: ${secondReading}`);
  if (gospel) parts.push(`Gospel: ${gospel}`);

  const tickerText = parts.join(' | ');

  return {
    slug,
    sourceUrl: `https://www.catholicgallery.org/mass-reading/${slug}/`,
    firstReading,
    psalm,
    secondReading,
    alleluia,
    gospel,
    dayDescription,
    tickerText
  };
}

function parseTamilHtml(html, slug) {
  let firstReading = null;
  let psalm = null;
  let secondReading = null;
  let gospel = null;

  const readingDivRegex = /<div\s+class="readings"[^>]*data-readingname="([^"]+)"[^>]*>([\s\S]*?)<\/div>/gi;
  let match;
  while ((match = readingDivRegex.exec(html)) !== null) {
    const rawName = match[1].trim();
    const content = match[2];

    if (/முதல்\s*வாசகம்/i.test(rawName)) {
      const rawFr = extractTamilCitation(content, 'முதல் வாசகம்');
      firstReading = simplifyTamilCitation(rawFr);
    } else if (/பதிலுரைப்?\s*பாடல்|திருப்பாடல்/i.test(rawName)) {
      psalm = extractTamilPsalmCitation(content);
    } else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) {
      const rawSr = extractTamilCitation(content, 'இரண்டாம் வாசகம்');
      secondReading = simplifyTamilCitation(rawSr);
    } else if (/நற்செய்தி\s*வாசகம்|நற்செய்தி/i.test(rawName) && !/முன்\s*வாழ்த்தொலி/i.test(rawName)) {
      const rawGospel = extractTamilCitation(content, 'நற்செய்தி வாசகம்');
      gospel = simplifyTamilCitation(rawGospel);
    }
  }

  const dayTitleMatch = html.match(/<h2[^>]*class="[^"]*dayTitle[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
  const dayDescription = dayTitleMatch ? cleanTamilText(dayTitleMatch[1]) : null;

  const parts = ['📖 இன்றைய திருப்பலி வாசகங்கள்'];
  if (firstReading) parts.push(`முதல் வாசகம்: ${firstReading}`);
  if (psalm) parts.push(`திருப்பாடல்: ${psalm}`);
  if (secondReading) parts.push(`இரண்டாம் வாசகம்: ${secondReading}`);
  if (gospel) parts.push(`நற்செய்தி: ${gospel}`);

  const tickerText = parts.join(' | ');

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

async function fetchDay(year, month, day) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yy = String(year).slice(-2);
  const enSlug = `${dd}${mm}${yy}`;
  const taSlug = `tr-${dd}${mm}${yy}`;
  const dateKey = `${year}-${mm}-${dd}`;

  if (database[dateKey] && database[dateKey].en && database[dateKey].ta) {
    return; // Already present
  }

  const [enRes, taRes] = await Promise.all([
    fetchUrl(`https://www.catholicgallery.org/mass-reading/${enSlug}/`),
    fetchUrl(`https://bible.catholicgallery.org/tamil-mass-reading/${taSlug}/`)
  ]);

  const enData = enRes.ok ? parseEnglishHtml(enRes.html, enSlug) : (database[dateKey]?.en || null);
  const taData = taRes.ok ? parseTamilHtml(taRes.html, taSlug) : (database[dateKey]?.ta || null);

  database[dateKey] = {
    date: dateKey,
    en: enData,
    ta: taData
  };
}

async function run() {
  const year = 2026;
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Prioritize current & nearby months: Oct (10), Nov (11), Dec (12), Sep (9), Aug (8), etc.
  const monthOrder = [10, 11, 12, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const allDates = [];
  for (const m of monthOrder) {
    const days = daysInMonth[m - 1];
    for (let d = 1; d <= days; d++) {
      allDates.push({ year, month: m, day: d });
    }
  }

  console.log(`Starting fetch for ${allDates.length} days of 2026...`);

  const BATCH_SIZE = 8;
  for (let i = 0; i < allDates.length; i += BATCH_SIZE) {
    const batch = allDates.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(d => fetchDay(d.year, d.month, d.day)));
    console.log(`Progress: ${Math.min(i + BATCH_SIZE, allDates.length)} / ${allDates.length} days processed.`);
    
    // Periodically save to file
    fs.writeFileSync(outputFile, JSON.stringify(database, null, 2), 'utf8');

    // Polite delay
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(outputFile, JSON.stringify(database, null, 2), 'utf8');
  console.log(`COMPLETED! Saved ${Object.keys(database).length} dates to ${outputFile}`);
}

run().catch(console.error);
