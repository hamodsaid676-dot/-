import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Search, 
  Paintbrush, 
  Volume2, 
  Bookmark as BookmarkIcon, 
  Heart, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  PlayCircle, 
  Repeat, 
  Menu, 
  RotateCcw,
  Sliders,
  Check,
  Share2,
  ListFilter,
  Home,
  Scroll,
  ZoomIn,
  ZoomOut,
  Type,
  Bell,
  X
} from 'lucide-react';

import { 
  ThemeMode, 
  FontOption, 
  Ayah, 
  Surah, 
  PlayMode, 
  AudioPlaybackState, 
  Bookmark, 
  FavoriteAyah,
  AppViewMode
} from './types';

import { 
  quranCatalog, 
  recitersList, 
  fetchFullSurah, 
  pad3 
} from './quranData';

import Toast from './components/Toast';
import AyahActionModal from './components/AyahActionModal';
import FloatingAudioPlayer from './components/FloatingAudioPlayer';
import ThemeSettingsDrawer from './components/ThemeSettingsDrawer';
import QuranIndexDrawer from './components/QuranIndexDrawer';
import TafsirViewModal from './components/TafsirViewModal';
import DuaaKhatmModal from './components/DuaaKhatmModal';
import ShareCardModal from './components/ShareCardModal';
import SalawatReminderModal from './components/SalawatReminderModal';
import { playSalawatAudio } from './utils/salawatAudio';

import MainHomeMenu from './components/MainHomeMenu';
import SurahsIndexView from './components/SurahsIndexView';
import QunutVersesView from './components/QunutVersesView';
import SahifaSajjadiyyaView from './components/SahifaSajjadiyyaView';
import QuranSearchView from './components/QuranSearchView';
import BookmarksView from './components/BookmarksView';
import AndroidKotlinInspector from './components/AndroidKotlinInspector';

