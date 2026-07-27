export type ThemeMode = 'emerald' | 'gazelle' | 'velvetNight' | 'andalusian' | 'dawn';
export type FontOption = 'uthman' | 'amiri' | 'scheherazade' | 'naskh' | 'kufi';

export interface Ayah {
  number: number; // Verse number in surah (e.g., 1, 2, 3)
  globalNumber?: number; // Overall ayah index in Quran (1-6236)
  text: string; // Uthmani arabic text
  translation?: string; // Translation
  tafsir?: string; // Tafsir Al-Muyassar
  page?: number; // Mushaf Page (1-604)
  juz?: number; // Juz (1-30)
  hizb?: number; // Hizb quarter
}

export interface Surah {
  id: number;
  name: string;
  englishName: string;
  type: 'مكية' | 'مدنية';
  totalAyahs: number;
  revelationOrder: number;
  description?: string;
  verses: Ayah[];
  audioUrl?: string; // Full surah audio
}

export interface CatalogSurah {
  id: number;
  name: string;
  englishName: string;
  type: 'مكية' | 'مدنية';
  totalAyahs: number;
  revelationOrder: number;
  juzStart?: number;
  pageStart?: number;
}

export type PlayMode = 'single_ayah' | 'surah' | 'continuous';
export type AppViewMode = 'home' | 'surahs' | 'search' | 'qunut' | 'bookmarks' | 'duaa_khatm' | 'sajjadiyya' | 'android_inspector';

export interface Reciter {
  id: string;
  name: string;
  subTitle: string;
  type: 'مجود' | 'مرتل';
  getAyahAudioUrl: (surahId: number, ayahNumber: number, globalAyahIndex?: number) => string;
  getSurahAudioUrl: (surahId: number) => string;
}

export interface AudioPlaybackState {
  isPlaying: boolean;
  currentSurahId: number;
  currentAyahNumber: number;
  reciterId: string;
  playMode: PlayMode;
  repeatCount: number; // 1, 3, 5, Infinity
  currentRepeatIndex: number;
  autoScroll: boolean;
  playbackRate: number; // 0.75, 1, 1.25, 1.5
}

export interface Bookmark {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
  page?: number;
}

export interface FavoriteAyah {
  id: string; // `${surahId}:${ayahNumber}`
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  tafsir?: string;
  addedAt: number;
}

export interface AyahOptionModalData {
  surahId: number;
  surahName: string;
  ayah: Ayah;
}
