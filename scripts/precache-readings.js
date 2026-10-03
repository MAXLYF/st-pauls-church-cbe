const https = require('https');
const fs = require('fs');
const path = require('path');

const outputFile = path.join(__dirname, '..', 'data', 'full-readings-cache.json');
const dataDir = path.dirname(outputFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let database = {};
if (fs.existsSync(outputFile)) {
  try {
    database = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    console.log(`Loaded ${Object.keys(database).length} existing full reading dates.`);
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

function cleanHtmlText(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&ndash;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/✠/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function parseEnglishFull(html, slug) {
  const dayDescMatch = html.match(/<h2[^>]*id=["']cgdaydesc["'][^>]*>([\s\S]*?)<\/h2>/i);
  const dayTitle = dayDescMatch ? cleanHtmlText(dayDescMatch[1]) : '';

  const parseSection = (srcId, txtId, defaultHeading) => {
    const srcRegex = new RegExp(`<h2[^>]*id=["']${srcId}["'][^>]*>([\\s\\S]*?)<\\/h2>`, 'i');
    const txtRegex = new RegExp(`<div[^>]*id=["']${txtId}["'][^>]*>([\\s\\S]*?)<\\/div>`, 'i');
    const srcMatch = html.match(srcRegex);
    const txtMatch = html.match(txtRegex);

    if (!srcMatch && !txtMatch) return null;

    let heading = defaultHeading;
    let reference = '';
    if (srcMatch) {
      const fullHeading = cleanHtmlText(srcMatch[1]);
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
        const pClean = cleanHtmlText(pMatch[1]);
        if (!pClean) continue;
        if (pClean.startsWith('R.') || pClean.includes('Responsorial') || /^\s*R\./i.test(pClean)) {
          if (!response) response = pClean;
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
    firstReading: parseSection('cgfrsrc', 'cgfrtxt', 'First Reading'),
    psalm: parseSection('cgrpsrc', 'cgrptxt', 'Responsorial Psalm'),
    secondReading: parseSection('cgsrsrc', 'cgsrtxt', 'Second Reading'),
    alleluia: parseSection('cgasrc', 'cgatxt', 'Alleluia'),
    gospel: parseSection('cggsrc', 'cggtxt', 'Gospel')
  };
}

function parseTamilFull(html, slug) {
  const dayTitleMatch = html.match(/<h2[^>]*class="[^"]*dayTitle[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
  const dayTitle = dayTitleMatch ? cleanHtmlText(dayTitleMatch[1]) : '';

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
    const intro = introMatch ? cleanHtmlText(introMatch[1]) : undefined;

    let reference = '';
    const citeMatch = content.match(/<span[^>]*class="[^"]*italics[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
    if (citeMatch) {
      reference = cleanHtmlText(citeMatch[1]);
    } else {
      const pCites = content.match(/<(p|span)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      for (const c of pCites) {
        const text = cleanHtmlText(c);
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
        let rawResp = cleanHtmlText(respMatch[1]);
        const lastIdx = rawResp.lastIndexOf('பல்லவி:');
        if (lastIdx !== -1) {
          rawResp = rawResp.substring(lastIdx).trim();
        } else {
          const fallbackIdx = rawResp.lastIndexOf('பல்லவி');
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
          if (t && !t.includes('பதிலுரைப் பாடல்')) paragraphs.push(t);
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
          if (t && !t.includes('வாழ்த்தொலி')) paragraphs.push(t);
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
          if (t && !t.includes('வாசகம்') && t !== intro && t !== reference) {
            paragraphs.push(t);
          }
        }
      }
    }

    let heading = rawName;
    if (/முதல்\s*வாசகம்/i.test(rawName)) heading = 'முதல் வாசகம்';
    else if (/பதிலுரைப்|திருப்பாடல்/i.test(rawName)) heading = 'பதிலுரைப் பாடல்';
    else if (/இரண்டாம்\s*வாசகம்/i.test(rawName)) heading = 'இரண்டாம் வாசகம்';
    else if (/வாழ்த்தொலி/i.test(rawName)) heading = 'நற்செய்திக்கு முன் வாழ்த்தொலி';
    else if (/நற்செய்தி/i.test(rawName)) heading = 'நற்செய்தி வாசகம்';

    const sectionData = {
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

async function fetchAndCacheDay(year, month, day) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yy = String(year).slice(-2);
  const dateKey = `${year}-${mm}-${dd}`;
  const enSlug = `${dd}${mm}${yy}`;
  const taSlug = `tr-${dd}${mm}${yy}`;

  if (database[dateKey] && database[dateKey].en && database[dateKey].ta) {
    return true;
  }

  const [enRes, taRes] = await Promise.all([
    fetchUrl(`https://www.catholicgallery.org/mass-reading/${enSlug}/`),
    fetchUrl(`https://bible.catholicgallery.org/tamil-mass-reading/${taSlug}/`)
  ]);

  if (!enRes.ok && !taRes.ok) {
    console.warn(`Failed both EN & TA for ${dateKey}`);
    return false;
  }

  const enData = enRes.ok ? parseEnglishFull(enRes.html, enSlug) : null;
  const taData = taRes.ok ? parseTamilFull(taRes.html, taSlug) : null;

  database[dateKey] = {
    date: dateKey,
    en: enData,
    ta: taData
  };

  return true;
}

async function precacheOctober() {
  console.log('Precaching October 2026 full readings...');
  for (let day = 1; day <= 31; day++) {
    const ok = await fetchAndCacheDay(2026, 10, day);
    process.stdout.write(ok ? '.' : 'x');
  }
  fs.writeFileSync(outputFile, JSON.stringify(database, null, 2), 'utf8');
  console.log('\nSaved full readings cache for October! Total dates:', Object.keys(database).length);
}

precacheOctober();
