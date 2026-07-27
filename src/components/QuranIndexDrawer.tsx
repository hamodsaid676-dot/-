import React, { useState } from 'react';
import { 
  Search, 
  X, 
  BookOpen, 
  Compass, 
  Layers, 
  Sparkles, 
  Check, 
  Bookmark as BookmarkIcon, 
  Heart,
  ChevronLeft
} from 'lucide-react';
import { CatalogSurah, Bookmark, FavoriteAyah } from '../types';
import { quranCatalog } from '../quranData';

interface QuranIndexDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSurahId: number;
  bookmarks: Bookmark[];
  favorites: FavoriteAyah[];
  onSelectSurah: (surahId: number) => void;
  onSelectBookmark: (bm: Bookmark) => void;
}

export default function QuranIndexDrawer({
  isOpen,
  onClose,
  activeSurahId,
  bookmarks,
  favorites,
  onSelectSurah,
  onSelectBookmark
}: QuranIndexDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'juz' | 'favorites' | 'bookmarks'>('all');
  const [selectedJuz, setSelectedJuz] = useState<number>(1);

  if (!isOpen) return null;

  // Filter Catalog Surahs
  const filteredSurahs = quranCatalog.filter((s) => {
    // Search match by Arabic name or English name or ID
    const query = searchQuery.trim().toLowerCase();
    const nameMatch = s.name.includes(query) || s.englishName.toLowerCase().includes(query) || String(s.id) === query;

    if (!nameMatch && query) return false;

    if (filterType === 'juz') return s.juzStart === selectedJuz;

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in-up" dir="rtl">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] dark:bg-[#121814] h-full shadow-2xl overflow-y-auto z-10 flex flex-col border-r border-[#D4AF37]/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-5 text-[#FAF7F2] border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#FAF7F2]">
                  فهرس سور القرآن الكريم (114 سورة)
                </h3>
                <p className="text-xs text-[#D4AF37]">
                  البحث والتصفح حسب السورة أو الجزء أو العلامات
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-[#D4AF37] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم السورة أو رقمها (مثلاً: الكهف، 18)..."
              className="w-full bg-[#09221B] text-[#FAF7F2] placeholder-emerald-200/50 border border-[#D4AF37]/40 rounded-2xl pr-10 pl-4 py-2.5 text-xs outline-none focus:border-[#D4AF37] transition-all"
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Filter Tabs */}
        <div className="p-3 bg-[#F3EFE6] dark:bg-[#18201B] border-b border-[#D4AF37]/20 flex gap-1.5 overflow-x-auto text-xs shrink-0 no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              filterType === 'all'
                ? 'bg-[#0F382C] text-[#D4AF37] shadow-xs'
                : 'text-slate-700 dark:text-emerald-200 hover:bg-white/50'
            }`}
          >
            عرض السور (114)
          </button>
          <button
            onClick={() => setFilterType('juz')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
              filterType === 'juz'
                ? 'bg-[#0F382C] text-[#D4AF37] shadow-xs'
                : 'text-slate-700 dark:text-emerald-200 hover:bg-white/50'
            }`}
          >
            عرض الجزء (30)
          </button>
          <button
            onClick={() => setFilterType('bookmarks')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1 ${
              filterType === 'bookmarks'
                ? 'bg-[#0F382C] text-[#D4AF37] shadow-xs'
                : 'text-slate-700 dark:text-emerald-200 hover:bg-white/50'
            }`}
          >
            <BookmarkIcon size={12} />
            <span>العلامات ({bookmarks.length})</span>
          </button>
          <button
            onClick={() => setFilterType('favorites')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1 ${
              filterType === 'favorites'
                ? 'bg-[#0F382C] text-[#D4AF37] shadow-xs'
                : 'text-slate-700 dark:text-emerald-200 hover:bg-white/50'
            }`}
          >
            <Heart size={12} />
            <span>المفضلة ({favorites.length})</span>
          </button>
        </div>

        {/* Juz Selector strip if filterType === 'juz' */}
        {filterType === 'juz' && (
          <div className="p-3 bg-white dark:bg-[#121814] border-b border-[#D4AF37]/20 flex items-center gap-2 overflow-x-auto shrink-0">
            <span className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] shrink-0">اختر الجزء:</span>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((j) => (
              <button
                key={j}
                onClick={() => setSelectedJuz(j)}
                className={`w-7 h-7 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center transition-all ${
                  selectedJuz === j
                    ? 'bg-[#0F382C] text-[#D4AF37] font-bold border border-[#D4AF37]'
                    : 'bg-slate-100 dark:bg-[#1C2520] text-slate-700 dark:text-emerald-200'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        )}

        {/* SURAHS LIST / BOOKMARKS / FAVORITES VIEW */}
        <div className="p-4 space-y-2 flex-grow overflow-y-auto">
          
          {/* VIEW MODE 1: BOOKMARKS LIST */}
          {filterType === 'bookmarks' && (
            <div className="space-y-2">
              {bookmarks.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-emerald-300/40 space-y-2">
                  <BookmarkIcon size={36} className="mx-auto opacity-30 text-[#D4AF37]" />
                  <p className="text-xs">لا توجد علامات قراءة محفوظة بعد.</p>
                  <p className="text-[11px]">اضغط على أي آية أثناء القراءة وحفظها كعلامة مرجعية للعودة إليها فوراً.</p>
                </div>
              ) : (
                bookmarks.map((bm, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectBookmark(bm);
                      onClose();
                    }}
                    className="w-full p-4 bg-white dark:bg-[#18201B] hover:bg-[#F3EFE6] dark:hover:bg-[#202B24] rounded-2xl border border-[#D4AF37]/30 text-right transition-all flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-[#D4AF37] flex items-center justify-center font-bold text-xs shrink-0">
                        <BookmarkIcon size={18} fill="currentColor" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-emerald-100">
                          {bm.surahName}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-emerald-300/70">
                          الآية رقم {bm.ayahNumber} {bm.page ? `• الصفحة ${bm.page}` : ''}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft size={16} className="text-[#D4AF37]" />
                  </button>
                ))
              )}
            </div>
          )}

          {/* VIEW MODE 2: FAVORITES LIST */}
          {filterType === 'favorites' && (
            <div className="space-y-2">
              {favorites.length === 0 ? (
                <div className="py-12 text-center text-slate-400 dark:text-emerald-300/40 space-y-2">
                  <Heart size={36} className="mx-auto opacity-30 text-rose-500" />
                  <p className="text-xs">لا توجد آيات في المفضلة بعد.</p>
                </div>
              ) : (
                favorites.map((fav) => (
                  <button
                    key={fav.id}
                    onClick={() => {
                      onSelectSurah(fav.surahId);
                      onClose();
                    }}
                    className="w-full p-4 bg-white dark:bg-[#18201B] hover:bg-[#F3EFE6] dark:hover:bg-[#202B24] rounded-2xl border border-rose-200 dark:border-rose-950/50 text-right transition-all space-y-2 shadow-xs"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#0F382C] dark:text-[#D4AF37]">
                        {fav.surahName} • الآية {fav.ayahNumber}
                      </span>
                      <Heart size={14} fill="currentColor" className="text-rose-500" />
                    </div>
                    <p className="font-quran-amiri text-base text-slate-800 dark:text-emerald-100 line-clamp-2">
                      « {fav.text} »
                    </p>
                  </button>
                ))
              )}
            </div>
          )}

          {/* VIEW MODE 3: STANDARD SURAHS LIST CATALOG */}
          {(filterType !== 'bookmarks' && filterType !== 'favorites') && (
            <div className="space-y-2">
              {filteredSurahs.map((s) => {
                const isActive = s.id === activeSurahId;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectSurah(s.id);
                      onClose();
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-[#0F382C] text-[#FAF7F2] border-[#D4AF37] shadow-md scale-[1.01]'
                        : 'bg-white dark:bg-[#18201B] hover:bg-[#F3EFE6] dark:hover:bg-[#202B24] text-slate-900 dark:text-emerald-100 border-slate-200 dark:border-emerald-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Surah Number Icon */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isActive 
                          ? 'bg-[#D4AF37] text-[#0F382C]' 
                          : 'bg-[#0F382C]/10 text-[#0F382C] dark:bg-[#D4AF37]/20 dark:text-[#D4AF37]'
                      }`}>
                        {s.id}
                      </div>

                      {/* Surah Name and Details */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm truncate font-quran-amiri">
                            سورة {s.name.replace(/^(سُورَةُ|سورة)\s*/, '')}
                          </h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border shrink-0 ${
                            isActive
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]'
                              : 'bg-slate-100 dark:bg-emerald-950/60 border-slate-200 dark:border-emerald-800/40 text-slate-500 dark:text-emerald-300'
                          }`}>
                            {s.type}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-[#D4AF37]' : 'text-slate-400 dark:text-emerald-300/60'}`}>
                          {s.totalAyahs} آية • الجزء {s.juzStart} • الصفحة {s.pageStart}
                        </p>
                      </div>
                    </div>

                    <ChevronLeft size={16} className={isActive ? "text-[#D4AF37]" : "text-slate-400"} />
                  </button>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
