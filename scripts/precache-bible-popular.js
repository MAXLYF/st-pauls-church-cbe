const fs = require('fs');
const path = require('path');
const https = require('https');

const books = JSON.parse(fs.readFileSync('data/tamil-bible-books.json', 'utf8'));

function decodeEntities(str) {
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function parseBibleHtml(html) {
  const startIndex = html.indexOf('id="etbcont"');
  if (startIndex === -1) return { items: [], crossrefs: [], footnotes: [] };

  let endIndex = html.length;
  const navIdx = html.indexOf('<nav', startIndex);
  if (navIdx !== -1 && navIdx < endIndex) endIndex = navIdx;
  const commentsIdx = html.indexOf('id="comments"', startIndex);
  if (commentsIdx !== -1 && commentsIdx < endIndex) endIndex = commentsIdx;

  const fullSectionHtml = html.substring(startIndex, endIndex);

  const crossrefs = [];
  const crRegex = /<div class=["']crossref["']>([\s\S]*?)<\/div>/gi;
  let crMatch;
  while ((crMatch = crRegex.exec(fullSectionHtml)) !== null) {
    const text = decodeEntities(crMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    if (text) crossrefs.push(text);
  }

  const footnotes = [];
  const fnRegex = /<div class=["']footnote["']>([\s\S]*?)<\/div>/gi;
  let fnMatch;
  while ((fnMatch = fnRegex.exec(fullSectionHtml)) !== null) {
    const text = decodeEntities(fnMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    if (text) footnotes.push(text);
  }

  let versesEnd = fullSectionHtml.length;
  const crPos = fullSectionHtml.search(/<div[^>]*class=["']cgcrossref["']/i);
  if (crPos !== -1 && crPos < versesEnd) versesEnd = crPos;
  const fnPos = fullSectionHtml.search(/<div[^>]*class=["']cgfootnote["']/i);
  if (fnPos !== -1 && fnPos < versesEnd) versesEnd = fnPos;
  const copyPos = fullSectionHtml.search(/<div[^>]*id=["']etbcopy["']/i);
  if (copyPos !== -1 && copyPos < versesEnd) versesEnd = copyPos;

  const cleanHtml = fullSectionHtml
    .substring(0, versesEnd)
    .replace(/<div class=["'][^"']*cgAd[^"']*["']>[\s\S]*?<\/div>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '');

  const marked = cleanHtml
    .replace(/<h2[^>]*class=["'][^"']*cg_heading[^"']*["'][^>]*>([\s\S]*?)<\/h2>/gi, '\n§§HEADING::$1§§\n')
    .replace(/<p[^>]*class=["'][^"']*cg_subhdg[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '\n§§SUBHEADING::$1§§\n')
    .replace(/<span[^>]*class=["'][^"']*bibvnum[^"']*["']>([\s\S]*?)<\/span>/gi, '\n§§VERSE::$1§§\n');

  const parts = marked.split('§§');
  const items = [];
  let currentVerseNum = null;
  let currentVerseText = '';

  function flushVerse() {
    if (currentVerseNum && currentVerseText.trim()) {
      items.push({
        type: 'verse',
        verse: currentVerseNum,
        text: decodeEntities(currentVerseText.trim().replace(/\s+/g, ' '))
      });
    }
    currentVerseNum = null;
    currentVerseText = '';
  }

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;

    if (part.startsWith('HEADING::')) {
      flushVerse();
      const txt = decodeEntities(part.replace('HEADING::', '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      if (txt) items.push({ type: 'heading', text: txt });
    } else if (part.startsWith('SUBHEADING::')) {
      flushVerse();
      const txt = decodeEntities(part.replace('SUBHEADING::', '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      if (txt) items.push({ type: 'subheading', text: txt });
    } else if (part.startsWith('VERSE::')) {
      flushVerse();
      currentVerseNum = part.replace('VERSE::', '').replace(/<[^>]+>/g, '').trim();
    } else {
      const cleanText = part
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/p>/gi, ' ')
        .replace(/<[^>]+>/g, ' ');

      if (currentVerseNum) {
        currentVerseText += ' ' + cleanText;
      }
    }
  }
  flushVerse();

  return { items, crossrefs, footnotes };
}

function fetchUrl(url) {
  return new Promise(resolve => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve);
        return;
      }
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', () => resolve(''));
  });
}

function computeNavigation(bookSlug, chapter) {
  const bookIndex = books.findIndex(b => b.slug.toLowerCase() === bookSlug.toLowerCase());
  if (bookIndex === -1) return { prev: null, next: null };
  const currentBook = books[bookIndex];

  let prev = null;
  let next = null;

  if (chapter > 1) {
    prev = { bookSlug: currentBook.slug, chapter: chapter - 1, bookName: currentBook.tamilName };
  } else if (bookIndex > 0) {
    const prevBook = books[bookIndex - 1];
    prev = { bookSlug: prevBook.slug, chapter: prevBook.totalChapters, bookName: prevBook.tamilName };
  }

  if (chapter < currentBook.totalChapters) {
    next = { bookSlug: currentBook.slug, chapter: chapter + 1, bookName: currentBook.tamilName };
  } else if (bookIndex < books.length - 1) {
    const nextBook = books[bookIndex + 1];
    next = { bookSlug: nextBook.slug, chapter: 1, bookName: nextBook.tamilName };
  }

  return { prev, next };
}

const targetChapters = [
  { slug: 'genesis', chapter: 1 },
  { slug: 'genesis', chapter: 2 },
  { slug: 'genesis', chapter: 3 },
  { slug: 'psalms', chapter: 1 },
  { slug: 'psalms', chapter: 23 },
  { slug: 'psalms', chapter: 91 },
  { slug: 'psalms', chapter: 121 },
  { slug: 'matthew', chapter: 1 },
  { slug: 'matthew', chapter: 2 },
  { slug: 'matthew', chapter: 5 },
  { slug: 'matthew', chapter: 6 },
  { slug: 'matthew', chapter: 7 },
  { slug: 'luke', chapter: 1 },
  { slug: 'luke', chapter: 2 },
  { slug: 'john', chapter: 1 },
  { slug: 'john', chapter: 3 },
  { slug: 'romans', chapter: 8 },
  { slug: '1-corinthians', chapter: 13 },
  { slug: 'revelation', chapter: 21 },
  { slug: 'revelation', chapter: 22 }
];

if (process.argv.includes('--all')) {
  targetChapters.length = 0;
  for (const b of books) {
    for (const ch of b.chapters) targetChapters.push({ slug: b.slug, chapter: ch });
  }
}

async function run() {
  const cacheDir = path.join('data', 'tamil-bible-cache');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  console.log(`Starting pre-cache of ${targetChapters.length} popular chapters...`);

  for (const item of targetChapters) {
    const cacheFile = path.join(cacheDir, `${item.slug}-${item.chapter}.json`);
    if (fs.existsSync(cacheFile)) {
      console.log(`[Already Cached] ${item.slug} ch ${item.chapter}`);
      continue;
    }

    const book = books.find(b => b.slug === item.slug);
    if (!book) continue;

    console.log(`Fetching ${book.tamilName} (${item.slug}) Chapter ${item.chapter}...`);
    const url = `https://bible.catholicgallery.org/tamil/etb-${item.slug}-${item.chapter}/`;
    const html = await fetchUrl(url);

    if (!html) {
      console.log(`Failed to fetch ${url}`);
      continue;
    }

    const parsed = parseBibleHtml(html);
    if (parsed.items.length === 0) {
      console.log(`Warning: parsed 0 items for ${url}`);
      continue;
    }

    const nav = computeNavigation(item.slug, item.chapter);
    const data = {
      bookSlug: book.slug,
      bookName: book.tamilName,
      bookEnglishName: book.englishName,
      chapter: item.chapter,
      testament: book.testament,
      title: `${book.tamilName} — அதிகாரம் ${item.chapter}`,
      items: parsed.items,
      crossrefs: parsed.crossrefs,
      footnotes: parsed.footnotes,
      prevChapter: nav.prev,
      nextChapter: nav.next
    };

    fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved ${cacheFile} with ${data.items.length} items (${data.items.filter(i => i.type === 'verse').length} verses)`);

    // Polite delay
    await new Promise(r => setTimeout(r, 600));
  }

  console.log('Finished pre-caching popular chapters!');
}

run();
