import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Bookmark, 
  Scroll, 
  Heart, 
  ChevronLeft,
  Sparkle,
  Info,
  Code,
  Globe,
  Award,
  X,
  Smartphone,
  Bell,
  Volume2
} from 'lucide-react';
import { AppViewMode, Bookmark as BookmarkType } from '../types';

interface MainHomeMenuProps {
  onSelectOption: (view: AppViewMode) => void;
  latestBookmark?: BookmarkType | null;
  totalBookmarksCount: number;
  totalFavoritesCount: number;
  salawatIntervalMinutes?: number;
  onOpenSalawatModal?: () => void;
}

export default function MainHomeMenu({
  onSelectOption,
  latestBookmark,
  totalBookmarksCount,
  totalFavoritesCount,
  salawatIntervalMinutes = 0,
  onOpenSalawatModal
}: MainHomeMenuProps) {
  const [showAboutModal, setShowAboutModal] = useState(false);

  // The title tabs requested in exact order:
  // 1. سور القرآن
  // 2. البحث على آية
  // 3. آيات قنوات الصلاة
  // 4. العلامات المرجعية
  // 5. أدعية الصحيفة السجادية
  // 6. دعاء اختتام المصحف
  const tabs = [
    {
      id: 'surahs' as AppViewMode,
      num: '١',
      title: 'سور القرآن',
      icon: BookOpen,
      badge: '١١٤ سورة'
    },
    {
      id: 'search' as AppViewMode,
      num: '٢',
      title: 'البحث على آية',
      icon: Search,
      badge: 'بحث في الآيات'
    },
    {
      id: 'qunut' as AppViewMode,
      num: '٣',
      title: 'آيات قنوت الصلاة',
      icon: Sparkles,
      badge: 'أدعية القنوت'
    },
    {
      id: 'bookmarks' as AppViewMode,
      num: '٤',
      title: 'العلامات المرجعية',
      icon: Bookmark,
      badge: `${totalBookmarksCount} علامة`
    },
    {
      id: 'sajjadiyya' as AppViewMode,
      num: '٥',
      title: 'أدعية الصحيفة السجادية',
      icon: Heart,
      badge: 'الصحيفة المباركة'
    },
    {
      id: 'duaa_khatm' as AppViewMode,
      num: '٦',
      title: 'دعاء اختتام المصحف',
      icon: Scroll,
      badge: 'ختم القرآن'
    },
    {
      id: 'android_inspector' as AppViewMode,
      num: '٧',
      title: 'تطبيق أندرويد (Kotlin)',
      icon: Smartphone,
      badge: 'شاشة واحدة • Jetpack Compose'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 animate-fade-in" dir="rtl">
      
      {/* APP HERO BANNER */}
      <div className="bg-gradient-to-br from-[#0F382C] via-[#184D3D] to-[#0D3126] text-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden text-center">
        
        {/* Background Islamic Geometric Pattern Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold">
            <Sparkle size={14} className="animate-spin" />
            <span>تطبيق الفرقان - المصحف الإلكتروني الشامل</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-quran-amiri text-[#FAF7F2] tracking-wide pt-1">
            القرآن الكريم والأدعية المباركة
          </h1>

          <p className="text-xs sm:text-sm text-[#D4AF37]/90 font-sans leading-relaxed">
            تلاوة خاشعة بصوت القارئ <strong className="text-[#FAF7F2]">الشيخ محمد صديق المنشاوي</strong>
          </p>

        </div>
      </div>

      {/* CONTINUATION BOOKMARK BANNER IF AVAILABLE */}
      {latestBookmark && (
        <div className="bg-gradient-to-r from-[#D4AF37]/20 via-amber-500/15 to-[#D4AF37]/20 p-4 rounded-2xl border border-[#D4AF37]/50 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#0F382C] flex items-center justify-center font-bold shadow-md shrink-0">
              <Bookmark size={20} fill="currentColor" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] block">متابعة القراءة الأخيرة:</span>
              <p className="font-quran-amiri font-bold text-base text-[#0F382C] dark:text-[#FAF7F2]">
                {latestBookmark.surahName} - آية {latestBookmark.ayahNumber}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectOption('surahs')}
            className="px-4 py-2 rounded-xl bg-[#0F382C] text-[#D4AF37] hover:bg-[#164D3C] border border-[#D4AF37]/50 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
          >
            <span>الانتقال للسورة</span>
            <ChevronLeft size={16} />
          </button>
        </div>
      )}

      {/* SINGLE UNIFIED BOARD WITH TITLE TABS (لوح واحد فيه تبويبات عناوين فقط) */}
      <div className="bg-white/90 dark:bg-[#141C18] p-5 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl relative space-y-5">
        
        {/* Board Decorative Corner Ornaments */}
        <div className="absolute top-3 right-3 text-[#D4AF37]/40 text-xl font-mono select-none">﴿</div>
        <div className="absolute top-3 left-3 text-[#D4AF37]/40 text-xl font-mono select-none">﴾</div>
        <div className="absolute bottom-3 right-3 text-[#D4AF37]/40 text-xl font-mono select-none">﴾</div>
        <div className="absolute bottom-3 left-3 text-[#D4AF37]/40 text-xl font-mono select-none">﴿</div>

        {/* Board Header Title */}
        <div className="text-center pb-2 border-b border-[#D4AF37]/20">
          <h2 className="text-xl sm:text-2xl font-bold font-quran-amiri text-[#0F382C] dark:text-[#D4AF37]">
            لوح الأقسام الرئيسي
          </h2>
          <p className="text-xs text-slate-500 dark:text-emerald-200/70 font-sans mt-0.5">
            اختر التبويب للانتقال المباشر للقسم المطلوب
          </p>
        </div>

        {/* TITLE TABS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectOption(tab.id)}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-[#1A231E] border-2 border-slate-200 dark:border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#0F382C] hover:text-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-200 text-right flex items-center justify-between gap-3 cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Icon Emblem */}
                  <div className="w-11 h-11 rounded-xl bg-[#0F382C] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-xs transition-colors">
                    <IconComp size={22} />
                  </div>

                  {/* Title */}
                  <div className="min-w-0">
                    <h3 className="font-bold font-quran-amiri text-lg sm:text-xl text-[#0F382C] dark:text-[#FAF7F2] group-hover:text-[#D4AF37] transition-colors truncate">
                      {tab.title}
                    </h3>
                    <span className="text-[11px] font-sans text-slate-500 dark:text-emerald-200/70 group-hover:text-[#FAF7F2]/80 transition-colors block">
                      {tab.badge}
                    </span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="w-8 h-8 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-emerald-200 group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] flex items-center justify-center transition-colors shrink-0">
                  <ChevronLeft size={18} />
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* SALAWAT REMINDER INTERACTIVE ICON CARD TRIGGER */}
      <div className="pt-2">
        <button
          onClick={onOpenSalawatModal}
          className="w-full bg-gradient-to-r from-[#0D3126] via-[#14493A] to-[#0D3126] hover:from-[#14493A] hover:to-[#0D3126] text-[#FAF7F2] p-5 sm:p-6 rounded-3xl border-2 border-[#D4AF37] shadow-xl relative overflow-hidden flex items-center justify-between gap-4 cursor-pointer group transition-all duration-300"
        >
          {/* Background Islamic Accents */}
          <div className="absolute top-2 right-4 text-[#D4AF37]/20 text-2xl font-mono select-none">❊</div>
          <div className="absolute bottom-2 left-4 text-[#D4AF37]/20 text-2xl font-mono select-none">❊</div>

          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F382C] group-hover:scale-105 flex items-center justify-center font-bold shadow-lg shrink-0 transition-transform">
              <Bell size={24} className="animate-bounce-slow" />
            </div>
            <div className="min-w-0 text-right">
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-quran-amiri text-xl sm:text-2xl text-[#D4AF37] group-hover:text-amber-300 transition-colors">
                  تذكير الصلاة على النبي وآله
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                  salawatIntervalMinutes > 0 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' 
                    : 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40'
                }`}>
                  {salawatIntervalMinutes === 15 ? 'مُفَعَّل • كل ربع ساعة'
                    : salawatIntervalMinutes === 30 ? 'مُفَعَّل • كل نصف ساعة'
                    : salawatIntervalMinutes === 60 ? 'مُفَعَّل • كل ساعة'
                    : salawatIntervalMinutes === 120 ? 'مُفَعَّل • كل ساعتين'
                    : salawatIntervalMinutes === 300 ? 'مُفَعَّل • كل ٥ ساعات'
                    : salawatIntervalMinutes === 480 ? 'مُفَعَّل • كل ٨ ساعات'
                    : salawatIntervalMinutes === 720 ? 'مُفَعَّل • كل ١٢ ساعة'
                    : 'إعداد التذكير (صوت رجل)'}
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/90 font-sans mt-0.5 truncate">
                تنبيه تلقائي بصوت رجل: «اللهم صلِّ على محمد وآل محمد»
              </p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] flex items-center justify-center transition-all shrink-0">
            <ChevronLeft size={20} />
          </div>
        </button>
      </div>

      {/* ABOUT APP INTERACTIVE ICON CARD TRIGGER */}
      <div className="pt-1">
        <button
          onClick={() => setShowAboutModal(true)}
          className="w-full bg-gradient-to-r from-[#0F382C] via-[#154A3A] to-[#0D3126] hover:from-[#154A3A] hover:to-[#0F382C] text-[#FAF7F2] p-5 sm:p-6 rounded-3xl border-2 border-[#D4AF37]/70 shadow-xl relative overflow-hidden flex items-center justify-between gap-4 cursor-pointer group transition-all duration-300"
        >
          {/* Background Islamic Accents */}
          <div className="absolute top-2 right-4 text-[#D4AF37]/20 text-2xl font-mono select-none">❊</div>
          <div className="absolute bottom-2 left-4 text-[#D4AF37]/20 text-2xl font-mono select-none">❊</div>

          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F382C] group-hover:scale-105 flex items-center justify-center font-bold shadow-lg shrink-0 transition-transform">
              <Info size={24} />
            </div>
            <div className="min-w-0 text-right">
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-quran-amiri text-xl sm:text-2xl text-[#D4AF37] group-hover:text-amber-300 transition-colors">
                  قسم عن التطبيق
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold">
                  اضغط للتفاصيل
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/90 font-sans mt-0.5 truncate">
                تطوير الأستاذ فرقان غازي • البلد: اليمن السعيد 🇾🇪
              </p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] flex items-center justify-center transition-all shrink-0">
            <ChevronLeft size={20} />
          </div>
        </button>
      </div>

      {/* ABOUT APP MODAL POPUP DIALOG */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in" dir="rtl">
          <div className="bg-gradient-to-br from-[#0F382C] via-[#154A3A] to-[#0D3126] text-[#FAF7F2] p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl max-w-lg w-full relative overflow-hidden space-y-5 animate-scale-up">
            
            {/* Background Ornaments */}
            <div className="absolute top-2 right-4 text-[#D4AF37]/20 text-3xl font-mono select-none">❊</div>
            <div className="absolute bottom-2 left-4 text-[#D4AF37]/20 text-3xl font-mono select-none">❊</div>

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F382C] flex items-center justify-center font-bold shadow-lg shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="font-bold font-quran-amiri text-2xl sm:text-3xl text-[#D4AF37]">
                    قسم عن التطبيق
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/80 font-sans mt-0.5">
                    تفاصيل المصحف الإلكتروني والمبرمج
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer border border-[#D4AF37]/40 shrink-0"
                title="إغلاق النافذة"
              >
                <X size={20} />
              </button>
            </div>

            {/* Developer & Country Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* Developer Card */}
              <div className="p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/40 flex items-center gap-3.5 backdrop-blur-xs hover:border-[#D4AF37] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <Code size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-[#D4AF37] font-bold block">إعداد وتطوير:</span>
                  <p className="text-sm sm:text-base font-bold text-white font-sans mt-0.5 truncate">
                    تطوير الأستاذ فرقان غازي
                  </p>
                </div>
              </div>

              {/* Country Card */}
              <div className="p-4 rounded-2xl bg-white/10 border border-[#D4AF37]/40 flex items-center gap-3.5 backdrop-blur-xs hover:border-[#D4AF37] transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
                  <Globe size={20} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] text-[#D4AF37] font-bold block">البلد:</span>
                  <p className="text-sm sm:text-base font-bold text-white font-sans mt-0.5 flex items-center gap-1.5">
                    <span>اليمن السعيد</span>
                    <span className="text-lg">🇾🇪</span>
                  </p>
                </div>
              </div>

            </div>

            {/* Application Summary Description */}
            <div className="p-4 rounded-2xl bg-[#082019]/80 border border-[#D4AF37]/30 text-xs sm:text-sm text-[#D4AF37]/90 leading-relaxed font-sans space-y-2">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="font-bold text-white font-quran-amiri text-lg">تطبيق الفرقان المبارك</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold">الإصدار 1.0</span>
              </div>
              <p className="pt-1">
                تطبيق الفرقان هو مصحف إلكتروني كامل ومبارك صُمم وأُعد بخط عثمان طه الأصلي (طبعة مجمع الملك فهد 1405هـ بالمدينة المنورة). يشتمل على القراءة والتلاوة الصوتية العطرة للشيخ محمد صديق المنشاوي، التفسير الميسر، الفهرس المزدوج بالسور والأجزاء، آيات القنوت، أدعية الصحيفة السجادية، ودعاء ختم القرآن الكريم.
              </p>
            </div>

            {/* Modal Action Button */}
            <div className="text-center pt-1">
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-[#D4AF37] text-[#0F382C] hover:bg-amber-400 font-bold text-sm transition-all cursor-pointer shadow-lg border border-[#D4AF37]"
              >
                إغلاق النافذة
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

