const https = require('https');
const fs = require('fs');
const path = require('path');

const outputFile = path.join(__dirname, '..', 'data', 'readings-2027.json');
const fullCachePath = path.join(__dirname, '..', 'data', 'full-readings-cache.json');
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let database = {};
if (fs.existsSync(outputFile)) {
  try {
    database = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    console.log(`Loaded ${Object.keys(database).length} existing 2027 dates from database.`);
  } catch (e) {
    database = {};
  }
}

let fullCache = {};
if (fs.existsSync(fullCachePath)) {
  try {
    fullCache = JSON.parse(fs.readFileSync(fullCachePath, 'utf8'));
  } catch (e) {
    fullCache = {};
  }
}

function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 15000
      },
      res => {
        const chunks = [];
        res.on('data', d => chunks.push(d));
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ ok: true, status: res.statusCode, html: Buffer.concat(chunks).toString('utf8') });
          } else {
            resolve({ ok: false, status: res.statusCode });
          }
        });
      }
    );
    req.on('error', err => resolve({ ok: false, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, error: 'Timeout' });
    });
  });
}

function decodeEntities(str) {
  if (!str) return '';
  return str
    .replace(/&#(\d+);/g, (_, dec) => {
      try { return String.fromCharCode(Number(dec)); } catch { return ''; }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try { return String.fromCharCode(parseInt(hex, 16)); } catch { return ''; }
    })
    .replace(/&nbsp;/g, ' ')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&apos;|&#039;|&#39;/g, "'")
    .replace(/&hellip;/g, '…')
    .replace(/&bull;/g, '•')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/\ufffd/g, '');
}

