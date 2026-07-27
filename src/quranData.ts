import { CatalogSurah, Reciter, Surah, Ayah } from './types';

// Complete official catalog list of all 114 Surahs with metadata
export const quranCatalog: CatalogSurah[] = [
  { id: 1, name: "الفاتحة", englishName: "Al-Fatihah", type: "مكية", totalAyahs: 7, revelationOrder: 5, juzStart: 1, pageStart: 1 },
  { id: 2, name: "البقرة", englishName: "Al-Baqarah", type: "مدنية", totalAyahs: 286, revelationOrder: 87, juzStart: 1, pageStart: 2 },
  { id: 3, name: "آل عمران", englishName: "Al-Imran", type: "مدنية", totalAyahs: 200, revelationOrder: 89, juzStart: 3, pageStart: 50 },
  { id: 4, name: "النساء", englishName: "An-Nisa", type: "مدنية", totalAyahs: 176, revelationOrder: 92, juzStart: 4, pageStart: 77 },
  { id: 5, name: "المائدة", englishName: "Al-Ma'idah", type: "مدنية", totalAyahs: 120, revelationOrder: 112, juzStart: 6, pageStart: 106 },
  { id: 6, name: "الأنعام", englishName: "Al-An'am", type: "مكية", totalAyahs: 165, revelationOrder: 55, juzStart: 7, pageStart: 128 },
  { id: 7, name: "الأعراف", englishName: "Al-A'raf", type: "مكية", totalAyahs: 206, revelationOrder: 39, juzStart: 8, pageStart: 151 },
  { id: 8, name: "الأنفال", englishName: "Al-Anfal", type: "مدنية", totalAyahs: 75, revelationOrder: 88, juzStart: 9, pageStart: 177 },
  { id: 9, name: "التوبة", englishName: "At-Tawbah", type: "مدنية", totalAyahs: 129, revelationOrder: 113, juzStart: 10, pageStart: 187 },
  { id: 10, name: "يونس", englishName: "Yunus", type: "مكية", totalAyahs: 109, revelationOrder: 51, juzStart: 11, pageStart: 208 },
  { id: 11, name: "هود", englishName: "Hud", type: "مكية", totalAyahs: 123, revelationOrder: 52, juzStart: 11, pageStart: 221 },
  { id: 12, name: "يوسف", englishName: "Yusuf", type: "مكية", totalAyahs: 111, revelationOrder: 53, juzStart: 12, pageStart: 235 },
  { id: 13, name: "الرعد", englishName: "Ar-Ra'd", type: "مدنية", totalAyahs: 43, revelationOrder: 96, juzStart: 13, pageStart: 249 },
  { id: 14, name: "إبراهيم", englishName: "Ibrahim", type: "مكية", totalAyahs: 52, revelationOrder: 72, juzStart: 13, pageStart: 255 },
  { id: 15, name: "الحجر", englishName: "Al-Hijr", type: "مكية", totalAyahs: 99, revelationOrder: 54, juzStart: 14, pageStart: 262 },
  { id: 16, name: "النحل", englishName: "An-Nahl", type: "مكية", totalAyahs: 128, revelationOrder: 70, juzStart: 14, pageStart: 267 },
  { id: 17, name: "الإسراء", englishName: "Al-Isra", type: "مكية", totalAyahs: 111, revelationOrder: 50, juzStart: 15, pageStart: 282 },
  { id: 18, name: "الكهف", englishName: "Al-Kahf", type: "مكية", totalAyahs: 110, revelationOrder: 69, juzStart: 15, pageStart: 293 },
  { id: 19, name: "مريم", englishName: "Maryam", type: "مكية", totalAyahs: 98, revelationOrder: 44, juzStart: 16, pageStart: 305 },
  { id: 20, name: "طه", englishName: "Ta-Ha", type: "مكية", totalAyahs: 135, revelationOrder: 45, juzStart: 16, pageStart: 312 },
  { id: 21, name: "الأنبياء", englishName: "Al-Anbiya", type: "مكية", totalAyahs: 112, revelationOrder: 73, juzStart: 17, pageStart: 322 },
  { id: 22, name: "الحج", englishName: "Al-Hajj", type: "مدنية", totalAyahs: 78, revelationOrder: 103, juzStart: 17, pageStart: 332 },
  { id: 23, name: "المؤمنون", englishName: "Al-Mu'minun", type: "مكية", totalAyahs: 118, revelationOrder: 74, juzStart: 18, pageStart: 342 },
  { id: 24, name: "النور", englishName: "An-Nur", type: "مدنية", totalAyahs: 64, revelationOrder: 102, juzStart: 18, pageStart: 350 },
  { id: 25, name: "الفرقان", englishName: "Al-Furqan", type: "مكية", totalAyahs: 77, revelationOrder: 42, juzStart: 18, pageStart: 359 },
  { id: 26, name: "الشعراء", englishName: "Ash-Shu'ara", type: "مكية", totalAyahs: 227, revelationOrder: 47, juzStart: 19, pageStart: 367 },
  { id: 27, name: "النمل", englishName: "An-Naml", type: "مكية", totalAyahs: 93, revelationOrder: 48, juzStart: 19, pageStart: 377 },
  { id: 28, name: "القصص", englishName: "Al-Qasas", type: "مكية", totalAyahs: 88, revelationOrder: 49, juzStart: 20, pageStart: 385 },
  { id: 29, name: "العنكبوت", englishName: "Al-Ankabut", type: "مكية", totalAyahs: 69, revelationOrder: 85, juzStart: 20, pageStart: 396 },
  { id: 30, name: "الروم", englishName: "Ar-Rum", type: "مكية", totalAyahs: 60, revelationOrder: 84, juzStart: 21, pageStart: 404 },
  { id: 31, name: "لقمان", englishName: "Luqman", type: "مكية", totalAyahs: 34, revelationOrder: 57, juzStart: 21, pageStart: 411 },
  { id: 32, name: "السجدة", englishName: "As-Sajdah", type: "مكية", totalAyahs: 30, revelationOrder: 75, juzStart: 21, pageStart: 415 },
  { id: 33, name: "الأحزاب", englishName: "Al-Ahzab", type: "مدنية", totalAyahs: 73, revelationOrder: 90, juzStart: 21, pageStart: 418 },
  { id: 34, name: "سبأ", englishName: "Saba", type: "مكية", totalAyahs: 54, revelationOrder: 58, juzStart: 22, pageStart: 428 },
  { id: 35, name: "فاطر", englishName: "Fatir", type: "مكية", totalAyahs: 45, revelationOrder: 43, juzStart: 22, pageStart: 434 },
  { id: 36, name: "يس", englishName: "Ya-Sin", type: "مكية", totalAyahs: 83, revelationOrder: 41, juzStart: 22, pageStart: 440 },
  { id: 37, name: "الصافات", englishName: "As-Saffat", type: "مكية", totalAyahs: 182, revelationOrder: 56, juzStart: 23, pageStart: 446 },
  { id: 38, name: "ص", englishName: "Sad", type: "مكية", totalAyahs: 88, revelationOrder: 38, juzStart: 23, pageStart: 453 },
  { id: 39, name: "الزمر", englishName: "Az-Zumar", type: "مكية", totalAyahs: 75, revelationOrder: 59, juzStart: 23, pageStart: 458 },
  { id: 40, name: "غافر", englishName: "Ghafir", type: "مكية", totalAyahs: 85, revelationOrder: 60, juzStart: 24, pageStart: 467 },
  { id: 41, name: "فصلت", englishName: "Fussilat", type: "مكية", totalAyahs: 54, revelationOrder: 61, juzStart: 24, pageStart: 477 },
  { id: 42, name: "الشورى", englishName: "Ash-Shura", type: "مكية", totalAyahs: 53, revelationOrder: 62, juzStart: 25, pageStart: 483 },
  { id: 43, name: "الزخرف", englishName: "Az-Zukhruf", type: "مكية", totalAyahs: 89, revelationOrder: 63, juzStart: 25, pageStart: 489 },
  { id: 44, name: "الدخان", englishName: "Ad-Dukhan", type: "مكية", totalAyahs: 59, revelationOrder: 64, juzStart: 25, pageStart: 496 },
  { id: 45, name: "الجاثية", englishName: "Al-Jathiyah", type: "مكية", totalAyahs: 37, revelationOrder: 65, juzStart: 25, pageStart: 499 },
  { id: 46, name: "الأحقاف", englishName: "Al-Ahqaf", type: "مكية", totalAyahs: 35, revelationOrder: 66, juzStart: 26, pageStart: 502 },
  { id: 47, name: "محمد", englishName: "Muhammad", type: "مدنية", totalAyahs: 38, revelationOrder: 95, juzStart: 26, pageStart: 507 },
  { id: 48, name: "الفتح", englishName: "Al-Fath", type: "مدنية", totalAyahs: 29, revelationOrder: 111, juzStart: 26, pageStart: 511 },
  { id: 49, name: "الحجرات", englishName: "Al-Hujurat", type: "مدنية", totalAyahs: 18, revelationOrder: 106, juzStart: 26, pageStart: 515 },
  { id: 50, name: "ق", englishName: "Qaf", type: "مكية", totalAyahs: 45, revelationOrder: 34, juzStart: 26, pageStart: 518 },
  { id: 51, name: "الذاريات", englishName: "Adh-Dhariyat", type: "مكية", totalAyahs: 60, revelationOrder: 67, juzStart: 26, pageStart: 520 },
  { id: 52, name: "الطور", englishName: "At-Tur", type: "مكية", totalAyahs: 49, revelationOrder: 76, juzStart: 27, pageStart: 523 },
  { id: 53, name: "النجم", englishName: "An-Najm", type: "مكية", totalAyahs: 62, revelationOrder: 23, juzStart: 27, pageStart: 526 },
  { id: 54, name: "القمر", englishName: "Al-Qamar", type: "مكية", totalAyahs: 55, revelationOrder: 37, juzStart: 27, pageStart: 528 },
  { id: 55, name: "الرحمن", englishName: "Ar-Rahman", type: "مدنية", totalAyahs: 78, revelationOrder: 97, juzStart: 27, pageStart: 531 },
  { id: 56, name: "الواقعة", englishName: "Al-Waqi'ah", type: "مكية", totalAyahs: 96, revelationOrder: 46, juzStart: 27, pageStart: 534 },
  { id: 57, name: "الحديد", englishName: "Al-Hadid", type: "مدنية", totalAyahs: 29, revelationOrder: 94, juzStart: 27, pageStart: 537 },
  { id: 58, name: "المجادلة", englishName: "Al-Mujadilah", type: "مدنية", totalAyahs: 22, revelationOrder: 105, juzStart: 28, pageStart: 542 },
  { id: 59, name: "الحشر", englishName: "Al-Hashr", type: "مدنية", totalAyahs: 24, revelationOrder: 101, juzStart: 28, pageStart: 545 },
  { id: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", type: "مدنية", totalAyahs: 13, revelationOrder: 91, juzStart: 28, pageStart: 549 },
  { id: 61, name: "الصف", englishName: "As-Saff", type: "مدنية", totalAyahs: 14, revelationOrder: 109, juzStart: 28, pageStart: 551 },
  { id: 62, name: "الجمعة", englishName: "Al-Jumu'ah", type: "مدنية", totalAyahs: 11, revelationOrder: 110, juzStart: 28, pageStart: 553 },
  { id: 63, name: "المنافقون", englishName: "Al-Munafiqun", type: "مدنية", totalAyahs: 11, revelationOrder: 104, juzStart: 28, pageStart: 554 },
  { id: 64, name: "التغابن", englishName: "At-Taghabun", type: "مدنية", totalAyahs: 18, revelationOrder: 108, juzStart: 28, pageStart: 556 },
  { id: 65, name: "الطلاق", englishName: "At-Talaq", type: "مدنية", totalAyahs: 12, revelationOrder: 99, juzStart: 28, pageStart: 558 },
  { id: 66, name: "التحريم", englishName: "At-Tahrim", type: "مدنية", totalAyahs: 12, revelationOrder: 107, juzStart: 28, pageStart: 560 },
  { id: 67, name: "الملك", englishName: "Al-Mulk", type: "مكية", totalAyahs: 30, revelationOrder: 77, juzStart: 29, pageStart: 562 },
  { id: 68, name: "القلم", englishName: "Al-Qalam", type: "مكية", totalAyahs: 52, revelationOrder: 2, juzStart: 29, pageStart: 564 },
  { id: 69, name: "الحاقة", englishName: "Al-Haqqah", type: "مكية", totalAyahs: 52, revelationOrder: 78, juzStart: 29, pageStart: 566 },
  { id: 70, name: "المعارج", englishName: "Al-Ma'arij", type: "مكية", totalAyahs: 44, revelationOrder: 79, juzStart: 29, pageStart: 568 },
  { id: 71, name: "نوح", englishName: "Nuh", type: "مكية", totalAyahs: 28, revelationOrder: 71, juzStart: 29, pageStart: 570 },
  { id: 72, name: "الجن", englishName: "Al-Jinn", type: "مكية", totalAyahs: 28, revelationOrder: 40, juzStart: 29, pageStart: 572 },
  { id: 73, name: "المزمل", englishName: "Al-Muzzammil", type: "مكية", totalAyahs: 20, revelationOrder: 3, juzStart: 29, pageStart: 574 },
  { id: 74, name: "المدثر", englishName: "Al-Muddaththir", type: "مكية", totalAyahs: 56, revelationOrder: 4, juzStart: 29, pageStart: 575 },
  { id: 75, name: "القيامة", englishName: "Al-Qiyamah", type: "مكية", totalAyahs: 40, revelationOrder: 31, juzStart: 29, pageStart: 577 },
  { id: 76, name: "الإنسان", englishName: "Al-Insan", type: "مدنية", totalAyahs: 31, revelationOrder: 98, juzStart: 29, pageStart: 578 },
  { id: 77, name: "المرسلات", englishName: "Al-Mursilat", type: "مكية", totalAyahs: 50, revelationOrder: 33, juzStart: 29, pageStart: 580 },
  { id: 78, name: "النبأ", englishName: "An-Naba", type: "مكية", totalAyahs: 40, revelationOrder: 80, juzStart: 30, pageStart: 582 },
  { id: 79, name: "النازعات", englishName: "An-Nazi'at", type: "مكية", totalAyahs: 46, revelationOrder: 81, juzStart: 30, pageStart: 583 },
  { id: 80, name: "عبس", englishName: "Abasa", type: "مكية", totalAyahs: 42, revelationOrder: 24, juzStart: 30, pageStart: 585 },
  { id: 81, name: "التكوير", englishName: "At-Takwir", type: "مكية", totalAyahs: 29, revelationOrder: 7, juzStart: 30, pageStart: 586 },
  { id: 82, name: "الانفطار", englishName: "Al-Infitar", type: "مكية", totalAyahs: 19, revelationOrder: 82, juzStart: 30, pageStart: 587 },
  { id: 83, name: "المطففين", englishName: "Al-Mutaffifin", type: "مكية", totalAyahs: 36, revelationOrder: 86, juzStart: 30, pageStart: 587 },
  { id: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", type: "مكية", totalAyahs: 25, revelationOrder: 83, juzStart: 30, pageStart: 589 },
  { id: 85, name: "البروج", englishName: "Al-Buruj", type: "مكية", totalAyahs: 22, revelationOrder: 27, juzStart: 30, pageStart: 590 },
  { id: 86, name: "الطارق", englishName: "At-Tariq", type: "مكية", totalAyahs: 17, revelationOrder: 36, juzStart: 30, pageStart: 591 },
  { id: 87, name: "الأعلى", englishName: "Al-A'la", type: "مكية", totalAyahs: 19, revelationOrder: 8, juzStart: 30, pageStart: 591 },
  { id: 88, name: "الغاشية", englishName: "Al-Ghashiyah", type: "مكية", totalAyahs: 26, revelationOrder: 68, juzStart: 30, pageStart: 592 },
  { id: 89, name: "الفجر", englishName: "Al-Fajr", type: "مكية", totalAyahs: 30, revelationOrder: 10, juzStart: 30, pageStart: 593 },
  { id: 90, name: "البلد", englishName: "Al-Balad", type: "مكية", totalAyahs: 20, revelationOrder: 35, juzStart: 30, pageStart: 594 },
  { id: 91, name: "الشمس", englishName: "Ash-Shams", type: "مكية", totalAyahs: 15, revelationOrder: 26, juzStart: 30, pageStart: 595 },
  { id: 92, name: "الليل", englishName: "Al-Layl", type: "مكية", totalAyahs: 21, revelationOrder: 9, juzStart: 30, pageStart: 595 },
  { id: 93, name: "الضحى", englishName: "Ad-Duha", type: "مكية", totalAyahs: 11, revelationOrder: 11, juzStart: 30, pageStart: 596 },
  { id: 94, name: "الشرح", englishName: "Ash-Sharh", type: "مكية", totalAyahs: 8, revelationOrder: 12, juzStart: 30, pageStart: 596 },
  { id: 95, name: "التين", englishName: "At-Tin", type: "مكية", totalAyahs: 8, revelationOrder: 28, juzStart: 30, pageStart: 597 },
  { id: 96, name: "العلق", englishName: "Al-Alaq", type: "مكية", totalAyahs: 19, revelationOrder: 1, juzStart: 30, pageStart: 597 },
  { id: 97, name: "القدر", englishName: "Al-Qadr", type: "مكية", totalAyahs: 5, revelationOrder: 25, juzStart: 30, pageStart: 598 },
  { id: 98, name: "البينة", englishName: "Al-Bayyinah", type: "مدنية", totalAyahs: 8, revelationOrder: 100, juzStart: 30, pageStart: 598 },
  { id: 99, name: "الزلزلة", englishName: "Az-Zalzalah", type: "مدنية", totalAyahs: 8, revelationOrder: 93, juzStart: 30, pageStart: 599 },
  { id: 100, name: "العاديات", englishName: "Al-Adiyat", type: "مكية", totalAyahs: 11, revelationOrder: 14, juzStart: 30, pageStart: 599 },
  { id: 101, name: "القارعة", englishName: "Al-Qari'ah", type: "مكية", totalAyahs: 11, revelationOrder: 30, juzStart: 30, pageStart: 600 },
  { id: 102, name: "التكاثر", englishName: "At-Takathur", type: "مكية", totalAyahs: 8, revelationOrder: 16, juzStart: 30, pageStart: 600 },
  { id: 103, name: "العصر", englishName: "Al-Asr", type: "مكية", totalAyahs: 3, revelationOrder: 13, juzStart: 30, pageStart: 601 },
  { id: 104, name: "الهمزة", englishName: "Al-Humazah", type: "مكية", totalAyahs: 9, revelationOrder: 32, juzStart: 30, pageStart: 601 },
  { id: 105, name: "الفيل", englishName: "Al-Fil", type: "مكية", totalAyahs: 5, revelationOrder: 19, juzStart: 30, pageStart: 601 },
  { id: 106, name: "قريش", englishName: "Quraysh", type: "مكية", totalAyahs: 4, revelationOrder: 29, juzStart: 30, pageStart: 602 },
  { id: 107, name: "الماعون", englishName: "Al-Ma'un", type: "مكية", totalAyahs: 7, revelationOrder: 17, juzStart: 30, pageStart: 602 },
  { id: 108, name: "الكوثر", englishName: "Al-Kawthar", type: "مكية", totalAyahs: 3, revelationOrder: 15, juzStart: 30, pageStart: 602 },
  { id: 109, name: "الكافرون", englishName: "Al-Kafirun", type: "مكية", totalAyahs: 6, revelationOrder: 18, juzStart: 30, pageStart: 603 },
  { id: 110, name: "النصر", englishName: "An-Nasr", type: "مدنية", totalAyahs: 3, revelationOrder: 114, juzStart: 30, pageStart: 603 },
  { id: 111, name: "المسد", englishName: "Al-Masad", type: "مكية", totalAyahs: 5, revelationOrder: 6, juzStart: 30, pageStart: 603 },
  { id: 112, name: "الإخلاص", englishName: "Al-Ikhlas", type: "مكية", totalAyahs: 4, revelationOrder: 22, juzStart: 30, pageStart: 604 },
  { id: 113, name: "الفلق", englishName: "Al-Falaq", type: "مكية", totalAyahs: 5, revelationOrder: 20, juzStart: 30, pageStart: 604 },
  { id: 114, name: "الناس", englishName: "An-Nas", type: "مكية", totalAyahs: 6, revelationOrder: 21, juzStart: 30, pageStart: 604 }
];

// Helper to format numbers into 3 digits (e.g. 1 -> 001)
export function pad3(num: number): string {
  return String(num).padStart(3, '0');
}

// Helper to remove Arabic diacritics / tashkeel for diacritic-free verse search and normalization
export function removeArabicDiacritics(text: string): string {
  if (!text) return '';
  return text
    // Remove all Arabic diacritics / tashkeel / harakat / tanween / sukoon / shaddah / dagger alef / wasla / tatweel
    .replace(/[\u0610-\u061A\u0640\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '')
    // Normalize Alef forms (أ, إ, آ, ٱ -> ا)
    .replace(/[أإآٱ]/g, 'ا')
    // Normalize Ya / Alef Maqsura (ى -> ي)
    .replace(/ى/g, 'ي')
    // Normalize Taa Marbouta (ة -> ه)
    .replace(/ة/g, 'ه')
    .trim();
}

// Helper to strip leading Bismillah from Ayah 1 of any Surah except Surah 1 (Al-Fatihah) and Surah 9 (At-Tawbah)
export function stripLeadingBismillah(text: string, surahId: number, ayahNumber: number): string {
  if (!text || surahId === 1 || surahId === 9 || ayahNumber !== 1) {
    return text;
  }

  // Check if normalized text starts with Bismillah
  const norm = removeArabicDiacritics(text);
  if (norm.startsWith("بسم الله الرحمن الرحيم") || norm.startsWith("بسم الله")) {
    const words = text.trim().split(/\s+/);
    if (words.length > 4) {
      return words.slice(4).join(' ').trim();
    }
  }

  return text;
}

// Global Ayah Cumulative Index for everyayah / cdn.islamic.network
export function calculateGlobalAyahNumber(surahId: number, ayahNumber: number): number {
  let count = 0;
  for (let i = 0; i < surahId - 1; i++) {
    count += quranCatalog[i].totalAyahs;
  }
  return count + ayahNumber;
}

// Available reciters list - EXCLUSIVELY: Sheikh Mohamed Siddiq El-Minshawi (Mujawwad & Murattal)
export const recitersList: Reciter[] = [
  {
    id: "minshawi_mujawwad",
    name: "الشيخ محمد صديق المنشاوي",
    subTitle: "المصحف المجود الخالد",
    type: "مجود",
    getAyahAudioUrl: (surahId, ayahNumber) => 
      `https://everyayah.org/data/Minshawy_Mujawwad_192kbps/${pad3(surahId)}${pad3(ayahNumber)}.mp3`,
    getSurahAudioUrl: (surahId) => 
      `https://download.quranicaudio.com/quran/mohamed_siddiq_el-minshawi_mujawwad/${pad3(surahId)}.mp3`
  },
  {
    id: "minshawi_murattal",
    name: "الشيخ محمد صديق المنشاوي",
    subTitle: "المصحف المرتل الخاشع",
    type: "مرتل",
    getAyahAudioUrl: (surahId, ayahNumber) => 
      `https://everyayah.org/data/Minshawy_Murattal_128kbps/${pad3(surahId)}${pad3(ayahNumber)}.mp3`,
    getSurahAudioUrl: (surahId) => 
      `https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawi/${pad3(surahId)}.mp3`
  }
];

// Helper to get fallback audio URLs when primary CDN fails or is offline
export function getMinshawiFallbackAudioUrl(reciterId: string, surahId: number, ayahNumber: number, attempt: number): string {
  const globalNum = calculateGlobalAyahNumber(surahId, ayahNumber);
  const isMujawwad = reciterId === "minshawi_mujawwad";

  if (attempt === 1) {
    // Islamic Network CDN (Global Ayah Number)
    const identifier = isMujawwad ? "ar.minshawimujawwad" : "ar.minshawi";
    return `https://cdn.islamic.network/quran/audio/128/${identifier}/${globalNum}.mp3`;
  } else if (attempt === 2) {
    // Quran CDN / EveryAyah mirror
    const folder = isMujawwad ? "Minshawy_Mujawwad_192kbps" : "Minshawy_Murattal_128kbps";
    return `https://server11.mp3quran.net/minsh/${pad3(surahId)}.mp3`;
  }
  
  // Default primary URL
  const folder = isMujawwad ? "Minshawy_Mujawwad_192kbps" : "Minshawy_Murattal_128kbps";
  return `https://everyayah.org/data/${folder}/${pad3(surahId)}${pad3(ayahNumber)}.mp3`;
}

export interface SearchableVerse {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  normText: string;
}

let inMemoryFullQuranIndex: SearchableVerse[] | null = null;

// Complete 6,236 verses Quran search index helper for 100% offline & diacritic-free search
export async function getFullQuranSearchIndex(): Promise<SearchableVerse[]> {
  if (inMemoryFullQuranIndex && inMemoryFullQuranIndex.length > 6000) {
    return inMemoryFullQuranIndex;
  }

  // Check LocalStorage cache
  const cacheKey = 'al_furqan_quran_search_index_v2';
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed: SearchableVerse[] = JSON.parse(cached);
      if (parsed && parsed.length > 6000) {
        inMemoryFullQuranIndex = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Error reading cached Quran search index:", e);
  }

  // Fetch complete diacritic-free Quran text from AlQuran Cloud or CDN
  try {
    const res = await fetch('https://api.alquran.cloud/v1/quran/quran-simple-clean');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.surahs) {
        const fullList: SearchableVerse[] = [];
        json.data.surahs.forEach((surah: any) => {
          const surahId = surah.number;
          const catInfo = quranCatalog.find(c => c.id === surahId);
          const surahName = catInfo ? catInfo.name : surah.name.replace(/^(سُورَةُ|سورة)\s*/, '');

          surah.ayahs.forEach((a: any) => {
            const rawText = stripLeadingBismillah(a.text, surahId, a.numberInSurah);
            fullList.push({
              surahId,
              surahName,
              ayahNumber: a.numberInSurah,
              text: rawText,
              normText: removeArabicDiacritics(rawText)
            });
          });
        });

        if (fullList.length > 6000) {
          inMemoryFullQuranIndex = fullList;
          try {
            localStorage.setItem(cacheKey, JSON.stringify(fullList));
          } catch (e) {
            console.warn("Storage quota exceeded saving full Quran index:", e);
          }
          return fullList;
        }
      }
    }
  } catch (err) {
    console.warn("Failed to fetch full Quran simple clean text index online:", err);
  }

  // Fallback: build from prepackaged & catalog
  const fallbackList: SearchableVerse[] = [];
  Object.values(prepackagedSurahs).forEach(s => {
    s.verses.forEach(v => {
      const rawText = stripLeadingBismillah(v.text, s.id, v.number);
      fallbackList.push({
        surahId: s.id,
        surahName: s.name.replace(/^(سُورَةُ|سورة)\s*/, ''),
        ayahNumber: v.number,
        text: rawText,
        normText: removeArabicDiacritics(rawText)
      });
    });
  });

  return fallbackList;
}

// Pre-packaged offline data for quick immediate loading of essential Surahs
export const prepackagedSurahs: Record<number, Surah> = {
  1: {
    id: 1,
    name: "سورة الفاتحة",
    englishName: "Al-Fatihah",
    type: "مكية",
    totalAyahs: 7,
    revelationOrder: 5,
    description: "فاتحة الكتاب وأعظم سور القرآن الكريم، اشتملت على مجمل مقاصد الدين الحنيف.",
    verses: [
      { number: 1, text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", tafsir: "أبدأ تلاوة القرآن باسم الله مستعيناً به، الله: المعبود بحق، الرحمن: ذو الرحمة الواسعة، الرحيم: ذو الرحمة الخاصة بالمؤمنين.", page: 1, juz: 1 },
      { number: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", tafsir: "الثناء الكامل بالجميل لله وحده مستحق كل حمد، مالك المخلوقات ومدبر أمرهم.", page: 1, juz: 1 },
      { number: 3, text: "الرَّحْمَنِ الرَّحِيمِ", tafsir: "الذي وسعت رحمته كل شيء في الدنيا، ورحيم بالمؤمنين في الآخرة.", page: 1, juz: 1 },
      { number: 4, text: "مَالِكِ يَوْمِ الدِّينِ", tafsir: "مالك يوم الحساب والجزاء، وهو يوم القيامة حيث لا ملك لأحد سواه.", page: 1, juz: 1 },
      { number: 5, text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", tafsir: "نخصك وحدك بالعبادة والطاعة، ونستعين بك وحدك في كل أمورنا.", page: 1, juz: 1 },
      { number: 6, text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", tafsir: "ارشدنا ووفقنا وسلك بنا الطريق الواضح الذي لا اعوجاج فيه وهو الإسلام.", page: 1, juz: 1 },
      { number: 7, text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", tafsir: "طريق الأنبياء والصالحين الذين أنعمت عليهم بالهدى، غير طريق المغضوب عليهم (اليهود) ولا الضالين (النصارى).", page: 1, juz: 1 }
    ]
  },
  112: {
    id: 112,
    name: "سورة الإخلاص",
    englishName: "Al-Ikhlas",
    type: "مكية",
    totalAyahs: 4,
    revelationOrder: 22,
    description: "تعدل ثلث القرآن الكريم، تصف التوحيد الخالص وتفرّد الله جل وعلا بالكمال.",
    verses: [
      { number: 1, text: "قُلْ هُوَ اللَّهُ أَحَدٌ", tafsir: "قل يا محمد: الله هو الواحد المنفرد بالألوهية والربوبية والكمال لا شريك له.", page: 604, juz: 30 },
      { number: 2, text: "اللَّهُ الصَّمَدُ", tafsir: "الله الذي تقصده الخلائق وتصمد إليه في حوائجها لمكملية سؤدده وعظمته.", page: 604, juz: 30 },
      { number: 3, text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", tafsir: "ليس له ولد ولا والد لتنزهه عن صفات المخلوقين والمحدثات.", page: 604, juz: 30 },
      { number: 4, text: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", tafsir: "ولم يكن له مكافئ ولا مماثل ولا نظير في الذات والصفات والأفعال.", page: 604, juz: 30 }
    ]
  },
  113: {
    id: 113,
    name: "سورة الفلق",
    englishName: "Al-Falaq",
    type: "مكية",
    totalAyahs: 5,
    revelationOrder: 20,
    description: "سورة المعوذة الأولى، للتحصين برب الصبح والفجر من شرور المخلوقات والساحرات والحاسدين.",
    verses: [
      { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", tafsir: "قل: ألوذ وأتحصن برب الفجر والصبح المنشق.", page: 604, juz: 30 },
      { number: 2, text: "مِن شَرِّ مَا خَلَقَ", tafsir: "من شر كل مخلوق من الإنس والجن والدواب والأشياء المؤذية.", page: 604, juz: 30 },
      { number: 3, text: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", tafsir: "ومن شر الليل إذا أظلم ودخل، لما ينتشر فيه من الشياطين والمؤذيات.", page: 604, juz: 30 },
      { number: 4, text: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", tafsir: "ومن شر الساحرات اللاتي ينفثن في عقد السحر لإلحاق الضرر.", page: 604, juz: 30 },
      { number: 5, text: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", tafsir: "ومن شر كل حاسد يتمنى زوال النعمة عن غيره ويسعى لإيذائه.", page: 604, juz: 30 }
    ]
  },
  114: {
    id: 114,
    name: "سورة الناس",
    englishName: "An-Nas",
    type: "مكية",
    totalAyahs: 6,
    revelationOrder: 21,
    description: "سورة المعوذة الثانية، للاعتصام برب الناس وملكهم وإلههم من الوسواس الخناس.",
    verses: [
      { number: 1, text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", tafsir: "قل: ألوذ برب البشر ومدبر أمورهم وخالقهم.", page: 604, juz: 30 },
      { number: 2, text: "مَلِكِ النَّاسِ", tafsir: "مالك كل شيء فيهم والمتصرف بحكمته وعدله.", page: 604, juz: 30 },
      { number: 3, text: "إِلَهِ النَّاسِ", tafsir: "معبودهم الحق الذي لا يجوز أن تعبد الخلائق أحداً غيره.", page: 604, juz: 30 },
      { number: 4, text: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", tafsir: "من شر الشيطان الذي يوسوس في القلب عند الغفلة ويخنس ويفر عند ذكر الله.", page: 604, juz: 30 },
      { number: 5, text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", tafsir: "الذي ينفث الشرور والتسويلات في صدور الإنس والجن.", page: 604, juz: 30 },
      { number: 6, text: "مِنَ الْجِنَّةِ وَالنَّاسِ", tafsir: "سواء كان هذا الموسوس من أشرار الجن أو من أشرار الإنس.", page: 604, juz: 30 }
    ]
  },
  67: {
    id: 67,
    name: "سورة الملك",
    englishName: "Al-Mulk",
    type: "مكية",
    totalAyahs: 30,
    revelationOrder: 77,
    description: "المانعة والمنجية من عذاب القبر، تفتح الجلائل لعظمة الله وبديع خلقه للسماوات والأرض.",
    verses: [
      { number: 1, text: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", tafsir: "تثابت وكَثُرَ خير وتنزه الله الذي بيده السلطان القاهر والملك وهو القادر على كل شيء.", page: 562, juz: 29 },
      { number: 2, text: "الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ", tafsir: "خلق الموت والحياة ليختبركم أيهم أخلص عملاً وأصوبه لله جل وعلا.", page: 562, juz: 29 },
      { number: 3, text: "الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ", tafsir: "خلق سبع سماوات بعضها فوق بعض مستوية بلا خلل ولا تناقض.", page: 562, juz: 29 }
    ]
  },
  36: {
    id: 36,
    name: "سورة يس",
    englishName: "Ya-Sin",
    type: "مكية",
    totalAyahs: 83,
    revelationOrder: 41,
    description: "قلب القرآن الكريم، تضمنت الحجج على البعث والنشور والرسالة الإلهية.",
    verses: [
      { number: 1, text: "يس", tafsir: "من الحروف المقطعة في أوائل السور للتحدي والإعجاز.", page: 440, juz: 22 },
      { number: 2, text: "وَالْقُرْآنِ الْحَكِيمِ", tafsir: "قسم بالقرآن المحكم المشتمل على الحكمة والأحكام المتقنة.", page: 440, juz: 22 },
      { number: 3, text: "إِنَّكَ لَمِنَ الْمُرْسَلِينَ", tafsir: "إنك يا محمد لمن المرسلين من الله بالهدى ودين الحق.", page: 440, juz: 22 },
      { number: 4, text: "عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ", tafsir: "على منهج وطريق واضح قويم هو الإسلام.", page: 440, juz: 22 },
      { number: 5, text: "تَنزِيلَ الْعَزِيزِ الرَّحِيمِ", tafsir: "هذا القرآن تنزيل رب العالمين العزيز في انتقامه الرحيم بعباده.", page: 440, juz: 22 }
    ]
  }
};

// In-memory cache for loaded Surahs
const loadedSurahCache: Map<number, Surah> = new Map();

// Local Storage / IndexedDB persistent fetch helper
export async function fetchFullSurah(surahId: number): Promise<Surah> {
  // Check memory cache
  if (loadedSurahCache.has(surahId)) {
    return loadedSurahCache.get(surahId)!;
  }

  // Check localStorage cache
  const cacheKey = `al_furqan_surah_v5_${surahId}`;
  try {
    const cachedStr = localStorage.getItem(cacheKey);
    if (cachedStr) {
      const parsed: Surah = JSON.parse(cachedStr);
      if (parsed && parsed.verses && parsed.verses.length > 0) {
        // Ensure even cached verses are stripped of leading Bismillah
        parsed.verses = parsed.verses.map(v => ({
          ...v,
          text: stripLeadingBismillah(v.text, surahId, v.number)
        }));
        loadedSurahCache.set(surahId, parsed);
        return parsed;
      }
    }
  } catch (e) {
    console.warn("LocalStorage read error:", e);
  }

  // If in prepackaged, return prepackaged while fetching full asynchronously
  const prepackaged = prepackagedSurahs[surahId];

  // Primary API: AlQuran Cloud API (Uthmani + Tafsir Muyassar)
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,ar.veryeasy`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.length >= 1) {
        const uthmaniData = json.data[0];
        const tafsirData = json.data[1];

        const catInfo = quranCatalog.find(s => s.id === surahId);

        const verses: Ayah[] = uthmaniData.ayahs.map((a: any, idx: number) => {
          const tafsirText = tafsirData?.ayahs?.[idx]?.text || "";
          const cleanedText = stripLeadingBismillah(a.text, surahId, a.numberInSurah);
          return {
            number: a.numberInSurah,
            globalNumber: a.number,
            text: cleanedText,
            tafsir: tafsirText,
            page: a.page,
            juz: a.juz,
            hizb: a.hizbQuarter ? Math.ceil(a.hizbQuarter / 4) : undefined
          };
        });

        const fullSurah: Surah = {
          id: surahId,
          name: catInfo ? catInfo.name : uthmaniData.name.replace(/^(سُورَةُ|سورة)\s*/, ''),
          englishName: uthmaniData.englishName || catInfo?.englishName || "",
          type: uthmaniData.revelationType === 'Meccan' ? 'مكية' : 'مدنية',
          totalAyahs: uthmaniData.numberOfAyahs,
          revelationOrder: catInfo?.revelationOrder || 1,
          verses: verses
        };

        // Store in memory and local cache
        loadedSurahCache.set(surahId, fullSurah);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(fullSurah));
        } catch (e) {
          console.warn("LocalStorage save error:", e);
        }

        return fullSurah;
      }
    }
  } catch (err) {
    console.warn(`Primary API fetch failed for Surah ${surahId}, trying secondary CDN...`, err);
  }

  // Fallback API: FawazAhmed Quran API GitHub CDN
  try {
    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranuthmani/${surahId}.json`);
    if (res.ok) {
      const json = await res.json();
      if (json && json.verses) {
        const catInfo = quranCatalog.find(s => s.id === surahId);
        const verses: Ayah[] = json.verses.map((v: any) => ({
          number: v.verse,
          text: stripLeadingBismillah(v.text, surahId, v.verse),
          page: catInfo?.pageStart
        }));

        const fullSurah: Surah = {
          id: surahId,
          name: catInfo ? catInfo.name : `${surahId}`,
          englishName: catInfo?.englishName || "",
          type: catInfo?.type || "مكية",
          totalAyahs: catInfo?.totalAyahs || verses.length,
          revelationOrder: catInfo?.revelationOrder || 1,
          verses: verses
        };

        loadedSurahCache.set(surahId, fullSurah);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(fullSurah));
        } catch (e) {}

        return fullSurah;
      }
    }
  } catch (err2) {
    console.error(`Secondary CDN fetch failed for Surah ${surahId}:`, err2);
  }

  // If prepackaged exists, return it
  if (prepackaged) {
    return prepackaged;
  }

  // Fallback empty structure
  const fallbackCat = quranCatalog.find(s => s.id === surahId);
  return {
    id: surahId,
    name: fallbackCat ? fallbackCat.name : `${surahId}`,
    englishName: fallbackCat?.englishName || "",
    type: fallbackCat?.type || "مكية",
    totalAyahs: fallbackCat?.totalAyahs || 0,
    revelationOrder: fallbackCat?.revelationOrder || 1,
    verses: [
      {
        number: 1,
        text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
        tafsir: "تعذر الاتصال بالشبكة حالياً. يرجى التأكد من الاتصال بالإنترنت لتحميل السورة بالكامل."
      }
    ]
  };
}

// Automatically clear legacy cached surahs that may contain duplicate Bismillah
try {
  if (typeof localStorage !== 'undefined') {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('al_furqan_surah_v1_') || key.startsWith('al_furqan_surah_v2_') || key.startsWith('al_furqan_surah_v3_') || key.startsWith('al_furqan_surah_v4_'))) {
        localStorage.removeItem(key);
      }
    }
  }
} catch (e) {
  console.warn("Error cleaning legacy surah cache:", e);
}
