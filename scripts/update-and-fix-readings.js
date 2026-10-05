const https = require('https');
const fs = require('fs');
const path = require('path');

const fullCachePath = path.join(__dirname, '..', 'data', 'full-readings-cache.json');
const readings2026Path = path.join(__dirname, '..', 'data', 'readings-2026.json');

const fullCache = JSON.parse(fs.readFileSync(fullCachePath, 'utf8'));
const readings2026 = JSON.parse(fs.readFileSync(readings2026Path, 'utf8'));

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
            const buffer = Buffer.concat(chunks);
            const html = buffer.toString('utf8');
            resolve({ ok: true, status: res.statusCode, html });
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
      try {
        return String.fromCharCode(Number(dec));
      } catch {
        return '';
      }
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      try {
        return String.fromCharCode(parseInt(hex, 16));
      } catch {
        return '';
      }
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

function cleanHtmlText(str) {
  if (!str) return '';
  const text = str
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/✠/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
  return decodeEntities(text);
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
          if (!response) {
            response = pClean;
            if (response.includes('R.')) {
              response = response.substring(response.indexOf('R.')).trim();
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
        if (
          /\d+\s*:\s*\d+/.test(text) &&
          !text.includes('பதிலுரைப்') &&
          !text.includes('முதல் வாசகம்') &&
          !text.includes('நற்செய்தி வாசகம்')
        ) {
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

async function fetchDay(year, month, day) {
  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yy = String(year).slice(-2);
  const dateKey = `${year}-${mm}-${dd}`;
  const enSlug = `${dd}${mm}${yy}`;
  const taSlug = `tr-${dd}${mm}${yy}`;

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

  fullCache[dateKey] = {
    date: dateKey,
    en: enData,
    ta: taData
  };

  return true;
}

// Clean any \ufffd and entities in existing readings-2026.json
function fixReadings2026() {
  console.log('Fixing readings-2026.json corruptions...');
  let fixedCount = 0;

  // Specific manual corrections for known scrambled keys
  const manualFixes = {
    '2026-12-02': {
      ta: { firstReading: 'எசாயா 25: 6-10' }
    },
    '2026-12-05': {
      ta: { gospel: 'மத்தேயு 9: 35 – 10: 1, 6-8' }
    },
    '2026-12-20': {
      ta: { firstReading: '2 சாமுவேல் 7: 1-5, 8b-12, 14a, 16' }
    },
    '2026-12-23': {
      ta: { dayDescription: 'திருவருகைக் கால இறுதி நாள்கள் – டிசம்பர் 23' }
    },
    '2026-12-26': {
      ta: { firstReading: 'திருத்தூதர் பணிகள் 6: 8-10; 7: 54-59' }
    }
  };

  for (const [date, val] of Object.entries(readings2026)) {
    if (manualFixes[date]) {
      if (manualFixes[date].ta) {
        Object.assign(val.ta, manualFixes[date].ta);
      }
    }
    // Clean all string fields
    function cleanObj(obj) {
      if (!obj || typeof obj !== 'object') return;
      for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string') {
          let cleaned = decodeEntities(v)
            .replace(/\ufffd/g, '')
            .replace(/[ \t]+/g, ' ')
            .trim();
          if (cleaned !== v) {
            obj[k] = cleaned;
            fixedCount++;
          }
        } else if (v && typeof v === 'object') {
          cleanObj(v);
        }
      }
    }
    cleanObj(val);
  }

  fs.writeFileSync(readings2026Path, JSON.stringify(readings2026, null, 2), 'utf8');
  console.log(`readings-2026.json fixed! Cleaned ${fixedCount} fields.`);
}

async function run() {
  fixReadings2026();

  // 1. Refetch the 12 corrupted dates in October (including today 2026-10-05)
  const octoberDatesToRefetch = [1, 2, 3, 5, 11, 12, 15, 20, 22, 25, 26, 30];
  console.log('\nRefetching corrupted October dates with clean UTF-8 decoding...');
  for (const day of octoberDatesToRefetch) {
    const ok = await fetchDay(2026, 10, day);
    process.stdout.write(ok ? `${day}✓ ` : `${day}✗ `);
  }
  console.log('\nOctober dates updated and clean!');

  // 2. Pre-cache ALL December 2026 dates (1 through 31)
  console.log('\nPrecaching December 2026 (days 1 to 31)...');
  for (let day = 1; day <= 31; day++) {
    const ok = await fetchDay(2026, 12, day);
    process.stdout.write(ok ? `${day}✓ ` : `${day}✗ `);
  }
  console.log('\nDecember 2026 fully cached!');

  // Save updated cache to disk
  fs.writeFileSync(fullCachePath, JSON.stringify(fullCache, null, 2), 'utf8');
  console.log(`\nUpdated full-readings-cache.json successfully! Total dates cached: ${Object.keys(fullCache).length}`);
}

run().catch(err => {
  console.error('Error running update script:', err);
});
