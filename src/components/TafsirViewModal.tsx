import React from 'react';
import { X, BookOpen, Copy, Volume2, Share2, Check } from 'lucide-react';
import { Ayah } from '../types';

interface TafsirViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahName: string;
  ayah: Ayah | null;
  onPlayAyah?: (ayahNumber: number) => void;
  onCopyAyah?: (text: string, surahName: string, ayahNumber: number) => void;
}

export default function TafsirViewModal({
  isOpen,
  onClose,
  surahName,
  ayah,
  onPlayAyah,
  onCopyAyah
}: TafsirViewModalProps) {
  if (!isOpen || !ayah) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in-up" dir="rtl">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#FAF7F2] dark:bg-[#121814] rounded-3xl border border-[#D4AF37]/40 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-4 px-6 text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <BookOpen size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#FAF7F2]">
                التفسير الميسر للقرآن الكريم
              </h3>
              <p className="text-xs text-[#D4AF37]">
                {surahName} • الآية رقم {ayah.number}
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          
          {/* Ayah Verse Text Box */}
          <div className="p-5 bg-[#F3EFE6] dark:bg-[#18201B] rounded-2xl border-r-4 border-[#D4AF37] shadow-xs space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
              نص الآية الكريمة:
            </span>
            <p className="font-quran-amiri text-xl sm:text-2xl leading-loose text-slate-900 dark:text-emerald-100 text-center">
              « {ayah.text} »
            </p>
          </div>

          {/* Tafsir Content */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} />
              <span>البيان والتفسير الميسر:</span>
            </h4>

            <div className="bg-white dark:bg-[#18201B] p-5 rounded-2xl border border-slate-200 dark:border-emerald-800/40 leading-loose text-slate-800 dark:text-emerald-100/90 text-justify text-sm sm:text-base">
              {ayah.tafsir ? (
                <p className="font-sans">{ayah.tafsir}</p>
              ) : (
                <p className="text-slate-400 dark:text-emerald-300/50 text-center py-4">
                  جاري تحميل التفسير لهذه الآية أو يمكنك التوصيل بالشبكة لجلب التفسير كاملاً...
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F3EFE6] dark:bg-[#18201B] border-t border-[#D4AF37]/20 flex justify-between items-center shrink-0">
          <span className="text-[11px] text-slate-400 dark:text-emerald-300/60 font-mono">
            تطبيق الفرقان (القرآن الكريم)
          </span>

          <div className="flex gap-2">
            {onPlayAyah && (
              <button
                onClick={() => {
                  onPlayAyah(ayah.number);
                  onClose();
                }}
                className="px-4 py-2 bg-[#0F382C] hover:bg-[#174D3D] text-[#D4AF37] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Volume2 size={14} />
                <span>استماع للآية</span>
              </button>
            )}

            {onCopyAyah && (
              <button
                onClick={() => {
                  onCopyAyah(`${ayah.text}\n\nالتفسير الميسر: ${ayah.tafsir || ''}`, surahName, ayah.number);
                  onClose();
                }}
                className="px-4 py-2 bg-white dark:bg-[#202B24] hover:bg-slate-100 text-slate-700 dark:text-emerald-100 border border-slate-200 dark:border-emerald-800/40 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <Copy size={14} />
                <span>نسخ التفسير</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
