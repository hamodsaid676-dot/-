import React from 'react';
import { 
  X, 
  Paintbrush, 
  Type, 
  Maximize2, 
  Sliders, 
  Check, 
  Eye, 
  Sparkles,
  LayoutGrid,
  BookOpen
} from 'lucide-react';
import { ThemeMode, FontOption } from '../types';

interface ThemeSettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  font: FontOption;
  fontSize: number;
  lineHeight: number;
  showTafsirInline: boolean;
  onUpdateTheme: (theme: ThemeMode) => void;
  onUpdateFont: (font: FontOption) => void;
  onUpdateFontSize: (size: number) => void;
  onUpdateLineHeight: (height: number) => void;
  onToggleTafsirInline: (show: boolean) => void;
}

export default function ThemeSettingsDrawer({
  isOpen,
  onClose,
  theme,
  font,
  fontSize,
  lineHeight,
  showTafsirInline,
  onUpdateTheme,
  onUpdateFont,
  onUpdateFontSize,
  onUpdateLineHeight,
  onToggleTafsirInline
}: ThemeSettingsDrawerProps) {
  if (!isOpen) return null;

  const themesList: { id: ThemeMode; name: string; desc: string; bg: string; accent: string; text: string }[] = [
    {
      id: 'emerald',
      name: 'المصحف الملكي الزمردي',
      desc: 'لون زمردي مهيب مع لمسات ذهبية وورق زاهي مريح',
      bg: '#FAF7F2',
      accent: '#0F382C',
      text: '#1C2B26'
    },
    {
      id: 'gazelle',
      name: 'ورق الغزال الكلاسيكي',
      desc: 'درجات الرقاق والخشب القديم الهادئ للعين',
      bg: '#FAF5E8',
      accent: '#4A3525',
      text: '#2D2016'
    },
    {
      id: 'velvetNight',
      name: 'الليل المخملي الهادئ',
      desc: 'خلفية داكنة مخملية مخصصة للقراءة الليلية دون إجهاد',
      bg: '#0C1014',
      accent: '#E2B857',
      text: '#E2EBE5'
    },
    {
      id: 'andalusian',
      name: 'مخطوطة أندلسية',
      desc: 'كحلي ناعم وورق وردي مائل للرماد الأندلسي',
      bg: '#FAF6F3',
      accent: '#1E2A38',
      text: '#1C242E'
    },
    {
      id: 'dawn',
      name: 'السماء الفجرية',
      desc: 'زرقة هادئة كفجر الصباح المشرق بالسكينة',
      bg: '#F0F4F8',
      accent: '#1C3A5E',
      text: '#0F2238'
    }
  ];

  const fontsList: { id: FontOption; name: string; sample: string; cssClass: string }[] = [
    {
      id: 'uthman',
      name: 'خط عثمان طه الأصلي (مجمع الملك فهد - طبعة المدينة)',
      sample: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      cssClass: 'font-quran-uthman'
    },
    {
      id: 'amiri',
      name: 'الخط الأميري القرآني الأصيل',
      sample: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
      cssClass: 'font-quran-amiri'
    },
    {
      id: 'scheherazade',
      name: 'خط شهرزاد النبيل',
      sample: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      cssClass: 'font-quran-scheherazade'
    },
    {
      id: 'naskh',
      name: 'خط النسخ الحديث المصفى',
      sample: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      cssClass: 'font-quran-naskh'
    },
    {
      id: 'kufi',
      name: 'الخط الكوفي العريق',
      sample: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      cssClass: 'font-quran-kufi'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in-up" dir="rtl">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] dark:bg-[#121814] h-full shadow-2xl overflow-y-auto z-10 flex flex-col border-l border-[#D4AF37]/30">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-5 text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Paintbrush size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#FAF7F2]">
                إعدادات الخطوط والألوان المريحة
              </h3>
              <p className="text-xs text-[#D4AF37]">
                تخصيص كامل لتجربة قراءة القرآن الكريم
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

        {/* Settings Body */}
        <div className="p-6 space-y-8 flex-grow">
          
          {/* SECTION 1: EYE-SOOTHING COLOR PALETTES */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} />
              <span>ألوان الخلفية والمظهر المريح للعين</span>
            </label>

            <div className="space-y-2.5">
              {themesList.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onUpdateTheme(t.id)}
                    className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-md scale-[1.01]'
                        : 'border-slate-200 dark:border-emerald-800/40 hover:border-[#D4AF37]/50'
                    }`}
                    style={{ backgroundColor: t.bg, color: t.text }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: t.accent }}
                      >
                        {isSelected && <Check size={16} className="text-[#D4AF37]" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm truncate">{t.name}</h4>
                        <p className="text-[11px] opacity-80 truncate mt-0.5">{t.desc}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <div className="w-3 h-6 rounded-xs" style={{ backgroundColor: t.bg }} />
                      <div className="w-3 h-6 rounded-xs" style={{ backgroundColor: t.accent }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: ARABIC CALLIGRAPHY FONTS */}
          <div className="space-y-3 pt-4 border-t border-[#D4AF37]/20">
            <label className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <Type size={16} />
              <span>نوع خط الرسم القرآني (5 خطوط عربية)</span>
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {fontsList.map((f) => {
                const isSelected = font === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => onUpdateFont(f.id)}
                    className={`p-4 rounded-2xl border text-right transition-all ${
                      isSelected
                        ? 'bg-[#0F382C] text-[#FAF7F2] border-[#D4AF37] shadow-md'
                        : 'bg-white dark:bg-[#18201B] text-slate-800 dark:text-emerald-100 border-slate-200 dark:border-emerald-800/40 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold">{f.name}</span>
                      {isSelected && <span className="text-[10px] bg-[#D4AF37] text-[#0F382C] font-bold px-2 py-0.5 rounded-full">مُفعل</span>}
                    </div>
                    <p className={`text-lg sm:text-xl py-1 text-center ${f.cssClass} ${isSelected ? 'text-[#D4AF37]' : ''}`}>
                      {f.sample}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: FONT SIZE AND LINE HEIGHT SLIDERS */}
          <div className="space-y-5 pt-4 border-t border-[#D4AF37]/20">
            <label className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
              <Sliders size={16} />
              <span>حجم الخط والتباعد بين الآيات</span>
            </label>

            {/* Size Slider */}
            <div className="bg-white dark:bg-[#18201B] p-4 rounded-2xl border border-slate-200 dark:border-emerald-800/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-emerald-200">حجم خط الآية:</span>
                <span className="font-mono font-bold text-[#0F382C] dark:text-[#D4AF37]">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">أ</span>
                <input
                  type="range"
                  min="20"
                  max="48"
                  value={fontSize}
                  onChange={(e) => onUpdateFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#0F382C] dark:accent-[#D4AF37]"
                />
                <span className="text-xl font-bold text-slate-700 dark:text-emerald-100">أ</span>
              </div>
            </div>

            {/* Line Height Slider */}
            <div className="bg-white dark:bg-[#18201B] p-4 rounded-2xl border border-slate-200 dark:border-emerald-800/40 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 dark:text-emerald-200">ارتفاع السطر والتباعد:</span>
                <span className="font-mono font-bold text-[#0F382C] dark:text-[#D4AF37]">{lineHeight}</span>
              </div>
              <input
                type="range"
                min="1.8"
                max="3.2"
                step="0.1"
                value={lineHeight}
                onChange={(e) => onUpdateLineHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#0F382C] dark:accent-[#D4AF37]"
              />
            </div>

            {/* Toggle Inline Tafsir */}
            <div className="bg-white dark:bg-[#18201B] p-4 rounded-2xl border border-slate-200 dark:border-emerald-800/40 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-emerald-100">عرض التفسير الميسر أسفل كل آية</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">يُظهر نص التفسير الميسر تلقائياً أثناء التصفح</p>
              </div>

              <button
                onClick={() => onToggleTafsirInline(!showTafsirInline)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  showTafsirInline ? 'bg-[#0F382C] dark:bg-[#D4AF37]' : 'bg-slate-300 dark:bg-emerald-950'
                }`}
              >
                <div 
                  className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                    showTafsirInline ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