export default function App() {
  // Navigation State - Starts on Main Home Menu as requested by user
  const [currentView, setCurrentView] = useState<AppViewMode>('home');

  // Surah Navigation State
  const [surahSubView, setSurahSubView] = useState<'index' | 'reading'>('index');
  const [activeSurahId, setActiveSurahId] = useState<number>(1);
  const [surahData, setSurahData] = useState<Surah | null>(null);
  const [isLoadingSurah, setIsLoadingSurah] = useState<boolean>(true);
  const [surahViewLayout, setSurahViewLayout] = useState<'board' | 'segmented'>('board');
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  // Appearance & Typography Customization (Eye-soothing colors & rare fonts)
  const [theme, setTheme] = useState<ThemeMode>('emerald');
  const [font, setFont] = useState<FontOption>('uthman');
  const [fontSize, setFontSize] = useState<number>(26);
  const [lineHeight, setLineHeight] = useState<number>(2.4);
  const [showTafsirInline, setShowTafsirInline] = useState<boolean>(false);

  // Audio Playback State - Default Reciter: Mohamed Siddiq El-Minshawi (Mujawwad)
  const [playbackState, setPlaybackState] = useState<AudioPlaybackState>({
    isPlaying: false,
    currentSurahId: 1,
    currentAyahNumber: 1,
    reciterId: 'minshawi_mujawwad', // Mohamed Siddiq El-Minshawi Mujawwad
    playMode: 'single_ayah',
    repeatCount: 1,
    currentRepeatIndex: 0,
    autoScroll: true,
    playbackRate: 1
  });

  // Bookmarks & Favorites Persistence State
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [favorites, setFavorites] = useState<FavoriteAyah[]>([]);

  // Modals & Drawers Visibility State
  const [actionModalAyah, setActionModalAyah] = useState<Ayah | null>(null);
  const [tafsirModalAyah, setTafsirModalAyah] = useState<Ayah | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [shareModalAyah, setShareModalAyah] = useState<Ayah | null>(null);
  const [isSalawatModalOpen, setIsSalawatModalOpen] = useState<boolean>(false);
  const [salawatIntervalMinutes, setSalawatIntervalMinutes] = useState<number>(15);
  const [salawatBannerText, setSalawatBannerText] = useState<string | null>(null);
  const [isIndexDrawerOpen, setIsIndexDrawerOpen] = useState<boolean>(false);
  const [isThemeDrawerOpen, setIsThemeDrawerOpen] = useState<boolean>(false);
  const [isDuaaModalOpen, setIsDuaaModalOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // References for Auto-Scroll to Active Verse
  const ayahRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 1. Initial Load of Saved User Settings & Last Bookmark
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('al_furqan_theme') as ThemeMode;
      if (savedTheme) setTheme(savedTheme);

      const savedFont = localStorage.getItem('al_furqan_font') as FontOption;
      if (savedFont) setFont(savedFont);

      const savedFontSize = localStorage.getItem('al_furqan_font_size');
      if (savedFontSize) setFontSize(Number(savedFontSize));

      const savedBMs = localStorage.getItem('al_furqan_bookmarks');
      if (savedBMs) setBookmarks(JSON.parse(savedBMs));

      const savedFavs = localStorage.getItem('al_furqan_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedSalawat = localStorage.getItem('al_furqan_salawat_interval');
      if (savedSalawat !== null) setSalawatIntervalMinutes(Number(savedSalawat));
    } catch (e) {
      console.warn("Error loading settings from local storage:", e);
    }
  }, []);

  // Salawat Reminder Interval Timer Effect
  useEffect(() => {
    if (salawatIntervalMinutes <= 0) return;

    const intervalMs = salawatIntervalMinutes * 60 * 1000;
    const intervalId = setInterval(() => {
      setSalawatBannerText("ﷺ اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّد ﷺ");
      playSalawatAudio();

      setTimeout(() => {
        setSalawatBannerText(null);
      }, 12000);
    }, intervalMs);

    return () => clearInterval(intervalId);
  }, [salawatIntervalMinutes]);

  // 2. Fetch Full Surah Data when activeSurahId changes
  useEffect(() => {
    let isMounted = true;
    setIsLoadingSurah(true);

    const catInfo = quranCatalog.find(c => c.id === activeSurahId);
    if (catInfo) {
      setCurrentPageNum(catInfo.pageStart);
    }

    fetchFullSurah(activeSurahId).then((data) => {
      if (isMounted) {
        setSurahData(data);
        setIsLoadingSurah(false);
      }
    }).catch((err) => {
      console.error("Failed to load Surah:", err);
      if (isMounted) setIsLoadingSurah(false);
    });

    return () => { isMounted = false; };
  }, [activeSurahId]);

  // 3. Auto Scroll to Active Audio Verse if autoScroll is enabled
  useEffect(() => {
    if (playbackState.isPlaying && playbackState.autoScroll && playbackState.currentSurahId === activeSurahId && currentView === 'surahs') {
      const activeEl = ayahRefs.current[playbackState.currentAyahNumber];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [playbackState.currentAyahNumber, playbackState.isPlaying, activeSurahId, currentView]);

  // Handlers for Theme & Font updates
  const handleUpdateTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('al_furqan_theme', newTheme);
    setToastMsg("تم تغيير مظهر الخلفية والألوان بنجاح");
  };

  const handleUpdateFont = (newFont: FontOption) => {
    setFont(newFont);
    localStorage.setItem('al_furqan_font', newFont);
    setToastMsg("تم تغيير خط الرسم القرآني بنجاح");
  };

  const handleUpdateFontSize = (newSize: number) => {
    setFontSize(newSize);
    localStorage.setItem('al_furqan_font_size', String(newSize));
  };

  // Handlers for Audio Playback Trigger
  const handleStartPlay = (surahId: number, ayahNumber: number, mode: PlayMode) => {
    if (surahId !== activeSurahId) {
      setActiveSurahId(surahId);
    }

    setPlaybackState(prev => ({
      ...prev,
      currentSurahId: surahId,
      currentAyahNumber: ayahNumber,
      playMode: mode,
      isPlaying: true,
      currentRepeatIndex: 0
    }));

    const modeNames = {
      single_ayah: 'تلاوة الآية',
      surah: 'تلاوة السورة المباركة',
      continuous: 'التشغيل المستمر للقرآن الكريم'
    };

    setToastMsg(`بدء ${modeNames[mode]} بصوت المنشاوي مجود`);
  };

  // Handlers for Bookmarks & Favorites
  const handleSetBookmark = (surahId: number, surahName: string, ayahNumber: number, page?: number) => {
    const newBm: Bookmark = {
      surahId,
      surahName,
      ayahNumber,
      timestamp: Date.now(),
      page
    };

    const updated = [newBm, ...bookmarks.filter(b => !(b.surahId === surahId && b.ayahNumber === ayahNumber))];
    setBookmarks(updated);
    localStorage.setItem('al_furqan_bookmarks', JSON.stringify(updated));
    setToastMsg(`تم حفظ علامة قراءة في ${surahName} - آية ${ayahNumber}`);
  };

  const handleToggleFavorite = (surahId: number, surahName: string, ayah: Ayah) => {
    const favId = `${surahId}:${ayah.number}`;
    const exists = favorites.some(f => f.id === favId);

    let updated: FavoriteAyah[];
    if (exists) {
      updated = favorites.filter(f => f.id !== favId);
      setToastMsg("تم إزالة الآية من القائمة المفضلة");
    } else {
      const newFav: FavoriteAyah = {
        id: favId,
        surahId,
        surahName,
        ayahNumber: ayah.number,
        text: ayah.text,
        tafsir: ayah.tafsir,
        addedAt: Date.now()
      };
      updated = [newFav, ...favorites];
      setToastMsg("تمت إضافة الآية للآيات المفضلة");
    }

    setFavorites(updated);
    localStorage.setItem('al_furqan_favorites', JSON.stringify(updated));
  };

  const handleOpenShare = (ayahToShare?: Ayah | null) => {
    setShareModalAyah(ayahToShare || null);
    setIsShareModalOpen(true);
  };

  const handleCopyText = (text: string, surahName?: string, ayahNumber?: number) => {
    const cleanSurah = surahName ? surahName.replace(/^(سُورَةُ|سورة)\s*/, '') : '';
    const watermarkText = "— تطبيق الفرقان";
    const textToCopy = surahName && ayahNumber 
      ? `﴿ ${text} ﴾\n[سورة ${cleanSurah} - الآية ${ayahNumber}]\n\n${watermarkText}`
      : `${text}\n\n${watermarkText}`;
    navigator.clipboard.writeText(textToCopy);
    setToastMsg("تم نسخ النص الكريمة بنجاح");
  };

  // Helper for Theme CSS Palette Variables
  const getThemeStyles = () => {
    switch (theme) {
      case 'emerald':
        return {
          bg: 'bg-[#FAF7F2]',
          text: 'text-[#1C2B26]',
          cardBg: 'bg-[#F3EFE6]',
          border: 'border-[#D4AF37]/30',
          accent: '#0F382C',
          gold: '#D4AF37',
          activeAyahBg: 'bg-[#0F382C]/10 border-[#D4AF37]'
        };
      case 'gazelle':
        return {
          bg: 'bg-[#FAF5E8]',
          text: 'text-[#2D2016]',
          cardBg: 'bg-[#F4ECDA]',
          border: 'border-[#C08A3E]/30',
          accent: '#4A3525',
          gold: '#C08A3E',
          activeAyahBg: 'bg-[#4A3525]/10 border-[#C08A3E]'
        };
      case 'velvetNight':
        return {
          bg: 'bg-[#0C1014]',
          text: 'text-[#E2EBE5]',
          cardBg: 'bg-[#141C22]',
          border: 'border-[#E2B857]/30',
          accent: '#1D2A32',
          gold: '#E2B857',
          activeAyahBg: 'bg-[#E2B857]/15 border-[#E2B857]'
        };
      case 'andalusian':
        return {
          bg: 'bg-[#FAF6F3]',
          text: 'text-[#1C242E]',
          cardBg: 'bg-[#F2EAE5]',
          border: 'border-[#B8860B]/30',
          accent: '#1E2A38',
          gold: '#B8860B',
          activeAyahBg: 'bg-[#1E2A38]/10 border-[#B8860B]'
        };
      case 'dawn':
        return {
          bg: 'bg-[#F0F4F8]',
          text: 'text-[#0F2238]',
          cardBg: 'bg-[#E2E9F0]',
          border: 'border-[#D99B26]/30',
          accent: '#1C3A5E',
          gold: '#D99B26',
          activeAyahBg: 'bg-[#1C3A5E]/10 border-[#D99B26]'
        };
    }
  };

  const themeStyle = getThemeStyles();

  // Get active Font CSS Class
  const getFontClass = () => {
    switch(font) {
      case 'uthman': return 'font-quran-uthman';
      case 'amiri': return 'font-quran-amiri';
      case 'scheherazade': return 'font-quran-scheherazade';
      case 'naskh': return 'font-quran-naskh';
      case 'kufi': return 'font-quran-kufi';
      default: return 'font-quran-uthman';
    }
  };

  const fontClass = getFontClass();
  const currentCatalogInfo = quranCatalog.find(s => s.id === activeSurahId);
  const latestBookmark = bookmarks[0];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeStyle.bg} ${themeStyle.text} font-sans selection:bg-[#D4AF37]/30 pb-36`} dir="rtl">
      
      {/* Toast Notification popup */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}

      {/* TOP ISLAMIC GOLDEN HEADER ORNAMENT BAR */}
      <div className="h-2 bg-gradient-to-r from-[#0F382C] via-[#D4AF37] to-[#0F382C]" />

      {/* MAIN APP NAVBAR */}
      <header className="sticky top-0 z-30 bg-[#0F382C] text-[#FAF7F2] border-b border-[#D4AF37]/30 shadow-lg backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div 
            onClick={() => setCurrentView('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen size={24} className="animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg sm:text-xl text-[#FAF7F2] font-quran-amiri tracking-wide flex items-center gap-2">
                <span>تطبيق الفرقان</span>
                <span className="text-xs bg-[#D4AF37] text-[#0F382C] px-2 py-0.5 rounded-full font-bold font-sans">
                  القرآن الكريم
                </span>
                <span className="text-[10px] bg-[#0A261E] text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-bold font-sans hidden sm:inline-block">
                  مجاني بالكامل 100% • بدون نت
                </span>
              </h1>
              <p className="text-[11px] text-[#D4AF37]/90 hidden sm:block">
                خط عثمان طه • القارئ المنشاوي مجود • 114 سورة كاملة أوفلاين مجاناً
              </p>
            </div>
          </div>

          {/* Header Actions Toolbar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Home button if inside sub-view */}
            {currentView !== 'home' && (
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37] text-[#0F382C] hover:bg-[#e2bd46] font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                <Home size={16} />
                <span>الرئيسية</span>
              </button>
            )}

            {/* Open Index / Catalog View */}
            <button
              onClick={() => {
                setCurrentView('surahs');
                setSurahSubView('index');
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/30 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold transition-all cursor-pointer"
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">فهرس السور</span>
            </button>

            {/* Open Theme & Font Settings */}
            <button
              onClick={() => setIsThemeDrawerOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="تخصيص الخطوط والألوان"
            >
              <Paintbrush size={16} className="text-[#D4AF37]" />
              <span className="hidden md:inline">الألوان والخطوط</span>
            </button>

            {/* Open Duaa Khatm Modal */}
            <button
              onClick={() => setIsDuaaModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="دعاء ختم القرآن"
            >
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="hidden lg:inline">دعاء الختم</span>
            </button>

          </div>

        </div>
      </header>

      {/* MAIN CONTENT AREA BY VIEW */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6">
        
        {/* VIEW 1: HOME MAIN OPTIONS MENU */}
        {currentView === 'home' && (
          <MainHomeMenu
            onSelectOption={(view) => {
              if (view === 'duaa_khatm') {
                setIsDuaaModalOpen(true);
              } else {
                setCurrentView(view);
                if (view === 'surahs') {
                  setSurahSubView('index');
                }
              }
            }}
            latestBookmark={latestBookmark}
            totalBookmarksCount={bookmarks.length}
            totalFavoritesCount={favorites.length}
            salawatIntervalMinutes={salawatIntervalMinutes}
            onOpenSalawatModal={() => setIsSalawatModalOpen(true)}
          />
        )}

        {/* VIEW 2A: SURAH NAMES CATALOG (أسماء السور) */}
        {currentView === 'surahs' && surahSubView === 'index' && (
          <SurahsIndexView
            onSelectSurah={(surahId) => {
              setActiveSurahId(surahId);
              setSurahSubView('reading');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {/* VIEW 2B: SURAH READING INTERFACE (نصوص السورة) */}
        {currentView === 'surahs' && surahSubView === 'reading' && (
          <div className="space-y-6">
            
            {/* Header row with Home button, Go to Surah Names List button & Surah Jump Dropdown */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between">
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('home')}
                  className="px-3.5 py-2.5 rounded-2xl bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#164D3C] transition-all cursor-pointer shrink-0"
                >
                  <Home size={16} />
                  <span>الرئيسية</span>
                </button>

                <button
                  onClick={() => setSurahSubView('index')}
                  className="px-3.5 py-2.5 rounded-2xl bg-[#D4AF37] text-[#0F382C] hover:bg-[#e2bd46] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md"
                >
                  <BookOpen size={16} />
                  <span>أسماء السور (الفهرس)</span>
                </button>
              </div>

              {/* Quick Surah Jump Dropdown */}
              <div className="flex-1 flex items-center gap-2 bg-[#0F382C]/10 dark:bg-[#18201B] p-2.5 px-4 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
                <ListFilter size={18} className="text-[#0F382C] dark:text-[#D4AF37] shrink-0" />
                <span className="text-xs font-bold shrink-0">السورة الحالية:</span>
                <select
                  value={activeSurahId}
                  onChange={(e) => {
                    setActiveSurahId(Number(e.target.value));
                    setSurahSubView('reading');
                  }}
                  className="w-full bg-transparent font-quran-amiri font-bold text-base text-[#0F382C] dark:text-[#D4AF37] outline-none cursor-pointer"
                >
                  {quranCatalog.map((s) => (
                    <option key={s.id} value={s.id} className="text-slate-800 bg-white">
                      {s.id}. سورة {s.name} ({s.type} - {s.totalAyahs} آية)
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* MAIN SURAH DISPLAY CARD (لوحة المصحف الشريف العثماني كاملة) */}
            <main className={`rounded-3xl border-2 border-[#D4AF37]/60 ${themeStyle.cardBg} shadow-2xl overflow-hidden relative transition-all max-w-4xl mx-auto`}>
              
              {/* AUTHENTIC MUSHAF TOP HEADER BAR (ترويسة الصفحة العلوية للمصحف) */}
              <div className="bg-[#FAF8F5] dark:bg-[#101713] px-6 sm:px-10 py-3 border-b-2 border-[#D4AF37]/40 flex items-center justify-between font-quran-amiri text-base sm:text-lg font-bold text-[#0F382C] dark:text-[#D4AF37] select-none">
                {/* Left Header: Surah Name */}
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37] font-sans text-xs">سُورَةُ</span>
                  <span>{currentCatalogInfo?.name}</span>
                </div>

                {/* Center: Quick Toolbar Controls */}
                <div className="flex items-center gap-2 text-xs font-sans font-normal">
                  <div className="flex items-center gap-1 bg-white dark:bg-[#1A231E] px-2 py-1 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
                    <button
                      onClick={() => setFontSize(Math.max(18, fontSize - 2))}
                      className="w-6 h-6 rounded bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] flex items-center justify-center transition-colors cursor-pointer"
                      title="تصغير الخط"
                    >
                      <ZoomOut size={13} />
                    </button>
                    <span className="w-5 text-center font-mono font-bold text-xs text-[#0F382C] dark:text-[#D4AF37]">
                      {fontSize}
                    </span>
                    <button
                      onClick={() => setFontSize(Math.min(42, fontSize + 2))}
                      className="w-6 h-6 rounded bg-slate-100 dark:bg-white/10 hover:bg-[#D4AF37] hover:text-[#0F382C] flex items-center justify-center transition-colors cursor-pointer"
                      title="تكبير الخط"
                    >
                      <ZoomIn size={13} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 bg-white dark:bg-[#1A231E] p-1 rounded-xl border border-[#D4AF37]/30 shadow-2xs">
                    <button
                      onClick={() => setSurahViewLayout('board')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        surahViewLayout === 'board'
                          ? 'bg-[#0F382C] text-[#D4AF37]'
                          : 'text-slate-600 dark:text-emerald-200/70'
                      }`}
                    >
                      اللوح العثماني (1405هـ)
                    </button>
                    <button
                      onClick={() => setSurahViewLayout('segmented')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        surahViewLayout === 'segmented'
                          ? 'bg-[#0F382C] text-[#D4AF37]'
                          : 'text-slate-600 dark:text-emerald-200/70'
                      }`}
                    >
                      عرض مقسم
                    </button>
                  </div>

                  {/* Share Surah Card Button */}
                  <button
                    onClick={() => handleOpenShare(null)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0F382C] to-[#154A3A] text-[#D4AF37] hover:from-[#154A3A] hover:to-[#0F382C] font-bold text-xs border border-[#D4AF37]/50 shadow-xs transition-all cursor-pointer shrink-0"
                    title="مشاركة بطاقة السورة"
                  >
                    <Share2 size={15} className="text-[#D4AF37]" />
                    <span className="hidden sm:inline">مشاركة بطاقة السورة</span>
                    <span className="sm:hidden">مشاركة</span>
                  </button>
                </div>

                {/* Right Header: Juz Number in Eastern Arabic Numerals */}
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 dark:text-emerald-300/70 text-xs font-sans">الجزء</span>
                  <span className="text-lg font-bold">{['٠','١','٢','٣','٤','٥','٦','٧','٨','٩','١٠','١١','١٢','١٣','١٤','١٥','١٦','١٧','١٨','١十九','٢٠','٢١','٢٢','٢٣','٢٤','٢٥','٢٦','٢٧','٢٨','٢٩','٣٠'][currentCatalogInfo?.juzStart || 1]}</span>
                </div>
              </div>

              {/* LOADING SPINNER */}
              {isLoadingSurah ? (
                <div className="py-24 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-[#D4AF37]/30 border-t-[#0F382C] dark:border-t-[#D4AF37] rounded-full animate-spin mx-auto" />
                  <p className="font-bold text-sm text-[#0F382C] dark:text-[#D4AF37] animate-pulse">
                    جاري استحضار الآيات الكريمة للسورة...
                  </p>
                </div>
              ) : (
                
                /* AYAHS VERSE CONTAINER */
                <div className="p-3 sm:p-6 md:p-8 space-y-6">

                  {/* OPTION A: AUTHENTIC 1405 AH MADINAH MUSHAF BOARD (اللوح العثماني التفاعلي بمصحف المدينة 1405هـ) */}
                  {surahViewLayout === 'board' ? (
                    <div className="bg-[#FAF8F5] dark:bg-[#101713] p-6 sm:p-10 md:p-12 rounded-3xl border-4 border-[#0F382C] dark:border-[#D4AF37] ring-2 ring-[#D4AF37]/80 shadow-2xl relative transition-all space-y-6">
                      
                      {/* AUTHENTIC DUAL BORDER LINE INSIDE THE FRAME */}
                      <div className="absolute inset-2 sm:inset-3 border-2 border-[#D4AF37]/60 pointer-events-none rounded-2xl" />

                      {/* AUTHENTIC ORNATE CORNER ILLUMINATION PATTERNS */}
                      <div className="absolute top-4 right-4 text-[#0F382C] dark:text-[#D4AF37] text-2xl font-mono select-none">❊</div>
                      <div className="absolute top-4 left-4 text-[#0F382C] dark:text-[#D4AF37] text-2xl font-mono select-none">❊</div>
                      <div className="absolute bottom-4 right-4 text-[#0F382C] dark:text-[#D4AF37] text-2xl font-mono select-none">❊</div>
                      <div className="absolute bottom-4 left-4 text-[#0F382C] dark:text-[#D4AF37] text-2xl font-mono select-none">❊</div>

                      {/* AUTHENTIC SURAH TITLE FRAME (طرة اسم السورة العثمانية المزخرفة طبعة 1405هـ) */}
                      <div className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#1A5443] to-[#0F382C] border-2 border-[#D4AF37] text-center shadow-lg relative overflow-hidden my-2">
                        <div className="flex items-center justify-between max-w-xl mx-auto text-[#D4AF37]">
                          {/* Left Floral Accent */}
                          <div className="hidden sm:flex items-center gap-1 opacity-90">
                            <span className="text-xl">❦</span>
                            <span className="text-xs font-mono tracking-widest text-[#D4AF37]/70">═════</span>
                          </div>

                          {/* Surah Name Calligraphy */}
                          <div className="mx-auto text-center">
                            <h2 className="font-quran-amiri font-bold text-2xl sm:text-3xl md:text-4xl text-[#FAF7F2] tracking-wider">
                              سُورَةُ {(surahData?.name || currentCatalogInfo?.name || '').replace(/^(سُورَةُ|سورة)\s*/, '')}
                            </h2>
                            <p className="text-[11px] text-[#D4AF37]/90 font-sans mt-0.5">
                              {currentCatalogInfo?.type} • آياتها {currentCatalogInfo?.totalAyahs} • ترتيبها {currentCatalogInfo?.id}
                            </p>
                          </div>

                          {/* Right Floral Accent */}
                          <div className="hidden sm:flex items-center gap-1 opacity-90">
                            <span className="text-xs font-mono tracking-widest text-[#D4AF37]/70">═════</span>
                            <span className="text-xl">❦</span>
                          </div>
                        </div>
                      </div>

                      {/* BISMILLAH ARCH BANNER (Except Surah 1 Al-Fatihah where Ayah 1 is Bismillah, and Surah 9 At-Tawbah) */}
                      {activeSurahId !== 1 && activeSurahId !== 9 && (
                        <div className="text-center py-2 my-3">
                          <p className={`${fontClass} text-2xl sm:text-3xl md:text-4xl text-[#0F382C] dark:text-[#D4AF37] tracking-wider leading-relaxed`}>
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                          </p>
                        </div>
                      )}

                      {/* Unified Continuous Quranic Ayahs Board */}
                      <div className={`space-x-1 space-x-reverse ${fontClass} leading-[2.8] text-justify`} style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}>
                        {surahData?.verses.map((v, idx) => {
                          const isActiveAudioVerse = playbackState.isPlaying && 
                            playbackState.currentSurahId === activeSurahId && 
                            playbackState.currentAyahNumber === v.number;

                          const isFav = favorites.some(f => f.id === `${activeSurahId}:${v.number}`);
                          const isBm = bookmarks.some(b => b.surahId === activeSurahId && b.ayahNumber === v.number);

                          // Convert verse number to Eastern Arabic Numerals (١, ٢, ٣...)
                          const easternArabicVerseNum = String(v.number).replace(/\d/g, (d) => ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'][parseInt(d, 10)]);

                          const currentPage = v.page || currentCatalogInfo?.pageStart || 1;
                          const nextVerse = surahData.verses[idx + 1];
                          const isPageEnd = nextVerse && nextVerse.page && nextVerse.page !== currentPage;

                          return (
                            <React.Fragment key={v.number}>
                              <span
                                ref={(el) => { ayahRefs.current[v.number] = el; }}
                                onClick={() => setActionModalAyah(v)}
                                className={`inline hover:bg-[#D4AF37]/25 rounded-2xl px-1.5 py-0.5 transition-all cursor-pointer select-none group ${
                                  isActiveAudioVerse 
                                    ? 'bg-[#D4AF37]/35 text-[#0F382C] dark:text-[#D4AF37] font-bold border-b-2 border-[#D4AF37] shadow-md px-2.5 rounded-2xl active-verse-highlight' 
                                    : ''
                                }`}
                                title={`آية ${v.number} - اضغط للخيارات والاستماع والتفسير`}
                              >
                                <span className={fontClass}>
                                  {v.text}
                                </span>

                                {/* Traditional Quranic Verse End Symbol Marker Badge */}
                                <span 
                                  className={`inline-flex items-center justify-center mx-1.5 w-8 h-8 rounded-full font-mono font-bold text-xs border-2 transition-all shadow-xs ${
                                    isActiveAudioVerse
                                      ? 'bg-[#D4AF37] text-[#0F382C] border-[#0F382C]'
                                      : 'bg-[#0F382C] text-[#D4AF37] border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C]'
                                  }`}
                                >
                                  {isFav ? '❤️' : isBm ? '🔖' : easternArabicVerseNum}
                                </span>
                              </span>

                              {/* PAGE DIVIDER BREAK LINE (فاصل نهاية الصفحة مع ترويسة رقم الصفحة) */}
                              {isPageEnd && (
                                <div className="w-full my-8 block font-sans select-none">
                                  <div className="flex items-center justify-center gap-3 text-[#0F382C] dark:text-[#D4AF37]">
                                    <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />
                                    
                                    <div className="px-5 py-1.5 rounded-full bg-[#0F382C] text-[#D4AF37] border-2 border-[#D4AF37] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shrink-0">
                                      <span className="text-[#D4AF37]/80">﴿</span>
                                      <span>الصفحة {String(currentPage).replace(/\d/g, (d) => ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'][parseInt(d, 10)])}</span>
                                      <span className="text-[#D4AF37]/80">﴾</span>
                                    </div>

                                    <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37]/80 to-[#D4AF37]" />
                                  </div>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* MUSHAF BOTTOM FOOTER BAR (تذييل المصحف الشريف السفلي) */}
                      <div className="pt-6 border-t-2 border-[#D4AF37]/40 flex items-center justify-between text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] font-sans">
                        {/* Page Number in Eastern Arabic Numerals */}
                        <div className="font-mono text-base font-bold tracking-wide text-[#0F382C] dark:text-[#D4AF37]">
                          {String(currentCatalogInfo?.pageStart || 1).replace(/\d/g, (d) => ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'][parseInt(d, 10)])}
                        </div>

                        {/* Center Page Emblem */}
                        <div className="text-center text-[11px] text-slate-500 dark:text-emerald-300/70 font-sans">
                          الحزب {((currentCatalogInfo?.juzStart || 1) - 1) * 2 + 1} • صفحة {currentCatalogInfo?.pageStart}
                        </div>
                      </div>

                    </div>
                  ) : (

                    /* OPTION B: SEGMENTED VERSES LOOP */
                    <div className="space-y-6">
                      {surahData?.verses.map((v) => {
                        const isActiveAudioVerse = playbackState.isPlaying && 
                          playbackState.currentSurahId === activeSurahId && 
                          playbackState.currentAyahNumber === v.number;

                        const isFav = favorites.some(f => f.id === `${activeSurahId}:${v.number}`);
                        const isBm = bookmarks.some(b => b.surahId === activeSurahId && b.ayahNumber === v.number);

                        return (
                          <div
                            key={v.number}
                            ref={(el) => { ayahRefs.current[v.number] = el; }}
                            onClick={() => setActionModalAyah(v)}
                            className={`p-5 sm:p-7 rounded-2xl transition-all cursor-pointer border group relative ${
                              isActiveAudioVerse 
                                ? `${themeStyle.activeAyahBg} active-verse-highlight shadow-lg` 
                                : 'bg-white/80 dark:bg-[#18201B]/80 hover:bg-white dark:hover:bg-[#18201B] border-transparent hover:border-[#D4AF37]/40 shadow-xs'
                            }`}
                          >
                            
                            {/* Verse Header Row */}
                            <div className="flex items-center justify-between mb-3 text-xs text-slate-400 dark:text-emerald-300/60">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                                  isActiveAudioVerse 
                                    ? 'bg-[#D4AF37] text-[#0F382C]' 
                                    : 'bg-[#0F382C]/10 dark:bg-[#D4AF37]/20 text-[#0F382C] dark:text-[#D4AF37] group-hover:bg-[#0F382C] group-hover:text-[#D4AF37]'
                                }`}>
                                  {v.number}
                                </div>
                                <span className="text-[11px] font-bold">آية {v.number}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                {isFav && <Heart size={14} fill="currentColor" className="text-rose-500" />}
                                {isBm && <BookmarkIcon size={14} fill="currentColor" className="text-[#D4AF37]" />}
                                {v.page && <span className="text-[10px] bg-slate-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full font-mono">ص {v.page}</span>}
                              </div>
                            </div>

                            {/* Uthmani Ayah Verse Text */}
                            <p 
                              className={`${fontClass} text-justify leading-loose transition-all select-none`}
                              style={{ 
                                fontSize: `${fontSize}px`, 
                                lineHeight: lineHeight 
                              }}
                            >
                              {v.text}
                              <span className="inline-block mx-2 text-[#D4AF37] font-quran-amiri font-bold text-xl">
                                ﴿{v.number}﴾
                              </span>
                            </p>

                            {/* Inline Tafsir Display if toggled on */}
                            {(showTafsirInline || v.tafsir) && showTafsirInline && (
                              <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 text-xs sm:text-sm text-slate-600 dark:text-emerald-200/80 leading-relaxed font-sans bg-[#0F382C]/5 dark:bg-[#D4AF37]/5 p-3 rounded-xl">
                                <span className="font-bold text-[#0F382C] dark:text-[#D4AF37] block mb-1">التفسير الميسر:</span>
                                {v.tafsir}
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

              {/* SURAH FOOTER NAVIGATION */}
              <div className="p-6 bg-[#0F382C]/5 dark:bg-[#18201B] border-t border-[#D4AF37]/30 flex justify-between items-center text-xs font-bold">
                
                <button
                  onClick={() => {
                    if (activeSurahId > 1) setActiveSurahId(activeSurahId - 1);
                  }}
                  disabled={activeSurahId <= 1}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F382C] border border-slate-200 dark:border-emerald-800/40 text-slate-800 dark:text-emerald-100 disabled:opacity-30 hover:border-[#D4AF37] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronRight size={16} />
                  <span>السورة السابقة</span>
                </button>

                <span className="font-quran-amiri text-base text-[#0F382C] dark:text-[#D4AF37]">
                  سورة {currentCatalogInfo?.name}
                </span>

                <button
                  onClick={() => {
                    if (activeSurahId < 114) setActiveSurahId(activeSurahId + 1);
                  }}
                  disabled={activeSurahId >= 114}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#0F382C] border border-slate-200 dark:border-emerald-800/40 text-slate-800 dark:text-emerald-100 disabled:opacity-30 hover:border-[#D4AF37] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>السورة التالية</span>
                  <ChevronLeft size={16} />
                </button>

              </div>

            </main>

          </div>
        )}

        {/* VIEW 3: QUNUT VERSES IN PRAYER */}
        {currentView === 'qunut' && (
          <QunutVersesView
            onBackToHome={() => setCurrentView('home')}
            onPlayAyah={(sId, aNum) => handleStartPlay(sId, aNum, 'single_ayah')}
            onCopyText={(txt) => handleCopyText(txt)}
          />
        )}

        {/* VIEW 4: SAHIFA SAJJADIYYA SUPPLICATIONS */}
        {currentView === 'sajjadiyya' && (
          <SahifaSajjadiyyaView
            onBackToHome={() => setCurrentView('home')}
            onCopyText={(txt) => handleCopyText(txt)}
          />
        )}

        {/* VIEW 5: SEARCH IN QURAN */}
        {currentView === 'search' && (
          <QuranSearchView
            onBackToHome={() => setCurrentView('home')}
            onSelectSurah={(sId, aNum) => {
              setActiveSurahId(sId);
              setCurrentView('surahs');
              setSurahSubView('reading');
              if (aNum) {
                setTimeout(() => {
                  const el = ayahRefs.current[aNum];
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 400);
              }
            }}
            onPlayAyah={(sId, aNum) => handleStartPlay(sId, aNum, 'single_ayah')}
            onCopyText={(txt) => handleCopyText(txt)}
          />
        )}

        {/* VIEW 6: BOOKMARKS & FAVORITES */}
        {currentView === 'bookmarks' && (
          <BookmarksView
            bookmarks={bookmarks}
            favorites={favorites}
            onBackToHome={() => setCurrentView('home')}
            onSelectBookmark={(bm) => {
              setActiveSurahId(bm.surahId);
              setCurrentView('surahs');
              setSurahSubView('reading');
              setTimeout(() => {
                const el = ayahRefs.current[bm.ayahNumber];
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }, 400);
            }}
            onSelectFavorite={(fav) => {
              setActiveSurahId(fav.surahId);
              setCurrentView('surahs');
              setSurahSubView('reading');
            }}
            onDeleteBookmark={(bm) => {
              const updated = bookmarks.filter(b => !(b.surahId === bm.surahId && b.ayahNumber === bm.ayahNumber));
              setBookmarks(updated);
              localStorage.setItem('al_furqan_bookmarks', JSON.stringify(updated));
              setToastMsg("تم حذف العلامة المرجعية");
            }}
            onDeleteFavorite={(favId) => {
              const updated = favorites.filter(f => f.id !== favId);
              setFavorites(updated);
              localStorage.setItem('al_furqan_favorites', JSON.stringify(updated));
              setToastMsg("تم حذف الآية من القائمة المفضلة");
            }}
          />
        )}

        {/* VIEW 7: ANDROID KOTLIN APPLICATION INSPECTOR & SIMULATOR */}
        {currentView === 'android_inspector' && (
          <AndroidKotlinInspector />
        )}

      </div>

      {/* FLOATING AUDIO PLAYER BAR - ONLY APPEARS IF USER INITIATED PLAYBACK */}
      <FloatingAudioPlayer
        playbackState={playbackState}
        reciters={recitersList}
        surahName={surahData?.name || `سورة ${currentCatalogInfo?.name}`}
        totalAyahsInSurah={surahData?.totalAyahs || currentCatalogInfo?.totalAyahs || 1}
        onUpdateState={(updates) => setPlaybackState(prev => ({ ...prev, ...updates }))}
        onNextAyah={() => {
          setPlaybackState(prev => ({
            ...prev,
            currentAyahNumber: prev.currentAyahNumber + 1,
            isPlaying: true
          }));
        }}
        onPrevAyah={() => {
          setPlaybackState(prev => ({
            ...prev,
            currentAyahNumber: Math.max(1, prev.currentAyahNumber - 1),
            isPlaying: true
          }));
        }}
        onClosePlayer={() => setPlaybackState(prev => ({ ...prev, isPlaying: false }))}
      />

      {/* MODAL 1: INTERACTIVE AYAH OPTIONS POPUP */}
      {actionModalAyah && (
        <AyahActionModal
          isOpen={!!actionModalAyah}
          onClose={() => setActionModalAyah(null)}
          surahId={activeSurahId}
          surahName={surahData?.name || `سورة ${currentCatalogInfo?.name}`}
          ayah={actionModalAyah}
          reciterName="الشيخ محمد صديق المنشاوي (مجود)"
          isFavorite={favorites.some(f => f.id === `${activeSurahId}:${actionModalAyah.number}`)}
          isBookmark={bookmarks.some(b => b.surahId === activeSurahId && b.ayahNumber === actionModalAyah.number)}
          onPlayAyah={(sId, aNum, mode) => handleStartPlay(sId, aNum, mode)}
          onShowTafsir={(a) => setTafsirModalAyah(a)}
          onToggleFavorite={(sId, sName, a) => handleToggleFavorite(sId, sName, a)}
          onSetBookmark={(sId, sName, aNum, p) => handleSetBookmark(sId, sName, aNum, p)}
          onCopyAyah={(txt, sName, aNum) => handleCopyText(txt, sName, aNum)}
          onOpenShareModal={(a) => handleOpenShare(a)}
        />
      )}

      {/* MODAL 2: TAFSIR VIEW MODAL */}
      {tafsirModalAyah && (
        <TafsirViewModal
          isOpen={!!tafsirModalAyah}
          onClose={() => setTafsirModalAyah(null)}
          surahName={surahData?.name || `سورة ${currentCatalogInfo?.name}`}
          ayah={tafsirModalAyah}
          onPlayAyah={(aNum) => handleStartPlay(activeSurahId, aNum, 'single_ayah')}
          onCopyAyah={(txt, sName, aNum) => handleCopyText(txt, sName, aNum)}
        />
      )}

      {/* MODAL 3: SHARE CARD ELEGANT MODAL */}
      {isShareModalOpen && (
        <ShareCardModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          surahId={activeSurahId}
          surahName={surahData?.name || currentCatalogInfo?.name || `السورة ${activeSurahId}`}
          totalAyahs={currentCatalogInfo?.totalAyahs || surahData?.verses.length || 0}
          ayah={shareModalAyah}
          onToast={(msg) => setToastMsg(msg)}
        />
      )}

      {/* MODAL 3: DUAA KHATM AL-QURAN MODAL */}
      <DuaaKhatmModal
        isOpen={isDuaaModalOpen}
        onClose={() => setIsDuaaModalOpen(false)}
        onCopyDuaa={(txt) => {
          navigator.clipboard.writeText(txt);
          setToastMsg("تم نسخ دعاء ختم القرآن الكريم بالحافظة");
        }}
      />

      {/* DRAWER 1: QURAN SURAH INDEX & SEARCH DRAWER */}
      <QuranIndexDrawer
        isOpen={isIndexDrawerOpen}
        onClose={() => setIsIndexDrawerOpen(false)}
        activeSurahId={activeSurahId}
        bookmarks={bookmarks}
        favorites={favorites}
        onSelectSurah={(id) => {
          setActiveSurahId(id);
          setCurrentView('surahs');
          setSurahSubView('reading');
        }}
        onSelectBookmark={(bm) => {
          setActiveSurahId(bm.surahId);
          setCurrentView('surahs');
          setSurahSubView('reading');
          setTimeout(() => {
            const el = ayahRefs.current[bm.ayahNumber];
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 400);
        }}
      />

      {/* SALAWAT REMINDER MODAL */}
      {isSalawatModalOpen && (
        <SalawatReminderModal
          isOpen={isSalawatModalOpen}
          onClose={() => setIsSalawatModalOpen(false)}
          currentIntervalMinutes={salawatIntervalMinutes}
          onSaveInterval={(minutes) => {
            setSalawatIntervalMinutes(minutes);
            localStorage.setItem('al_furqan_salawat_interval', String(minutes));
          }}
          onToast={(msg) => setToastMsg(msg)}
        />
      )}

      {/* FLOATING SALAWAT ALERT BANNER NOTIFICATION */}
      {salawatBannerText && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-slow max-w-lg w-[92%] px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#1A5443] to-[#0F382C] text-[#D4AF37] border-2 border-[#D4AF37] shadow-2xl flex items-center justify-between gap-3 text-center" dir="rtl">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#0F382C] flex items-center justify-center font-bold shrink-0 shadow-md">
              <Bell size={20} className="animate-spin" />
            </div>
            <div className="text-right min-w-0">
              <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-sans font-bold block w-max mb-0.5">
                تذكير الصلاة على النبي وآله (صوت رجل)
              </span>
              <h4 className="font-quran-amiri font-bold text-lg sm:text-xl text-[#FAF7F2] truncate">
                {salawatBannerText}
              </h4>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => playSalawatAudio()}
              className="px-2.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#0F382C] font-bold text-xs hover:bg-amber-300 transition-colors shadow-xs cursor-pointer"
              title="إعادة التسميع"
            >
              إعادة
            </button>
            <button
              onClick={() => setSalawatBannerText(null)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] flex items-center justify-center transition-colors border border-[#D4AF37]/30 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* DRAWER 2: EYE-SOOTHING THEMES & FONTS CUSTOMIZER */}
      <ThemeSettingsDrawer
        isOpen={isThemeDrawerOpen}
        onClose={() => setIsThemeDrawerOpen(false)}
        theme={theme}
        font={font}
        fontSize={fontSize}
        lineHeight={lineHeight}
        showTafsirInline={showTafsirInline}
        onUpdateTheme={handleUpdateTheme}
        onUpdateFont={handleUpdateFont}
        onUpdateFontSize={handleUpdateFontSize}
        onUpdateLineHeight={(h) => setLineHeight(h)}
        onToggleTafsirInline={(s) => setShowTafsirInline(s)}
      />

    </div>
  );
}
