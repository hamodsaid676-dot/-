import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Home, 
  Sparkles, 
  Layers, 
  Compass, 
  ArrowLeft,
  X,
  Filter
} from 'lucide-react';
import { quranCatalog } from '../quranData';
import { CatalogSurah } from '../types';

interface SurahsIndexViewProps {
  onSelectSurah: (surahId: number) => void;
  onBackToHome: () => void;
}

export default function SurahsIndexView({
  onSelectSurah,
  onBackToHome
}: SurahsIndexViewProps) {
  const [viewMode, setViewMode] = useState<'surahs' | 'juz'>('surahs');
  const [searchQuery, setSearchQuery] = useState('');

  // Eastern Arabic numerals list
  const easternNums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩','١٠','١١','١٢','١٣','١٤','١٥','١٦','١٧','١٨','١٩','٢٠','٢١','٢٢','٢٣','٢٤','٢٥','٢٦','٢٧','٢٨','٢٩','٣٠'];

  // Filter Catalog by name / id query
  const filteredSurahs = quranCatalog.filter((s) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return s.name.includes(query) || s.englishName.toLowerCase().includes(query) || String(s.id) === query;
  });

  // Group surahs by Juz
  const juzList = Array.from({ length: 30 }, (_, i) => {
    const juzNum = i + 1;
    const surahsInJuz = quranCatalog.filter((s) => s.juzStart === juzNum);
    return {
      juzNum,
      surahs: surahsInJuz
    };
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in" dir="rtl">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] text-[#FAF7F2] p-5 sm:p-7 rounded-3xl border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-right">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0 shadow-inner">
            <BookOpen size={26} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-quran-amiri text-[#FAF7F2]">
              فهرس القرآن الكريم
            </h2>
            <p className="text-xs text-[#D4AF37] font-sans mt-0.5">
              تصفّح القرآن الكريم بحسب السور (114 سورة) أو الأجزاء (30 جزءاً)
            </p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className="px-4 py-2.5 rounded-2xl bg-[#D4AF37] text-[#0F382C] hover:bg-[#e2bd46] font-bold text-xs transition-all flex items-center gap-2 shadow-md shrink-0 cursor-pointer"
        >
          <Home size={18} />
          <span>القائمة الرئيسية</span>
        </button>
      </div>

      {/* TWO PRIMARY NAVIGATION MODES (عرض السور / عرض الجزء) */}
      <div className="flex items-center justify-center p-1.5 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/40 shadow-md max-w-md mx-auto gap-2">
        <button
          onClick={() => setViewMode('surahs')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            viewMode === 'surahs'
              ? 'bg-[#0F382C] text-[#D4AF37] shadow-lg border border-[#D4AF37]/60'
              : 'text-slate-600 dark:text-emerald-200/80 hover:text-[#0F382C] dark:hover:text-[#D4AF37]'
          }`}
        >
          <BookOpen size={18} />
          <span>عرض السور</span>
        </button>

        <button
          onClick={() => setViewMode('juz')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            viewMode === 'juz'
              ? 'bg-[#0F382C] text-[#D4AF37] shadow-lg border border-[#D4AF37]/60'
              : 'text-slate-600 dark:text-emerald-200/80 hover:text-[#0F382C] dark:hover:text-[#D4AF37]'
          }`}
        >
          <Layers size={18} />
          <span>عرض الجزء</span>
        </button>
      </div>

      {/* VIEW MODE 1: DISPLAY BY SURAHS (عرض السور) */}
      {viewMode === 'surahs' && (
        <div className="space-y-6">
          {/* SEARCH BAR */}
          <div className="bg-white dark:bg-[#141C18] p-4 rounded-3xl border border-slate-200 dark:border-[#D4AF37]/30 shadow-lg">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن اسم السورة أو رقمها (مثال: البقرة، الكهف، يس، 114)..."
                className="w-full bg-slate-50 dark:bg-[#1A231E] text-slate-800 dark:text-[#FAF7F2] placeholder-slate-400 dark:placeholder-emerald-200/50 border border-slate-200 dark:border-[#D4AF37]/30 rounded-2xl pr-11 pl-10 py-3.5 text-sm font-sans outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all shadow-xs"
              />
              <Search size={20} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 dark:text-emerald-300 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* SURAHS GRID CATALOG */}
          {filteredSurahs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#141C18] rounded-3xl border border-slate-200 dark:border-[#D4AF37]/30 p-8 space-y-3">
              <BookOpen size={40} className="mx-auto text-slate-300 dark:text-emerald-500/40" />
              <h3 className="text-lg font-bold text-slate-700 dark:text-emerald-100">لم يتم العثور على سورة بهذا الاسم</h3>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-xl bg-[#0F382C] text-[#D4AF37] text-xs font-bold cursor-pointer hover:bg-[#164D3C] transition-all inline-block mt-2"
              >
                عرض كافة السور (114)
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.id}
                  onClick={() => onSelectSurah(surah.id)}
                  className="group p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/30 hover:border-[#D4AF37] hover:shadow-xl transition-all cursor-pointer flex items-center justify-between gap-3 relative overflow-hidden"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Surah Number Emblem */}
                    <div className="w-11 h-11 rounded-2xl bg-[#0F382C]/10 dark:bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center font-mono font-bold text-sm text-[#0F382C] dark:text-[#D4AF37] group-hover:bg-[#0F382C] group-hover:text-[#D4AF37] transition-colors shrink-0 shadow-xs">
                      {surah.id}
                    </div>

                    {/* Surah Name & Metadata */}
                    <div className="min-w-0">
                      <h3 className="font-bold font-quran-amiri text-lg sm:text-xl text-[#0F382C] dark:text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors truncate">
                        سورة {surah.name.replace(/^(سُورَةُ|سورة)\s*/, '')}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-emerald-200/70 font-sans mt-0.5 truncate">
                        {surah.totalAyahs} آية • الجزء {surah.juzStart || 1} • صفحة {surah.pageStart || 1}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-emerald-300 group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] flex items-center justify-center transition-colors shrink-0">
                    <ArrowLeft size={16} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: DISPLAY BY JUZ (عرض الجزء) */}
      {viewMode === 'juz' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {juzList.map(({ juzNum, surahs }) => {
            const easternJuz = easternNums[juzNum] || String(juzNum);
            return (
              <div
                key={juzNum}
                className="p-5 rounded-3xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/30 shadow-md hover:border-[#D4AF37] transition-all space-y-3"
              >
                {/* Juz Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37] flex items-center justify-center font-bold font-mono text-sm shadow-sm">
                      {easternJuz}
                    </div>
                    <div>
                      <h3 className="font-bold font-quran-amiri text-xl text-[#0F382C] dark:text-[#FAF7F2]">
                        الجزء {easternJuz}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-emerald-300/70 font-sans">
                        {surahs.length > 0 ? `يبدأ بسورة ${surahs[0].name.replace(/^(سُورَةُ|سورة)\s*/, '')} (صفحة ${surahs[0].pageStart})` : `الجزء رقم ${juzNum}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Surahs in this Juz */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-[#D4AF37] font-sans">السور التي تبدأ في هذا الجزء:</p>
                  {surahs.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">تابع للجزء السابق</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {surahs.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => onSelectSurah(s.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1A231E] hover:bg-[#0F382C] hover:text-[#D4AF37] text-slate-800 dark:text-[#FAF7F2] border border-slate-200 dark:border-[#D4AF37]/30 font-quran-amiri font-bold text-sm transition-all flex items-center gap-1.5 cursor-pointer group"
                        >
                          <span>سورة {s.name.replace(/^(سُورَةُ|سورة)\s*/, '')}</span>
                          <span className="text-[10px] text-slate-400 dark:text-emerald-300/60 group-hover:text-[#D4AF37] font-sans">
                            (ص {s.pageStart})
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
