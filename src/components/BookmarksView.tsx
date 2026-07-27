import React from 'react';
import { Home, Bookmark, Heart, ChevronLeft, Trash2, BookOpen } from 'lucide-react';
import { Bookmark as BookmarkType, FavoriteAyah } from '../types';

interface BookmarksViewProps {
  bookmarks: BookmarkType[];
  favorites: FavoriteAyah[];
  onBackToHome: () => void;
  onSelectBookmark: (bm: BookmarkType) => void;
  onSelectFavorite: (fav: FavoriteAyah) => void;
  onDeleteBookmark: (bm: BookmarkType) => void;
  onDeleteFavorite: (favId: string) => void;
}

export default function BookmarksView({
  bookmarks,
  favorites,
  onBackToHome,
  onSelectBookmark,
  onSelectFavorite,
  onDeleteBookmark,
  onDeleteFavorite
}: BookmarksViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in" dir="rtl">
      
      {/* HEADER BANNER WITH HOME BUTTON */}
      <div className="flex items-center justify-between bg-[#0F382C] text-[#FAF7F2] p-4 sm:p-5 rounded-3xl border border-[#D4AF37]/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Bookmark size={22} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-quran-amiri">العلامات المرجعية والمفضلة</h2>
            <p className="text-xs text-[#D4AF37]/90 font-sans">
              السور والآيات التي حفظتها للعودة إليها ومتابعة التلاوة
            </p>
          </div>
        </div>

        {/* PRIMARY HOME BUTTON */}
        <button
          onClick={onBackToHome}
          className="px-3.5 py-2 rounded-2xl bg-[#D4AF37] text-[#0F382C] hover:bg-[#e2bd46] font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <Home size={18} />
          <span>الرئيسية</span>
        </button>
      </div>

      {/* BOOKMARKS SECTION */}
      <div className="space-y-3">
        <h3 className="font-bold text-base text-[#0F382C] dark:text-[#D4AF37] flex items-center gap-2">
          <Bookmark size={18} />
          <span>العلامات المرجعية المحفوظة ({bookmarks.length}):</span>
        </h3>

        {bookmarks.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-white/10 text-center text-xs text-slate-500 dark:text-emerald-200/70">
            لم تحفظ أي علامات قراءة بعد. يمكنك حفظ علامة قراءة عند الضغط على نص الآية في المصحف.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarks.map((bm, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/30 shadow-sm flex items-center justify-between gap-3 group"
              >
                <div
                  onClick={() => onSelectBookmark(bm)}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0F382C] text-[#D4AF37] flex items-center justify-center font-bold shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-base font-quran-amiri text-[#0F382C] dark:text-[#FAF7F2] group-hover:text-[#D4AF37] truncate">
                      {bm.surahName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-emerald-200/70">
                      الآية {bm.ayahNumber} {bm.page ? `• الصفحة ${bm.page}` : ''}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteBookmark(bm)}
                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                  title="حذف العلامة"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAVORITES SECTION */}
      <div className="space-y-3 pt-4">
        <h3 className="font-bold text-base text-[#0F382C] dark:text-[#D4AF37] flex items-center gap-2">
          <Heart size={18} fill="currentColor" className="text-rose-500" />
          <span>الآيات المفضلة ({favorites.length}):</span>
        </h3>

        {favorites.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-white/10 text-center text-xs text-slate-500 dark:text-emerald-200/70">
            لم تُضف أي آية للمفضلة بعد. الضغط على أي آية يتيح لك إضافتها للمفضلة.
          </div>
        ) : (
          <div className="space-y-3">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/30 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#0F382C] dark:text-[#D4AF37]">
                  <span>سورة {fav.surahName} • الآية {fav.ayahNumber}</span>
                  <button
                    onClick={() => onDeleteFavorite(fav.id)}
                    className="text-rose-400 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>إزالة</span>
                  </button>
                </div>

                <p 
                  onClick={() => onSelectFavorite(fav)}
                  className="font-quran-amiri text-2xl leading-relaxed text-[#0F382C] dark:text-[#FAF7F2] cursor-pointer hover:text-[#D4AF37] transition-colors"
                >
                  ﴿ {fav.text} ﴾
                </p>

                {fav.tafsir && (
                  <p className="text-xs text-slate-600 dark:text-emerald-200/80 bg-[#0F382C]/5 dark:bg-[#D4AF37]/5 p-3 rounded-xl">
                    {fav.tafsir}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
