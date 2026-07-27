import React, { useState, useRef } from 'react';
import { 
  Share2, 
  Copy, 
  X, 
  Sparkles, 
  Send, 
  Twitter, 
  MessageSquare,
  Image as ImageIcon,
  CheckCircle2,
  BookOpen,
  Mountain,
  Sun,
  Moon,
  Trees,
  Compass
} from 'lucide-react';
import { Ayah } from '../types';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahId: number;
  surahName: string;
  totalAyahs: number;
  ayah?: Ayah | null; // If null, sharing Surah card
  onToast: (msg: string) => void;
}

export default function ShareCardModal({
  isOpen,
  onClose,
  surahId,
  surahName,
  totalAyahs,
  ayah,
  onToast
}: ShareCardModalProps) {
  const [copied, setCopied] = useState(false);
  const [cardTheme, setCardTheme] = useState<'emerald_nature' | 'sunset_mountains' | 'cosmic_night' | 'golden_dawn' | 'classic_gold'>('emerald_nature');
  const [includeTafsir, setIncludeTafsir] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const cleanSurahName = surahName.replace(/^(سُورَةُ|سورة)\s*/, '');
  const watermarkText = "— تطبيق الفرقان";

  // Format text content for copy/text share
  const getShareableText = () => {
    if (ayah) {
      let text = `﴿ ${ayah.text} ﴾\n[سورة ${cleanSurahName} - الآية ${ayah.number}]`;
      if (includeTafsir && ayah.tafsir) {
        text += `\n\nالتفسير الميسر:\n${ayah.tafsir}`;
      }
      text += `\n\n${watermarkText}`;
      return text;
    } else {
      return `﴿ سورة ${cleanSurahName} ﴾\nعدد آياتها: ${totalAyahs} آية مباركة\n\n${watermarkText}`;
    }
  };

  // Copy text to clipboard
  const handleCopy = () => {
    const text = getShareableText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    onToast("تم نسخ النص الكريمة بنجاح إلى الحافظة");
    setTimeout(() => setCopied(false), 2500);
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    const text = getShareableText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `بطاقة قرأنية - سورة ${cleanSurahName}`,
          text: text
        });
        onToast("تمت المشاركة بنجاح");
      } catch (e) {
        // User cancelled or share failed
      }
    } else {
      handleCopy();
    }
  };

  // Social Share URLs
  const shareText = encodeURIComponent(getShareableText());
  const whatsappUrl = `https://wa.me/?text=${shareText}`;
  const telegramUrl = `https://t.me/share/url?url=&text=${shareText}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;

  // Generate PNG image card using Canvas with Fantasy Nature Backgrounds
  const handleDownloadImage = () => {
    setIsGeneratingImage(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 850;
      const padding = 55;
      canvas.width = width;

      // Measure text height dynamically to calculate canvas size
      ctx.font = '30px "Amiri", "Cairo", serif';
      const ayahContent = ayah ? ayah.text : `سورة ${cleanSurahName} (عدد آياتها ${totalAyahs} آية)`;
      
      // Word wrapping for canvas
      const words = ayahContent.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      const maxWidth = width - (padding * 2) - 40;

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      // Height calculation
      let tafsirLines: string[] = [];
      if (ayah && includeTafsir && ayah.tafsir) {
        ctx.font = '19px "Cairo", sans-serif';
        const tWords = ayah.tafsir.split(' ');
        let tLine = '';
        for (let i = 0; i < tWords.length; i++) {
          const testLine = tLine ? `${tLine} ${tWords[i]}` : tWords[i];
          if (ctx.measureText(testLine).width > maxWidth && i > 0) {
            tafsirLines.push(tLine);
            tLine = tWords[i];
          } else {
            tLine = testLine;
          }
        }
        if (tLine) tafsirLines.push(tLine);
      }

      const lineHeight = 52;
      const tafsirLineHeight = 34;
      const estimatedHeight = 350 + (lines.length * lineHeight) + (tafsirLines.length * tafsirLineHeight) + (includeTafsir ? 60 : 0);
      canvas.height = estimatedHeight;

      // DRAW FANTASY NATURE BACKGROUND BASED ON SELECTED THEME
      if (cardTheme === 'emerald_nature') {
        // Lush Emerald Paradise Nature
        const bgGrad = ctx.createLinearGradient(0, 0, width, estimatedHeight);
        bgGrad.addColorStop(0, '#062419');
        bgGrad.addColorStop(0.5, '#0E3B2E');
        bgGrad.addColorStop(1, '#051A12');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Sunbeam Radial Glow
        const sunGlow = ctx.createRadialGradient(width / 2, 80, 10, width / 2, 80, 400);
        sunGlow.addColorStop(0, 'rgba(212, 175, 55, 0.35)');
        sunGlow.addColorStop(0.5, 'rgba(20, 90, 68, 0.2)');
        sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sunGlow;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Mountain Silhouettes at bottom
        ctx.fillStyle = 'rgba(3, 20, 14, 0.75)';
        ctx.beginPath();
        ctx.moveTo(0, estimatedHeight - 120);
        ctx.quadraticCurveTo(width * 0.25, estimatedHeight - 180, width * 0.5, estimatedHeight - 130);
        ctx.quadraticCurveTo(width * 0.75, estimatedHeight - 80, width, estimatedHeight - 140);
        ctx.lineTo(width, estimatedHeight);
        ctx.lineTo(0, estimatedHeight);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(2, 14, 10, 0.9)';
        ctx.beginPath();
        ctx.moveTo(0, estimatedHeight - 80);
        ctx.quadraticCurveTo(width * 0.35, estimatedHeight - 120, width * 0.7, estimatedHeight - 60);
        ctx.quadraticCurveTo(width * 0.85, estimatedHeight - 40, width, estimatedHeight - 90);
        ctx.lineTo(width, estimatedHeight);
        ctx.lineTo(0, estimatedHeight);
        ctx.closePath();
        ctx.fill();

        // Shimmering Golden Floating Particles
        ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
        for (let p = 0; p < 45; p++) {
          const px = (p * 83) % width;
          const py = (p * 59) % estimatedHeight;
          const pr = (p % 3) + 1;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (cardTheme === 'sunset_mountains') {
        // Fantasy Sunset Mountain Heights
        const bgGrad = ctx.createLinearGradient(0, 0, width, estimatedHeight);
        bgGrad.addColorStop(0, '#2C122D');
        bgGrad.addColorStop(0.4, '#5C1D38');
        bgGrad.addColorStop(0.75, '#B84A39');
        bgGrad.addColorStop(1, '#1A0B1B');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Golden Sunset Glow
        const sunsetGlow = ctx.createRadialGradient(width / 2, estimatedHeight - 120, 20, width / 2, estimatedHeight - 120, 380);
        sunsetGlow.addColorStop(0, 'rgba(255, 200, 80, 0.45)');
        sunsetGlow.addColorStop(0.6, 'rgba(184, 74, 57, 0.2)');
        sunsetGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = sunsetGlow;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Mountain Silhouettes
        ctx.fillStyle = 'rgba(30, 10, 25, 0.8)';
        ctx.beginPath();
        ctx.moveTo(0, estimatedHeight - 140);
        ctx.lineTo(width * 0.2, estimatedHeight - 220);
        ctx.lineTo(width * 0.45, estimatedHeight - 150);
        ctx.lineTo(width * 0.7, estimatedHeight - 240);
        ctx.lineTo(width, estimatedHeight - 130);
        ctx.lineTo(width, estimatedHeight);
        ctx.lineTo(0, estimatedHeight);
        ctx.closePath();
        ctx.fill();

        // Foreground Mountain Peak
        ctx.fillStyle = 'rgba(15, 5, 12, 0.95)';
        ctx.beginPath();
        ctx.moveTo(0, estimatedHeight - 80);
        ctx.lineTo(width * 0.35, estimatedHeight - 140);
        ctx.lineTo(width * 0.6, estimatedHeight - 90);
        ctx.lineTo(width * 0.85, estimatedHeight - 150);
        ctx.lineTo(width, estimatedHeight - 70);
        ctx.lineTo(width, estimatedHeight);
        ctx.lineTo(0, estimatedHeight);
        ctx.closePath();
        ctx.fill();

      } else if (cardTheme === 'cosmic_night') {
        // Cosmic Midnight Starry Sky & Horizon
        const bgGrad = ctx.createLinearGradient(0, 0, width, estimatedHeight);
        bgGrad.addColorStop(0, '#090A1A');
        bgGrad.addColorStop(0.5, '#0E132D');
        bgGrad.addColorStop(1, '#05060D');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Galaxy Nebula Cloud
        const nebula = ctx.createRadialGradient(width * 0.7, 120, 10, width * 0.7, 120, 320);
        nebula.addColorStop(0, 'rgba(120, 80, 220, 0.3)');
        nebula.addColorStop(0.6, 'rgba(40, 90, 180, 0.15)');
        nebula.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = nebula;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Shimmering Stars
        for (let s = 0; s < 70; s++) {
          const sx = (s * 97) % width;
          const sy = (s * 61) % (estimatedHeight - 80);
          const sr = (s % 4 === 0) ? 2.5 : (s % 2 === 0 ? 1.5 : 1);
          ctx.fillStyle = (s % 5 === 0) ? '#D4AF37' : '#FFFFFF';
          ctx.globalAlpha = 0.5 + ((s % 5) * 0.1);
          ctx.beginPath();
          ctx.arc(sx, sy, sr, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Night Hills Contour
        ctx.fillStyle = 'rgba(5, 7, 18, 0.95)';
        ctx.beginPath();
        ctx.moveTo(0, estimatedHeight - 100);
        ctx.quadraticCurveTo(width * 0.3, estimatedHeight - 150, width * 0.6, estimatedHeight - 90);
        ctx.quadraticCurveTo(width * 0.85, estimatedHeight - 130, width, estimatedHeight - 80);
        ctx.lineTo(width, estimatedHeight);
        ctx.lineTo(0, estimatedHeight);
        ctx.closePath();
        ctx.fill();

      } else if (cardTheme === 'golden_dawn') {
        // Golden Dawn Oasis
        const bgGrad = ctx.createLinearGradient(0, 0, width, estimatedHeight);
        bgGrad.addColorStop(0, '#2A1B08');
        bgGrad.addColorStop(0.45, '#5E3E12');
        bgGrad.addColorStop(0.8, '#A36B1C');
        bgGrad.addColorStop(1, '#1C1205');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Golden Sunrise Radial
        const dawnGlow = ctx.createRadialGradient(width / 2, 100, 10, width / 2, 100, 350);
        dawnGlow.addColorStop(0, 'rgba(255, 220, 130, 0.45)');
        dawnGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.2)');
        dawnGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = dawnGlow;
        ctx.fillRect(0, 0, width, estimatedHeight);

        // Dune & Landscape Contours
        ctx.fillStyle = 'rgba(25, 16, 6, 0.9)';
        ctx.beginPath();
        ctx.moveTo(0, estimatedHeight - 90);
        ctx.quadraticCurveTo(width * 0.4, estimatedHeight - 140, width * 0.8, estimatedHeight - 70);
        ctx.quadraticCurveTo(width * 0.9, estimatedHeight - 50, width, estimatedHeight - 85);
        ctx.lineTo(width, estimatedHeight);
        ctx.lineTo(0, estimatedHeight);
        ctx.closePath();
        ctx.fill();

      } else {
        // Classic Royal Emerald Gold
        const bgGrad = ctx.createLinearGradient(0, 0, width, estimatedHeight);
        bgGrad.addColorStop(0, '#0F382C');
        bgGrad.addColorStop(1, '#0A261E');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, estimatedHeight);
      }

      // Draw Gold Frame Borders over the Nature Canvas
      const goldColor = '#D4AF37';
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 4;
      ctx.strokeRect(22, 22, width - 44, estimatedHeight - 44);

      ctx.lineWidth = 1.5;
      ctx.strokeRect(28, 28, width - 56, estimatedHeight - 56);

      // Header Bismillah or Surah Title
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = goldColor;
      ctx.font = 'bold 34px "Amiri Quran", "Amiri", serif';
      ctx.textAlign = 'center';
      ctx.fillText(`سُورَةُ ${cleanSurahName}`, width / 2, 85);

      ctx.font = '22px "Amiri Quran", "Amiri", serif';
      ctx.fillText('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', width / 2, 125);

      // Divider Line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padding + 90, 145);
      ctx.lineTo(width - padding - 90, 145);
      ctx.stroke();

      // Draw Main Ayah Text
      ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#FAF7F2';
      ctx.font = '32px "Amiri Quran", "Amiri", serif';
      let startY = 205;
      lines.forEach((line) => {
        ctx.fillText(line, width / 2, startY);
        startY += lineHeight;
      });

      // Ayah Number Badge
      if (ayah) {
        ctx.fillStyle = goldColor;
        ctx.font = 'bold 22px "Cairo", sans-serif';
        ctx.fillText(`﴿ الآية ${ayah.number} ﴾`, width / 2, startY + 10);
        startY += 40;
      }

      // Draw Tafsir if enabled
      if (ayah && includeTafsir && tafsirLines.length > 0) {
        startY += 15;
        ctx.fillStyle = goldColor;
        ctx.font = 'bold 19px "Cairo", sans-serif';
        ctx.fillText('التفسير الميسر:', width / 2, startY);
        startY += 32;

        ctx.fillStyle = '#E8E2D5';
        ctx.font = '18px "Cairo", sans-serif';
        tafsirLines.forEach((tLine) => {
          ctx.fillText(tLine, width / 2, startY);
          startY += tafsirLineHeight;
        });
      }

      // Footer Watermark Signature - Strictly "تطبيق الفرقان"
      const watermarkY = estimatedHeight - 42;
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
      ctx.fillRect(30, estimatedHeight - 70, width - 60, 40);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.strokeRect(30, estimatedHeight - 70, width - 60, 40);

      ctx.fillStyle = goldColor;
      ctx.font = 'bold 16px "Cairo", sans-serif';
      ctx.fillText(watermarkText, width / 2, watermarkY);

      // Export canvas to PNG download
      const imageUri = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `Ayah_${cleanSurahName}_${ayah ? ayah.number : 'surah'}.png`;
      downloadLink.href = imageUri;
      downloadLink.click();

      onToast("تم تحميل بطاقة الصورة الخيالية بنجاح");
    } catch (err) {
      console.error(err);
      onToast("تعذر إنشاء بطاقة الصورة، يمكنك نسخ النص");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in" dir="rtl">
      <div className="bg-[#FAF7F2] dark:bg-[#121814] rounded-3xl border-2 border-[#D4AF37] shadow-2xl max-w-xl w-full relative overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-4 px-6 text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#0F382C] flex items-center justify-center font-bold shadow-md">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg font-quran-amiri text-[#D4AF37] flex items-center gap-2">
                <span>مشاركة بطاقة قرأنية</span>
                <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full font-sans">
                  مناظر طبيعية خيالية
                </span>
              </h3>
              <p className="text-[11px] text-[#FAF7F2]/80 font-sans">
                {ayah ? `سورة ${cleanSurahName} - الآية ${ayah.number}` : `سورة ${cleanSurahName}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#D4AF37] flex items-center justify-center transition-colors cursor-pointer border border-[#D4AF37]/30"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">

          {/* FREE & OFFLINE BADGE NOTICE */}
          <div className="p-2.5 px-4 rounded-xl bg-[#0F382C]/10 dark:bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#0F382C] dark:text-[#D4AF37] font-bold font-sans flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#D4AF37] shrink-0" />
              <span>تطبيق الفرقان مجاني بالكامل 100% ويعمل بدون إنترنت (أوفلاين)</span>
            </div>
            <span className="text-[10px] bg-[#D4AF37] text-[#0F382C] px-2 py-0.5 rounded-full shrink-0">
              مجاني
            </span>
          </div>

          {/* FANTASY NATURE THEME SELECTOR */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-emerald-200 block pr-1 flex items-center gap-1.5">
              <Trees size={15} className="text-[#D4AF37]" />
              <span>اختر خلفية المنظر الطبيعي الخيالي:</span>
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {/* Theme 1: Emerald Nature */}
              <button
                onClick={() => setCardTheme('emerald_nature')}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  cardTheme === 'emerald_nature'
                    ? 'bg-[#0F382C] text-[#D4AF37] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'bg-white/60 dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                }`}
              >
                <Trees size={16} className={cardTheme === 'emerald_nature' ? 'text-[#D4AF37]' : 'text-emerald-600'} />
                <span className="text-[11px]">فردوس زمردي</span>
              </button>

              {/* Theme 2: Sunset Mountains */}
              <button
                onClick={() => setCardTheme('sunset_mountains')}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  cardTheme === 'sunset_mountains'
                    ? 'bg-[#5C1D38] text-[#D4AF37] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'bg-white/60 dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                }`}
              >
                <Mountain size={16} className={cardTheme === 'sunset_mountains' ? 'text-[#D4AF37]' : 'text-rose-500'} />
                <span className="text-[11px]">شفق الجبال</span>
              </button>

              {/* Theme 3: Cosmic Night */}
              <button
                onClick={() => setCardTheme('cosmic_night')}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  cardTheme === 'cosmic_night'
                    ? 'bg-[#0E132D] text-[#D4AF37] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'bg-white/60 dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                }`}
              >
                <Moon size={16} className={cardTheme === 'cosmic_night' ? 'text-[#D4AF37]' : 'text-indigo-400'} />
                <span className="text-[11px]">سماء النجوم</span>
              </button>

              {/* Theme 4: Golden Dawn */}
              <button
                onClick={() => setCardTheme('golden_dawn')}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border ${
                  cardTheme === 'golden_dawn'
                    ? 'bg-[#5E3E12] text-[#D4AF37] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'bg-white/60 dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                }`}
              >
                <Sun size={16} className={cardTheme === 'golden_dawn' ? 'text-[#D4AF37]' : 'text-amber-500'} />
                <span className="text-[11px]">شروق الواحة</span>
              </button>

              {/* Theme 5: Classic Gold */}
              <button
                onClick={() => setCardTheme('classic_gold')}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 border col-span-2 sm:col-span-1 ${
                  cardTheme === 'classic_gold'
                    ? 'bg-[#0A261E] text-[#D4AF37] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'bg-white/60 dark:bg-black/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
                }`}
              >
                <Compass size={16} className={cardTheme === 'classic_gold' ? 'text-[#D4AF37]' : 'text-amber-600'} />
                <span className="text-[11px]">زمرد فاخر</span>
              </button>
            </div>
          </div>

          {/* INCLUDE TAFSIR TOGGLE */}
          {ayah && ayah.tafsir && (
            <label className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#18201B] border border-slate-200 dark:border-[#D4AF37]/20 cursor-pointer hover:border-[#D4AF37] transition-colors">
              <input 
                type="checkbox" 
                checked={includeTafsir} 
                onChange={(e) => setIncludeTafsir(e.target.checked)}
                className="w-4 h-4 accent-[#0F382C] dark:accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-[#FAF7F2]">
                <BookOpen size={16} className="text-[#D4AF37]" />
                <span>تضمين التفسير الميسر داخل البطاقة والنص المنسوخ</span>
              </div>
            </label>
          )}

          {/* ELEGANT CARD PREVIEW WITH BEAUTIFUL FANTASY NATURE BACKGROUND */}
          <div 
            ref={cardRef}
            className={`p-6 sm:p-8 rounded-3xl border-4 border-[#D4AF37] shadow-2xl relative overflow-hidden space-y-4 text-center transition-all ${
              cardTheme === 'emerald_nature'
                ? 'bg-gradient-to-br from-[#062419] via-[#0E3B2E] to-[#051A12] text-[#FAF7F2]'
                : cardTheme === 'sunset_mountains'
                ? 'bg-gradient-to-br from-[#2C122D] via-[#5C1D38] to-[#1A0B1B] text-[#FAF7F2]'
                : cardTheme === 'cosmic_night'
                ? 'bg-gradient-to-br from-[#090A1A] via-[#0E132D] to-[#05060D] text-[#FAF7F2]'
                : cardTheme === 'golden_dawn'
                ? 'bg-gradient-to-br from-[#2A1B08] via-[#5E3E12] to-[#1C1205] text-[#FAF7F2]'
                : 'bg-gradient-to-br from-[#0F382C] via-[#14493A] to-[#0A261E] text-[#FAF7F2]'
            }`}
          >
            {/* FANTASY NATURE ARTISTIC SVG OVERLAY */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 select-none">
              {cardTheme === 'emerald_nature' && (
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 500">
                  <circle cx="250" cy="50" r="180" fill="url(#sunGlowEmerald)" />
                  <path d="M0,400 Q120,320 250,380 T500,350 L500,500 L0,500 Z" fill="#03140E" />
                  <path d="M0,430 Q180,360 350,420 T500,380 L500,500 L0,500 Z" fill="#010A07" />
                  <defs>
                    <radialGradient id="sunGlowEmerald" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#0E3B2E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              )}

              {cardTheme === 'sunset_mountains' && (
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 500">
                  <circle cx="250" cy="400" r="220" fill="url(#sunGlowSunset)" />
                  <polygon points="0,420 120,320 250,400 380,300 500,420 500,500 0,500" fill="#1E0A19" />
                  <polygon points="0,450 180,380 320,440 450,360 500,450 500,500 0,500" fill="#0F050C" />
                  <defs>
                    <radialGradient id="sunGlowSunset" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFC850" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#B84A39" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              )}

              {cardTheme === 'cosmic_night' && (
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 500">
                  <circle cx="380" cy="100" r="160" fill="url(#nebulaGlow)" />
                  <circle cx="100" cy="80" r="2" fill="#FFF" />
                  <circle cx="200" cy="140" r="1.5" fill="#D4AF37" />
                  <circle cx="320" cy="60" r="2" fill="#FFF" />
                  <circle cx="440" cy="120" r="2" fill="#FFF" />
                  <path d="M0,420 Q150,360 300,420 T500,390 L500,500 L0,500 Z" fill="#050712" />
                  <defs>
                    <radialGradient id="nebulaGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7850DC" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#0E132D" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              )}

              {cardTheme === 'golden_dawn' && (
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 500">
                  <circle cx="250" cy="80" r="200" fill="url(#dawnGlow)" />
                  <path d="M0,410 Q200,340 400,420 T500,380 L500,500 L0,500 Z" fill="#191006" />
                  <defs>
                    <radialGradient id="dawnGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFDC82" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#5E3E12" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              )}
            </div>

            {/* Corner Ornaments */}
            <div className="absolute top-3 right-4 text-xl font-mono opacity-50 select-none text-[#D4AF37]">❊</div>
            <div className="absolute top-3 left-4 text-xl font-mono opacity-50 select-none text-[#D4AF37]">❊</div>
            <div className="absolute bottom-3 right-4 text-xl font-mono opacity-50 select-none text-[#D4AF37]">❊</div>
            <div className="absolute bottom-3 left-4 text-xl font-mono opacity-50 select-none text-[#D4AF37]">❊</div>

            {/* Inner Border Line */}
            <div className="absolute inset-2 border border-[#D4AF37]/30 pointer-events-none rounded-2xl" />

            {/* Surah Header */}
            <div className="space-y-1 pt-1 relative z-10">
              <h4 className="font-quran-amiri font-bold text-xl sm:text-2xl text-[#D4AF37] tracking-wider drop-shadow-md">
                سُورَةُ {cleanSurahName}
              </h4>
              <p className="font-quran-amiri text-sm opacity-95 drop-shadow-xs">
                بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </p>
            </div>

            {/* Main Ayah Text */}
            <div className="py-2 px-2 border-y border-[#D4AF37]/30 my-2 relative z-10">
              <p className="font-quran-uthman text-xl sm:text-2xl leading-loose font-medium drop-shadow-md">
                {ayah ? `« ${ayah.text} »` : `سورة ${cleanSurahName} الشريفة (عدد آياتها ${totalAyahs} آية)`}
              </p>
              
              {ayah && (
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs">
                  ﴿ الآية {ayah.number} ﴾
                </span>
              )}
            </div>

            {/* Tafsir Preview inside Card */}
            {ayah && includeTafsir && ayah.tafsir && (
              <div className="p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/30 text-xs leading-relaxed text-right font-sans opacity-95 relative z-10">
                <span className="font-bold block text-[#D4AF37] mb-1">التفسير الميسر:</span>
                <p className="line-clamp-4">{ayah.tafsir}</p>
              </div>
            )}

            {/* Footer Watermark Signature - Strictly "تطبيق الفرقان" */}
            <div className="pt-2 border-t border-[#D4AF37]/30 flex items-center justify-center gap-1 text-xs font-bold text-[#D4AF37] font-sans relative z-10 drop-shadow-sm">
              <span>— تطبيق الفرقان</span>
            </div>
          </div>

          {/* SOCIAL MEDIA SHARE BUTTONS */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block pr-1">
              مشاركة مباشرة على المنصات:
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>واتساب</span>
              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-2xl font-bold text-xs transition-all shadow-sm cursor-pointer"
              >
                <Send size={16} />
                <span>تيليجرام</span>
              </a>

              {/* Twitter / X */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-black hover:bg-slate-900 text-white rounded-2xl font-bold text-xs transition-all shadow-sm cursor-pointer border border-white/20"
              >
                <Twitter size={16} />
                <span>تويتر (X)</span>
              </a>

              {/* Native System Share */}
              <button
                onClick={handleNativeShare}
                className="flex items-center justify-center gap-2 p-3 bg-[#0F382C] text-[#D4AF37] hover:bg-[#154A3A] rounded-2xl font-bold text-xs transition-all shadow-sm cursor-pointer border border-[#D4AF37]/50"
              >
                <Share2 size={16} />
                <span>المزيد...</span>
              </button>

            </div>
          </div>

          {/* DOWNLOAD IMAGE & COPY TEXT BUTTONS */}
          <div className="pt-2 border-t border-[#D4AF37]/20 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* Download Image Button */}
            <button
              onClick={handleDownloadImage}
              disabled={isGeneratingImage}
              className="flex items-center justify-center gap-2 p-3.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-[#0F382C] hover:opacity-95 rounded-2xl font-bold text-xs transition-all shadow-md cursor-pointer border border-[#D4AF37]"
            >
              <ImageIcon size={18} />
              <span>{isGeneratingImage ? 'جاري إنشاء البطاقة...' : 'تحميل البطاقة كصورة (PNG)'}</span>
            </button>

            {/* Copy Text Button */}
            <button
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 p-3.5 rounded-2xl font-bold text-xs transition-all cursor-pointer border ${
                copied
                  ? 'bg-emerald-700 text-white border-emerald-600'
                  : 'bg-white dark:bg-[#1C2520] text-slate-800 dark:text-[#FAF7F2] border-slate-300 dark:border-[#D4AF37]/30 hover:border-[#D4AF37]'
              }`}
            >
              {copied ? <CheckCircle2 size={18} /> : <Copy size={18} className="text-[#D4AF37]" />}
              <span>{copied ? 'تم نسخ النص!' : 'نسخ النص'}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
