import React, { useState } from 'react';
import { 
  Bell, 
  Volume2, 
  Clock, 
  Check, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Power,
  Play
} from 'lucide-react';
import { playSalawatAudio } from '../utils/salawatAudio';

interface SalawatReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIntervalMinutes: number; // 0 for off, or 15, 30, 60, 120, 300, 480, 720
  onSaveInterval: (minutes: number) => void;
  onToast: (msg: string) => void;
}

export const SALAWAT_INTERVAL_OPTIONS = [
  { minutes: 15, label: 'ربع ساعة', subtext: 'تذكير كل ١٥ دقيقة' },
  { minutes: 30, label: 'نصف ساعة', subtext: 'تذكير كل ٣٠ دقيقة' },
  { minutes: 60, label: 'ساعة', subtext: 'تذكير كل ساعة واحدة' },
  { minutes: 120, label: 'ساعتين', subtext: 'تذكير كل ساعتين (٢ ساعة)' },
  { minutes: 300, label: 'خمس ساعات', subtext: 'تذكير كل ٥ ساعات' },
  { minutes: 480, label: 'ثمان ساعات', subtext: 'تذكير كل ٨ ساعات' },
  { minutes: 720, label: 'إثني عشر ساعة', subtext: 'تذكير كل ١٢ ساعة' },
  { minutes: 0, label: 'إيقاف التذكير', subtext: 'تعطيل التذكير التلقائي' },
];

export default function SalawatReminderModal({
  isOpen,
  onClose,
  currentIntervalMinutes,
  onSaveInterval,
  onToast
}: SalawatReminderModalProps) {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(currentIntervalMinutes);
  const [isPlayingTest, setIsPlayingTest] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleTestAudio = () => {
    setIsPlayingTest(true);
    onToast("جاري تشغيل الصوت: اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّد");
    playSalawatAudio(
      () => setIsPlayingTest(true),
      () => setIsPlayingTest(false)
    );
  };

  const handleSave = () => {
    onSaveInterval(selectedMinutes);
    const selectedOption = SALAWAT_INTERVAL_OPTIONS.find(o => o.minutes === selectedMinutes);
    if (selectedMinutes > 0 && selectedOption) {
      onToast(`تم تفعيل تذكير الصلاة على النبي وآله: ${selectedOption.label}`);
    } else {
      onToast("تم إيقاف تذكير الصلاة على النبي وآله");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
      <div className="bg-[#FAF7F2] dark:bg-[#121814] rounded-3xl border-2 border-[#D4AF37] shadow-2xl max-w-lg w-full relative overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-4 px-6 text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#D4AF37] text-[#0F382C] flex items-center justify-center font-bold shadow-lg shrink-0">
              <Bell size={22} className="animate-bounce-slow" />
            </div>
            <div>
              <h3 className="font-bold font-quran-amiri text-xl sm:text-2xl text-[#D4AF37] flex items-center gap-2">
                <span>تذكير الصلاة على النبي وآله</span>
                <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-sans">
                  صوت رجل
                </span>
              </h3>
              <p className="text-[11px] text-[#FAF7F2]/80 font-sans">
                اختر الفترة الزمنية والتذكير يعمل تلقائياً
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer border border-[#D4AF37]/30 shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">

          {/* BANNER NOTICE */}
          <div className="p-3 rounded-2xl bg-[#0F382C]/10 dark:bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-xs text-[#0F382C] dark:text-[#D4AF37] leading-relaxed font-sans flex items-start gap-3">
            <Sparkles size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm mb-0.5">ﷺ اللهم صلِّ على محمد وآل محمد</span>
              <span>سيقوم التطبيق بتذكيرك تلقائياً بالنطق الصوتي بصوت رجل خاشع حسب الفترة التي تختارها.</span>
            </div>
          </div>

          {/* TEST AUDIO BUTTON */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-[#18201B] border border-slate-200 dark:border-[#D4AF37]/30 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                <Volume2 size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 dark:text-[#FAF7F2] block">تجربة الصوت الآن</span>
                <span className="text-[11px] text-slate-500 dark:text-emerald-200/70 font-sans">اسمع النطق الصوتي بصوت رجل</span>
              </div>
            </div>

            <button
              onClick={handleTestAudio}
              disabled={isPlayingTest}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                isPlayingTest 
                  ? 'bg-amber-500 text-white animate-pulse'
                  : 'bg-[#0F382C] text-[#D4AF37] hover:bg-[#154A3A] border border-[#D4AF37]/50'
              }`}
            >
              <Play size={14} className={isPlayingTest ? 'animate-spin' : ''} />
              <span>{isPlayingTest ? 'جاري التسميع...' : 'استماع'}</span>
            </button>
          </div>

          {/* OPTIONS GRID */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-emerald-200 block pr-1 flex items-center gap-1.5">
              <Clock size={15} className="text-[#D4AF37]" />
              <span>خيارات الفترة الزمنية للتذكير:</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SALAWAT_INTERVAL_OPTIONS.map((option) => {
                const isSelected = selectedMinutes === option.minutes;
                const isOffOption = option.minutes === 0;

                return (
                  <button
                    key={option.minutes}
                    onClick={() => setSelectedMinutes(option.minutes)}
                    className={`p-3.5 rounded-2xl text-right transition-all cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? isOffOption
                          ? 'bg-rose-900/20 text-rose-300 border-rose-500 ring-2 ring-rose-500/40'
                          : 'bg-[#0F382C] text-[#D4AF37] border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-md'
                        : 'bg-white dark:bg-[#18201B] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="min-w-0 pr-1">
                      <div className="flex items-center gap-2">
                        {isOffOption ? (
                          <Power size={16} className={isSelected ? 'text-rose-400' : 'text-slate-400'} />
                        ) : (
                          <Clock size={16} className={isSelected ? 'text-[#D4AF37]' : 'text-emerald-600'} />
                        )}
                        <span className="font-bold text-xs sm:text-sm font-sans">{option.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-emerald-200/60 block pr-6 mt-0.5">
                        {option.subtext}
                      </span>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? isOffOption
                          ? 'bg-rose-600 text-white border-rose-400'
                          : 'bg-[#D4AF37] text-[#0F382C] border-[#D4AF37]'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <Check size={14} className="stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SAVE & CANCEL BUTTONS */}
          <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-end gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-2xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
            >
              إلغاء
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0F382C] via-[#154A3A] to-[#0F382C] text-[#D4AF37] hover:from-[#154A3A] hover:to-[#0F382C] font-bold text-xs border border-[#D4AF37] shadow-md transition-all cursor-pointer"
            >
              <CheckCircle2 size={16} />
              <span>حفظ وتفعيل التذكير</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
