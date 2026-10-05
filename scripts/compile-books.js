const fs = require('fs');

const ecuHtml = fs.readFileSync('scripts/ecu-tamil.html', 'utf8');
const otHtml = fs.readFileSync('scripts/ot.html', 'utf8');
const ntHtml = fs.readFileSync('scripts/nt.html', 'utf8');

const linkRegex = /<a[^>]*href=["']\s*([^"']+)\s*["'][^>]*>([\s\S]*?)<\/a>/gi;
let match;
const booksFromIndex = [];
let currentTestament = 'OT';

while ((match = linkRegex.exec(ecuHtml)) !== null) {
  const url = match[1].trim();
  const text = match[2].replace(/<[^>]+>/g, '').trim();
  if (url.includes('/tamil/etb-new-testament')) {
    currentTestament = 'NT';
    continue;
  }
  if (url.includes('/tamil/etb-old-testament')) {
    currentTestament = 'OT';
    continue;
  }
  if (url.includes('/tamil/etb-') && text) {
    const slugMatch = url.match(/\/tamil\/etb-([a-z0-9\-]+)-1\/?$/i);
    if (slugMatch) {
      booksFromIndex.push({
        slug: slugMatch[1],
        tamilName: text,
        testament: currentTestament,
        url
      });
    }
  }
}

function getChaptersMap(html) {
  const map = {};
  const chRegex = /<a[^>]*href=["']\s*([^"']+)\s*["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = chRegex.exec(html)) !== null) {
    const u = m[1].trim();
    const sm = u.match(/\/tamil\/etb-([a-z0-9\-]+?)-(\d+)\/?$/i);
    if (sm) {
      const bSlug = sm[1];
      const ch = parseInt(sm[2], 10);
      if (!map[bSlug]) map[bSlug] = new Set();
      map[bSlug].add(ch);
    }
  }
  return map;
}

const otMap = getChaptersMap(otHtml);
const ntMap = getChaptersMap(ntHtml);
const allChaptersMap = { ...otMap, ...ntMap };

const englishNames = {
  'genesis': 'Genesis',
  'exodus': 'Exodus',
  'leviticus': 'Leviticus',
  'numbers': 'Numbers',
  'deuteronomy': 'Deuteronomy',
  'joshua': 'Joshua',
  'judges': 'Judges',
  'ruth': 'Ruth',
  '1-samuel': '1 Samuel',
  '2-samuel': '2 Samuel',
  '1-kings': '1 Kings',
  '2-kings': '2 Kings',
  '1-chronicles': '1 Chronicles',
  '2-chronicles': '2 Chronicles',
  'ezra': 'Ezra',
  'nehemiah': 'Nehemiah',
  'esther': 'Esther',
  'job': 'Job',
  'psalms': 'Psalms',
  'proverbs': 'Proverbs',
  'ecclesiastes': 'Ecclesiastes',
  'song-of-songs': 'Song of Songs',
  'isaiah': 'Isaiah',
  'jeremiah': 'Jeremiah',
  'lamentations': 'Lamentations',
  'ezekiel': 'Ezekiel',
  'daniel': 'Daniel',
  'hosea': 'Hosea',
  'joel': 'Joel',
  'amos': 'Amos',
  'obadiah': 'Obadiah',
  'jonah': 'Jonah',
  'micah': 'Micah',
  'nahum': 'Nahum',
  'habakkuk': 'Habakkuk',
  'zephaniah': 'Zephaniah',
  'haggai': 'Haggai',
  'zechariah': 'Zechariah',
  'malachi': 'Malachi',
  'tobit': 'Tobit',
  'judith': 'Judith',
  'esther-greek': 'Esther (Greek)',
  'wisdom': 'Wisdom',
  'sirach': 'Sirach',
  'baruch': 'Baruch',
  'daniel-additions': 'Daniel (Additions)',
  '1-maccabees': '1 Maccabees',
  '2-maccabees': '2 Maccabees',
  'matthew': 'Matthew',
  'mark': 'Mark',
  'luke': 'Luke',
  'john': 'John',
  'acts': 'Acts',
  'romans': 'Romans',
  '1-corinthians': '1 Corinthians',
  '2-corinthians': '2 Corinthians',
  'galatians': 'Galatians',
  'ephesians': 'Ephesians',
  'philippians': 'Philippians',
  'colossians': 'Colossians',
  '1-thessalonians': '1 Thessalonians',
  '2-thessalonians': '2 Thessalonians',
  '1-timothy': '1 Timothy',
  '2-timothy': '2 Timothy',
  'titus': 'Titus',
  'philemon': 'Philemon',
  'hebrews': 'Hebrews',
  'james': 'James',
  '1-peter': '1 Peter',
  '2-peter': '2 Peter',
  '1-john': '1 John',
  '2-john': '2 John',
  '3-john': '3 John',
  'jude': 'Jude',
  'revelation': 'Revelation'
};

const fullBookList = booksFromIndex.map((b, idx) => {
  const chapters = allChaptersMap[b.slug] ? Array.from(allChaptersMap[b.slug]).sort((a,b) => a-b) : [];
  return {
    order: idx + 1,
    slug: b.slug,
    tamilName: b.tamilName,
    englishName: englishNames[b.slug] || b.slug,
    testament: b.testament,
    totalChapters: chapters.length,
    chapters: chapters
  };
});

fs.writeFileSync('data/tamil-bible-books.json', JSON.stringify(fullBookList, null, 2), 'utf8');
console.log('Successfully saved data/tamil-bible-books.json with', fullBookList.length, 'books.');
