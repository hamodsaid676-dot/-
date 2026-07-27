import React from 'react';
import { 
  Play, 
  PlayCircle, 
  Repeat, 
  BookOpen, 
  Bookmark, 
  Heart, 
  Copy, 
  Share2, 
  X,
  Volume2,
  Check
} from 'lucide-react';
import { Ayah, PlayMode } from '../types';

interface AyahActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahId: number;
  surahName: string;
  ayah: Ayah;
  reciterName: string;
  isFavorite: boolean;
  isBookmark: boolean;
  onPlayAyah: (surahId: number, ayahNumber: number, mode: PlayMode) => void;
  onShowTafsir: (ayah: Ayah) => void;
  onToggleFavorite: (surahId: number, surahName: string, ayah: Ayah) => void;
  onSetBookmark: (surahId: number, surahName: string, ayahNumber: number, page?: number) => void;
  onCopyAyah: (text: string, surahName: string, ayahNumber: number) => void;
  onOpenShareModal?: (ayah: Ayah) => void;
}

export default function AyahActionModal({
  isOpen,
  onClose,
  surahId,
  surahName,
  ayah,
  reciterName,
  isFavorite,
  isBookmark,
  onPlayAyah,
  onShowTafsir,
  onToggleFavorite,
  onSetBookmark,
  onCopyAyah,
  onOpenShareModal
}: AyahActionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in-up" dir="rtl">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Sheet Container */}
      <div className="relative w-full max-w-lg bg-[#FAF7F2] dark:bg-[#121814] rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/30 shadow-2xl overflow-hidden z-10 my-0">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-4 px-6 text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold text-sm">
              {ayah.number}
            </div>
            <div>
              <h3 className="font-bold text-base text-[#FAF7F2] flex items-center gap-2">
                <span>{surahName}</span>
                <span className="text-xs text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                  الآية {ayah.number}
                </span>
              </h3>
              <p className="text-[11px] text-[#D4AF37]/90 mt-0.5">
                القارئ المحدد: {reciterName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#D4AF37] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Selected Ayah Preview Box */}
        <div className="p-5 bg-[#F3EFE6] dark:bg-[#18201B] border-b border-[#D4AF37]/20 max-h-36 overflow-y-auto">
          <p className="font-quran-amiri text-lg sm:text-xl text-center leading-loose text-slate-900 dark:text-[#E2EBE5]">
            « {ayah.text} »
          </p>
        </div>

        {/* Action Menu Options */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* AUDIO PLAYBACK SECTION (3 Core Prompt Requirements) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block pr-1">
              خيارات التلاوة الصوتية
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              {/* Option 1: Play Single Ayah */}
              <button
                onClick={() => {
                  onPlayAyah(surahId, ayah.number, 'single_ayah');
                  onClose();
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 bg-white dark:bg-[#1C2520] hover:bg-[#0F382C] hover:text-[#D4AF37] dark:hover:bg-[#0F382C] text-[#0F382C] dark:text-[#FAF7F2] rounded-2xl border border-[#D4AF37]/30 transition-all shadow-xs group"
              >
                <div className="p-2 rounded-full bg-[#0F382C]/10 dark:bg-[#D4AF37]/20 text-[#0F382C] dark:text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] transition-colors">
                  <Play size={18} fill="currentColor" />
                </div>
                <span className="text-xs font-bold">تشغيل الآية</span>
                <span className="text-[10px] opacity-75">الآية {ayah.number} فقط</span>
              </button>

              {/* Option 2: Play Surah */}
              <button
                onClick={() => {
                  onPlayAyah(surahId, ayah.number, 'surah');
                  onClose();
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 bg-white dark:bg-[#1C2520] hover:bg-[#0F382C] hover:text-[#D4AF37] dark:hover:bg-[#0F382C] text-[#0F382C] dark:text-[#FAF7F2] rounded-2xl border border-[#D4AF37]/30 transition-all shadow-xs group"
              >
                <div className="p-2 rounded-full bg-[#0F382C]/10 dark:bg-[#D4AF37]/20 text-[#0F382C] dark:text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] transition-colors">
                  <PlayCircle size={18} />
                </div>
                <span className="text-xs font-bold">تشغيل السورة</span>
                <span className="text-[10px] opacity-75">من هذه الآية للختام</span>
              </button>

              {/* Option 3: Continuous Playback */}
              <button
                onClick={() => {
                  onPlayAyah(surahId, ayah.number, 'continuous');
                  onClose();
                }}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 bg-gradient-to-br from-[#0F382C] to-[#174D3D] text-[#D4AF37] hover:scale-[1.02] rounded-2xl border border-[#D4AF37]/50 transition-all shadow-md group"
              >
                <div className="p-2 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0F382C] transition-colors">
                  <Repeat size={18} />
                </div>
                <span className="text-xs font-bold">تشغيل مستمر</span>
                <span className="text-[10px] text-[#FAF7F2]/80">تتابع آلي ومستمر</span>
              </button>

            </div>
          </div>

          {/* SECONDARY UTILITY ACTIONS */}
          <div className="pt-2 border-t border-[#D4AF37]/20 space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-emerald-300/60 uppercase tracking-wider block pr-1">
              التفسير والحفظ
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* Tafsir button */}
              <button
                onClick={() => {
                  onShowTafsir(ayah);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-[#1C2520] hover:bg-[#F3EFE6] dark:hover:bg-[#242F29] text-slate-800 dark:text-emerald-100 rounded-xl border border-slate-200 dark:border-emerald-800/40 text-xs font-semibold transition-colors"
              >
                <BookOpen size={16} className="text-[#0F382C] dark:text-[#D4AF37]" />
                <span>التفسير</span>
              </button>

              {/* Favorite Toggle */}
              <button
                onClick={() => {
                  onToggleFavorite(surahId, surahName, ayah);
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-colors ${
                  isFavorite 
                    ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50' 
                    : 'bg-white dark:bg-[#1C2520] hover:bg-[#F3EFE6] dark:hover:bg-[#242F29] text-slate-800 dark:text-emerald-100 border-slate-200 dark:border-emerald-800/40'
                }`}
              >
                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-rose-600" : "text-slate-400"} />
                <span>{isFavorite ? 'في المفضلة' : 'المفضلة'}</span>
              </button>

              {/* Set Bookmark */}
              <button
                onClick={() => {
                  onSetBookmark(surahId, surahName, ayah.number, ayah.page);
                  onClose();
                }}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-colors ${
                  isBookmark 
                    ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50' 
                    : 'bg-white dark:bg-[#1C2520] hover:bg-[#F3EFE6] dark:hover:bg-[#242F29] text-slate-800 dark:text-emerald-100 border-slate-200 dark:border-emerald-800/40'
                }`}
              >
                <Bookmark size={16} fill={isBookmark ? "currentColor" : "none"} className={isBookmark ? "text-amber-600" : "text-[#D4AF37]"} />
                <span>{isBookmark ? 'علامتي المرجعية' : 'علامة قراءة'}</span>
              </button>

              {/* Copy Ayah */}
              <button
                onClick={() => {
                  onCopyAyah(ayah.text, surahName, ayah.number);
                  onClose();
                }}
                className="flex items-center justify-center gap-2 p-3 bg-white dark:bg-[#1C2520] hover:bg-[#F3EFE6] dark:hover:bg-[#242F29] text-slate-800 dark:text-emerald-100 rounded-xl border border-slate-200 dark:border-emerald-800/40 text-xs font-semibold transition-colors"
              >
                <Copy size={16} className="text-slate-500 dark:text-emerald-300" />
                <span>نسخ النص</span>
              </button>

              {/* Share Ayah Card */}
              {onOpenShareModal && (
                <button
                  onClick={() => {
                    onOpenShareModal(ayah);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-[#0F382C] text-[#D4AF37] hover:bg-[#154A3A] rounded-xl border border-[#D4AF37]/50 text-xs font-bold transition-all shadow-xs cursor-pointer col-span-2 sm:col-span-4"
                >
                  <Share2 size={16} className="text-[#D4AF37]" />
                  <span>مشاركة بطاقة الآية الكريمة</span>
                </button>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