function cleanText(str) {
  if (!str) return null;
  const t = str
    .replace(/<[^>]+>/g, '')
    .replace(/✠/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
  return decodeEntities(t);
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
  return cleanText(text);
}

function simplifyTamilCitation(text) {
  if (!text) return null;
  const cleaned = cleanText(text);
  if (!cleaned) return null;
  const verseMatch = cleaned.match(/(\d+\s*:\s*[\d\s,.\-–a-zA-Z]+)/);
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
    const clean = cleanText(tag);
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
    const clean = cleanText(spanMatch[1]);
    if (clean) return clean;
  }
  const pMatches = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  for (const tag of pMatches) {
    const clean = cleanText(tag);
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
  const dayDescription = dayDescMatch ? cleanText(dayDescMatch[1]) : null;

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
  const dayDescription = dayTitleMatch ? cleanText(dayTitleMatch[1]) : null;

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

function parseEnglishFull(html, slug) {
  const dayDescMatch = html.match(/<h2[^>]*id=["']cgdaydesc["'][^>]*>([\s\S]*?)<\/h2>/i);
  const dayTitle = dayDescMatch ? cleanText(dayDescMatch[1]) : '';

  const parseSection = (srcId, txtId, defaultHeading) => {
    const srcRegex = new RegExp(`<h2[^>]*id=["']${srcId}["'][^>]*>([\\s\\S]*?)<\\/h2>`, 'i');
    const txtRegex = new RegExp(`<div[^>]*id=["']${txtId}["'][^>]*>([\\s\\S]*?)<\\/div>`, 'i');
    const srcMatch = html.match(srcRegex);
    const txtMatch = html.match(txtRegex);

    if (!srcMatch && !txtMatch) return null;

    let heading = defaultHeading;
    let reference = '';
    if (srcMatch) {
      const fullHeading = cleanText(srcMatch[1]);
      const colonIdx = fullHeading.indexOf(':');
      if (colonIdx !== -1) {
        heading = fullHeading.substring(0, colonIdx).trim();
        reference = fullHeading.substring(colonIdx + 1).trim();
      } else {
        reference = fullHeading;
      }
    }

    const paragraphs = [];
    let response = '';

    if (txtMatch) {
      const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      let pMatch;
      while ((pMatch = pRegex.exec(txtMatch[1])) !== null) {
        const pClean = cleanText(pMatch[1]);
        if (!pClean) continue;
        if (pClean.startsWith('R.') || pClean.includes('Responsorial') || /^\s*R\./i.test(pClean)) {
          if (!response) {
            response = pClean;
            if (response.includes('R.')) response = response.substring(response.indexOf('R.')).trim();
          }
        }
        paragraphs.push(pClean);
      }
    }

    if (paragraphs.length === 0 && !reference) return null;
    return { heading, reference, paragraphs, response: response || undefined };
  };

  return {
    slug,
    sourceUrl: `https://www.catholicgallery.org/mass-reading/${slug}/`,
    dayTitle,
    firstReading: parseSection('cgfrsrc', 'cgfrtxt', 'First Reading'),
    psalm: parseSection('cgrpsrc', 'cgrptxt', 'Responsorial Psalm'),
    secondReading: parseSection('cgsrsrc', 'cgsrtxt', 'Second Reading'),
    alleluia: parseSection('cgasrc', 'cgatxt', 'Alleluia'),
    gospel: parseSection('cggsrc', 'cggtxt', 'Gospel')
  };
}

function parseTamilFull(html, slug) {
  const dayTitleMatch = html.match(/<h2[^>]*class="[^"]*dayTitle[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
  const dayTitle = dayTitleMatch ? cleanText(dayTitleMatch[1]) : '';

  let firstReading = null;
  let psalm = null;
  let secondReading = null;
  let alleluia = null;
  let gospel = null;

  const readingDivRegex = /<div\s+class="readings"[^>]*data-readingname="([^"]+)"[^>]*>([\s\S]*?)<\/div>/gi;
  let match;

  while ((match = readingDivRegex.exec(html)) !== null) {
    const rawName = match[1].trim();
    const content = match[2];

    const introMatch = content.match(/<p[^>]*class="[^"]*readingIntro[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const intro = introMatch ? cleanText(introMatch[1]) : undefined;

    let reference = '';
    const citeMatch = content.match(/<span[^>]*class="[^"]*italics[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    if (citeMatch) {
      reference = cleanText(citeMatch[1]);
    } else {
      const pCites = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      for (const c of pCites) {
        const text = cleanText(c);
        if (/\d+\s*:\s*\d+/.test(text) && !text.includes('பதிலுரைப்') && !text.includes('முதல் வாசகம்') && !text.includes('நற்செய்தி வாசகம்')) {
          reference = text;
          break;
        }
      }
    }

    const paragraphs = [];
    let response = '';

    if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) {
      const respMatch = content.match(/<p[^>]*>([\s\S]*?பல்லவி[\s\S]*?)<\/p>/i);
      if (respMatch) {
        let rawResp = cleanText(respMatch[1]);
        const lastIdx = rawResp.lastIndexOf('பல்லவி:');
        if (lastIdx !== -1) rawResp = rawResp.substring(lastIdx).trim();
        else {
          const fallbackIdx = rawResp.lastIndexOf('பல்லவி');
          if (fallbackIdx !== -1) rawResp = rawResp.substring(fallbackIdx).trim();
        }
        response = rawResp;
      }
      const strophes = content.match(/<span class="psmvcont">([\s\S]*?)<\/span>/gi) || [];
      if (strophes.length > 0) {
        for (const st of strophes) {
          const t = cleanText(st);
          if (t) paragraphs.push(t);
        }
      } else {
        const pList = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        for (const p of pList) {
          const t = cleanText(p);
          if (t && !t.includes('பதிலுரைப் பாடல்')) paragraphs.push(t);
        }
      }
    } else if (/வாழ்த்தொலி/i.test(rawName)) {
      const alleluiaMatch = content.match(/<p[^>]*class="[^"]*alleluiaTxt[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      if (alleluiaMatch) paragraphs.push(cleanText(alleluiaMatch[1]));
      else {
        const pList = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        for (const p of pList) {
          const t = cleanText(p);
          if (t && !t.includes('வாழ்த்தொலி')) paragraphs.push(t);
        }
      }
    } else {
      const pList = content.match(/<p[^>]*class="[^"]*readingTxt[^"]*"[^>]*>([\s\S]*?)<\/p>/gi) || [];
      if (pList.length > 0) {
        for (const p of pList) {
          const t = cleanText(p);
          if (t) paragraphs.push(t);
        }
      } else {
        const anyP = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        for (const p of anyP) {
          const t = cleanText(p);
          if (t && !t.includes('வாசகம்') && t !== intro && t !== reference) paragraphs.push(t);
        }
      }
    }

    let heading = rawName;
    if (/முதல்\s*வாசகம்/i.test(rawName)) heading = 'முதல் வாசகம்';
    else if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) heading = 'பதிலுரைப் பாடல்';
    else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) heading = 'இரண்டாம் வாசகம்';
    else if (/வாழ்த்தொலி/i.test(rawName)) heading = 'நற்செய்திக்கு முன் வாழ்த்தொலி';
    else if (/நற்செய்தி/i.test(rawName)) heading = 'நற்செய்தி வாசகம்';

    const sectionData = { heading, reference, intro, paragraphs, response: response || undefined };

    if (/முதல்\s*வாசகம்/i.test(rawName)) firstReading = sectionData;
    else if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) psalm = sectionData;
    else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) secondReading = sectionData;
    else if (/வாழ்த்தொலி/i.test(rawName)) alleluia = sectionData;
    else if (/நற்செய்தி/i.test(rawName)) gospel = sectionData;
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

async function fetchDay(year, month, day) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yy = String(year).slice(-2);
  const enSlug = `${dd}${mm}${yy}`;
  const taSlug = `tr-${dd}${mm}${yy}`;
  const dateKey = `${year}-${mm}-${dd}`;

  if (database[dateKey] && database[dateKey].en && database[dateKey].ta) {
    return true; // Already present
  }

  const [enRes, taRes] = await Promise.all([
    fetchUrl(`https://www.catholicgallery.org/mass-reading/${enSlug}/`),
    fetchUrl(`https://bible.catholicgallery.org/tamil-mass-reading/${taSlug}/`)
  ]);

  const enSummary = enRes.ok ? parseEnglishHtml(enRes.html, enSlug) : (database[dateKey]?.en || null);
  const taSummary = taRes.ok ? parseTamilHtml(taRes.html, taSlug) : (database[dateKey]?.ta || null);

  database[dateKey] = {
    date: dateKey,
    en: enSummary,
    ta: taSummary
  };

  // Also cache full reading if successfully retrieved
  if (enRes.ok || taRes.ok) {
    fullCache[dateKey] = {
      date: dateKey,
      en: enRes.ok ? parseEnglishFull(enRes.html, enSlug) : null,
      ta: taRes.ok ? parseTamilFull(taRes.html, taSlug) : null
    };
  }

  return true;
}

async function run() {
  const year = 2027;
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const allDates = [];
  for (let m = 1; m <= 12; m++) {
    const days = daysInMonth[m - 1];
    for (let d = 1; d <= days; d++) {
      allDates.push({ year, month: m, day: d });
    }
  }

  console.log(`Starting fetch for ${allDates.length} days of 2027...`);

  const BATCH_SIZE = 8;
  for (let i = 0; i < allDates.length; i += BATCH_SIZE) {
    const batch = allDates.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(d => fetchDay(d.year, d.month, d.day)));
    process.stdout.write(`\r[2027] Processed ${Math.min(i + BATCH_SIZE, allDates.length)} / ${allDates.length} days...`);
    
    // Save to file after every batch
    fs.writeFileSync(outputFile, JSON.stringify(database, null, 2), 'utf8');
    fs.writeFileSync(fullCachePath, JSON.stringify(fullCache, null, 2), 'utf8');

    // Small delay to be polite
    await new Promise(r => setTimeout(r, 250));
  }

  fs.writeFileSync(outputFile, JSON.stringify(database, null, 2), 'utf8');
  fs.writeFileSync(fullCachePath, JSON.stringify(fullCache, null, 2), 'utf8');
  console.log(`\nCOMPLETED 2027! Saved ${Object.keys(database).length} dates to ${outputFile}`);
}

run().catch(console.error);
