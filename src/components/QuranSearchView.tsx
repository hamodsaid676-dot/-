import React, { useState, useEffect } from 'react';
import { Home, Search, BookOpen, Volume2, Copy, Check, ArrowRight, Loader2, Sparkles, X, WifiOff } from 'lucide-react';
import { 
  quranCatalog, 
  prepackagedSurahs, 
  removeArabicDiacritics, 
  getFullQuranSearchIndex, 
  SearchableVerse 
} from '../quranData';

interface QuranSearchViewProps {
  onBackToHome: () => void;
  onSelectSurah: (surahId: number, ayahNumber?: number) => void;
  onPlayAyah: (surahId: number, ayahNumber: number) => void;
  onCopyText: (text: string) => void;
}

interface VerseSearchResult {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
}

export default function QuranSearchView({
  onBackToHome,
  onSelectSurah,
  onPlayAyah,
  onCopyText
}: QuranSearchViewProps) {
  const [query, setQuery] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [fullIndex, setFullIndex] = useState<SearchableVerse[]>([]);
  const [isIndexLoading, setIsIndexLoading] = useState<boolean>(true);
  const [apiResults, setApiResults] = useState<VerseSearchResult[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState<boolean>(false);

  // Quick popular search suggestions
  const quickSuggestions = [
    "إياك نعبد وإياك نستعين",
    "الله لا إله إلا هو الحي القيوم",
    "اهدنا الصراط المستقيم",
    "الله نور السماوات والأرض",
    "يس والقرآن الحكيم",
    "قل هو الله أحد"
  ];

  // Load the full 6,236 Quran verses search index into memory
  useEffect(() => {
    let isMounted = true;
    setIsIndexLoading(true);

    getFullQuranSearchIndex()
      .then((index) => {
        if (isMounted) {
          setFullIndex(index);
          setIsIndexLoading(false);
        }
      })
      .catch((err) => {
        console.warn("Error loading full Quran index:", err);
        if (isMounted) setIsIndexLoading(false);
      });

    return () => { isMounted = false; };
  }, []);

  const normQuery = removeArabicDiacritics(query);

  // 1. Comprehensive Local Search across all 6,236 verses
  const localMatches: VerseSearchResult[] = [];

  if (normQuery.length >= 2) {
    // Check if query is Surah Number / Verse reference like "2:255" or "البقرة 255"
    const refMatch = normQuery.match(/^(\d+|[a-zA-Z\u0600-\u06FF\s]+)[:\s]+(\d+)$/);
    if (refMatch) {
      const surahPart = refMatch[1].trim();
      const ayahNum = Number(refMatch[2]);
      
      let matchedSurah = quranCatalog.find(s => s.id === Number(surahPart));
      if (!matchedSurah) {
        matchedSurah = quranCatalog.find(s => removeArabicDiacritics(s.name).includes(surahPart));
      }

      if (matchedSurah) {
        const foundVerse = fullIndex.find(v => v.surahId === matchedSurah!.id && v.ayahNumber === ayahNum);
        if (foundVerse) {
          localMatches.push({
            surahId: foundVerse.surahId,
            surahName: foundVerse.surahName,
            ayahNumber: foundVerse.ayahNumber,
            text: foundVerse.text
          });
        }
      }
    }

    // Direct Diacritic-Free Full-Text Search across all 6,236 verses
    if (fullIndex.length > 0) {
      fullIndex.forEach((item) => {
        if (item.normText.includes(normQuery)) {
          localMatches.push({
            surahId: item.surahId,
            surahName: item.surahName,
            ayahNumber: item.ayahNumber,
            text: item.text
          });
        }
      });
    } else {
      // Fallback to prepackaged & cached surahs
      Object.values(prepackagedSurahs).forEach(s => {
        s.verses.forEach(v => {
          const normVerseText = removeArabicDiacritics(v.text);
          if (normVerseText.includes(normQuery)) {
            localMatches.push({
              surahId: s.id,
              surahName: s.name.replace(/^(سُورَةُ|سورة)\s*/, ''),
              ayahNumber: v.number,
              text: v.text
            });
          }
        });
      });
    }
  }

  // 2. Parallel Clean API Search (quran-simple-clean - diacritic insensitive)
  useEffect(() => {
    if (normQuery.length < 2) {
      setApiResults([]);
      setIsSearchingApi(false);
      return;
    }

    let isMounted = true;
    setIsSearchingApi(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(normQuery)}/all/quran-simple-clean`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json && json.data && json.data.matches) {
            const matches: VerseSearchResult[] = json.data.matches.map((m: any) => ({
              surahId: m.surah.number,
              surahName: m.surah.name.replace(/^(سُورَةُ|سورة)\s*/, ''),
              ayahNumber: m.numberInSurah,
              text: m.text
            }));
            setApiResults(matches);
          }
        }
      } catch (err) {
        console.warn("Online Quran search API error:", err);
      } finally {
        if (isMounted) setIsSearchingApi(false);
      }
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [normQuery]);

  // Combine and deduplicate local + API results
  const allResultsMap = new Map<string, VerseSearchResult>();
  
  localMatches.forEach(r => {
    allResultsMap.set(`${r.surahId}:${r.ayahNumber}`, r);
  });

  apiResults.forEach(r => {
    if (!allResultsMap.has(`${r.surahId}:${r.ayahNumber}`)) {
      allResultsMap.set(`${r.surahId}:${r.ayahNumber}`, r);
    }
  });

  const combinedResults = Array.from(allResultsMap.values());

  const handleCopy = (key: string, text: string, surahName: string, ayahNum: number) => {
    onCopyText(`﴿ ${text} ﴾\n[سورة ${surahName} - الآية ${ayahNum}]\n— تطبيق الفرقان`);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in" dir="rtl">
      
      {/* HEADER BANNER */}
      <div className="flex items-center justify-between bg-[#0F382C] text-[#FAF7F2] p-4 sm:p-6 rounded-3xl border border-[#D4AF37]/40 shadow-xl">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Search size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-quran-amiri">البحث الشامل والدقيق في آيات المصحف</h2>
            <p className="text-xs text-[#D4AF37] font-sans mt-0.5">
              ابحث في كافة آيات القرآن الكريم الـ 6,236 بدون تشكيل - يعمل أوفلاين ومباشرة
            </p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="px-3.5 py-2.5 rounded-2xl bg-[#D4AF37] text-[#0F382C] hover:bg-[#e2bd46] font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <Home size={18} />
          <span>الرئيسية</span>
        </button>
      </div>

      {/* INPUT SEARCH BAR */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اكتب جزءاً من الآية أو اسم السورة (مثال: الله لا إله إلا هو، اهدنا الصراط، البقرة 255...)"
            className="w-full bg-white dark:bg-[#141C18] text-[#0F382C] dark:text-[#FAF7F2] border-2 border-[#D4AF37]/50 focus:border-[#D4AF37] rounded-2xl p-4 pr-12 pl-10 text-base font-bold outline-none shadow-lg transition-all"
            autoFocus
          />
          <Search size={22} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
          
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-emerald-300/70 font-sans px-2">
          <span className="flex items-center gap-1">
            <span>✨ البحث دقيق وغير متأثر بالتشكيل والرموز</span>
            {fullIndex.length > 6000 && (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">(المصحف كاملاً متاح أوفلاين)</span>
            )}
          </span>

          {(isSearchingApi || isIndexLoading) && (
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
              <Loader2 size={14} className="animate-spin" />
              <span>جاري الفهرسة والبحث...</span>
            </span>
          )}
        </div>
      </div>

      {/* QUICK PRESET SUGGESTIONS */}
      {query.trim() === '' && (
        <div className="bg-white dark:bg-[#141C18] p-5 rounded-3xl border border-slate-200 dark:border-[#D4AF37]/30 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F382C] dark:text-[#D4AF37]">
            <Sparkles size={16} />
            <span>مقترحات سريعة للبحث في الآيات:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(sug)}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1A231E] hover:bg-[#0F382C] hover:text-[#D4AF37] text-slate-700 dark:text-[#FAF7F2] border border-slate-200 dark:border-[#D4AF37]/30 text-xs font-quran-amiri font-bold transition-all cursor-pointer shadow-2xs"
              >
                ﴿ {sug} ﴾
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SEARCH RESULTS LIST */}
      {query.trim() !== '' && (
        <div className="space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-sm text-[#0F382C] dark:text-[#D4AF37] flex items-center gap-2">
              <BookOpen size={18} />
              <span>نتائج مطابقة الآيات الكريمة ({combinedResults.length}):</span>
            </h3>
          </div>

          {combinedResults.length > 0 ? (
            <div className="space-y-3.5">
              {combinedResults.map((v) => {
                const key = `${v.surahId}:${v.ayahNumber}`;
                return (
                  <div
                    key={key}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#141C18] border-2 border-slate-200 dark:border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-md transition-all space-y-4"
                  >
                    {/* Header: Surah & Verse Badge */}
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] border-b border-slate-100 dark:border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#0F382C] text-[#D4AF37] flex items-center justify-center font-mono font-bold text-xs">
                          {v.ayahNumber}
                        </span>
                        <span className="font-quran-amiri text-base">سورة {v.surahName} • آية {v.ayahNumber}</span>
                      </div>

                      <button
                        onClick={() => onSelectSurah(v.surahId, v.ayahNumber)}
                        className="px-3 py-1.5 rounded-xl bg-[#0F382C]/10 dark:bg-[#D4AF37]/20 hover:bg-[#0F382C] hover:text-[#D4AF37] text-[#0F382C] dark:text-[#D4AF37] font-bold text-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>الانتقال في المصحف</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Verse Calligraphy Text */}
                    <p className="font-quran-uthman text-2xl sm:text-3xl leading-[2.4] text-[#0F382C] dark:text-[#FAF7F2] text-justify select-none">
                      ﴿ {v.text} ﴾
                    </p>

                    {/* Action Bar */}
                    <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-end gap-2">
                      <button
                        onClick={() => onPlayAyah(v.surahId, v.ayahNumber)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#0F382C] text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#164D3C] transition-all shadow-xs"
                      >
                        <Volume2 size={15} />
                        <span>استماع بصوت المنشاوي</span>
                      </button>

                      <button
                        onClick={() => handleCopy(key, v.text, v.surahName, v.ayahNumber)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-[#FAF7F2] text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
                      >
                        {copiedKey === key ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                        <span>{copiedKey === key ? 'تم النسخ' : 'نسخ الآية'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            !isSearchingApi && !isIndexLoading && (
              <div className="py-12 text-center bg-white dark:bg-[#141C18] rounded-3xl border border-slate-200 dark:border-[#D4AF37]/30 p-8 space-y-3">
                <Search size={40} className="mx-auto text-slate-300 dark:text-emerald-500/40" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-emerald-100">
                  لم نتمكن من العثور على آيات تطابق "{query}"
                </h3>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-sans">
                  تأكد من كتابة الكلمات بشكل صحيح أو جرب استخدام كلمات أخرى من نص الآية المباركة.
                </p>
              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}
