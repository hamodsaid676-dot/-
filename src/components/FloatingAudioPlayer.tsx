import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronUp, 
  ChevronDown,
  Gauge,
  UserCheck,
  RotateCcw
} from 'lucide-react';
import { AudioPlaybackState, Reciter, PlayMode } from '../types';
import { pad3, getMinshawiFallbackAudioUrl } from '../quranData';

interface FloatingAudioPlayerProps {
  playbackState: AudioPlaybackState;
  reciters: Reciter[];
  surahName: string;
  totalAyahsInSurah: number;
  onUpdateState: (updates: Partial<AudioPlaybackState>) => void;
  onNextAyah: () => void;
  onPrevAyah: () => void;
  onClosePlayer: () => void;
}

export default function FloatingAudioPlayer({
  playbackState,
  reciters,
  surahName,
  totalAyahsInSurah,
  onUpdateState,
  onNextAyah,
  onPrevAyah,
  onClosePlayer
}: FloatingAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [hasEverPlayed, setHasEverPlayed] = useState<boolean>(false);
  const [fallbackAttempt, setFallbackAttempt] = useState<number>(0);

  useEffect(() => {
    if (playbackState.isPlaying) {
      setHasEverPlayed(true);
    }
  }, [playbackState.isPlaying]);

  const currentReciter = reciters.find(r => r.id === playbackState.reciterId) || reciters[0];

  // Derive current Audio URL with fallbacks
  const getActiveAudioUrl = (attempt: number): string => {
    if (attempt === 0) {
      return currentReciter.getAyahAudioUrl(playbackState.currentSurahId, playbackState.currentAyahNumber);
    }
    return getMinshawiFallbackAudioUrl(playbackState.reciterId, playbackState.currentSurahId, playbackState.currentAyahNumber, attempt);
  };

  // Effect to handle loading and playing new audio src when surah/ayah/reciter changes
  useEffect(() => {
    if (!audioRef.current) return;

    setFallbackAttempt(0);
    const url = getActiveAudioUrl(0);
    setAudioError(null);
    audioRef.current.src = url;
    audioRef.current.playbackRate = playbackState.playbackRate;

    if (playbackState.isPlaying) {
      audioRef.current.play().catch(err => {
        console.warn("Audio play error, attempting fallback:", err);
      });
    }
  }, [playbackState.currentSurahId, playbackState.currentAyahNumber, playbackState.reciterId]);

  const handleAudioError = () => {
    if (fallbackAttempt < 2) {
      const nextAttempt = fallbackAttempt + 1;
      setFallbackAttempt(nextAttempt);
      const fallbackUrl = getActiveAudioUrl(nextAttempt);
      if (audioRef.current) {
        audioRef.current.src = fallbackUrl;
        audioRef.current.play().catch(e => console.warn("Fallback play error:", e));
      }
    } else {
      if (!navigator.onLine) {
        setAudioError("أنت أوفلاين: التلاوات المستمع إليها سابقاً مجهزة للعمل بدون نت، يتطلب الاتصال لتلاوة جديدة.");
      } else {
        setAudioError("جاري إعادة الاتصال بسيرفر تلاوات الشيخ المنشاوي...");
      }
    }
  };

  // Effect to toggle play/pause when state updates
  useEffect(() => {
    if (!audioRef.current) return;
    if (playbackState.isPlaying) {
      audioRef.current.play().catch(e => console.warn("Play paused by user interaction requirement", e));
    } else {
      audioRef.current.pause();
    }
  }, [playbackState.isPlaying]);

  // Effect to update playback rate when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackState.playbackRate;
    }
  }, [playbackState.playbackRate]);

  // STRICT RULE: Do NOT render audio player on launch or if playback is stopped and closed
  if (!playbackState.isPlaying && !hasEverPlayed) {
    return null;
  }

  // Handle audio track finish (Ended event)
  const handleAudioEnded = () => {
    // Check repeat count
    if (playbackState.repeatCount > 1 && playbackState.currentRepeatIndex < playbackState.repeatCount - 1) {
      onUpdateState({ currentRepeatIndex: playbackState.currentRepeatIndex + 1 });
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      return;
    }

    // Reset repeat index for next verse
    onUpdateState({ currentRepeatIndex: 0 });

    // Handle PlayMode behavior
    if (playbackState.playMode === 'single_ayah') {
      onUpdateState({ isPlaying: false });
    } else if (playbackState.playMode === 'surah' || playbackState.playMode === 'continuous') {
      if (playbackState.currentAyahNumber < totalAyahsInSurah) {
        onNextAyah();
      } else {
        // Surah completed
        if (playbackState.playMode === 'continuous' && playbackState.currentSurahId < 114) {
          // Move to next Surah, Ayah 1!
          onUpdateState({
            currentSurahId: playbackState.currentSurahId + 1,
            currentAyahNumber: 1,
            isPlaying: true
          });
        } else {
          onUpdateState({ isPlaying: false });
        }
      }
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getPlayModeLabel = (mode: PlayMode) => {
    switch(mode) {
      case 'single_ayah': return 'آية واحدة';
      case 'surah': return 'تشغيل السورة';
      case 'continuous': return 'تشغيل مستمر';
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-2 sm:p-4 pointer-events-none" dir="rtl">
      
      {/* Hidden native HTML audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 0);
          }
        }}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
      />

      {/* Floating Player Card */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#0F382C] via-[#164d3c] to-[#0F382C] text-[#FAF7F2] rounded-2xl sm:rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden pointer-events-auto backdrop-blur-md transition-all">
        
        {/* Timeline Progress Bar Top */}
        <div className="w-full bg-[#09221B] h-1.5 relative cursor-pointer group">
          <div 
            className="bg-gradient-to-r from-[#D4AF37] to-[#F3EFE6] h-full transition-all duration-200"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentTime(val);
              if (audioRef.current) audioRef.current.currentTime = val;
            }}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>

        <div className="p-3 sm:p-4 px-4 sm:px-6 flex flex-col gap-3">
          
          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Left Info: Reciter Avatar & Surah / Ayah details */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0 font-bold shadow-inner">
                <span className="text-xs sm:text-sm font-quran-amiri">{pad3(playbackState.currentAyahNumber)}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-[#FAF7F2] truncate">
                    {surahName}
                  </h4>
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30 shrink-0">
                    الآية {playbackState.currentAyahNumber} من {totalAyahsInSurah}
                  </span>
                </div>
                <p className="text-[11px] text-[#D4AF37]/90 truncate mt-0.5 flex items-center gap-1">
                  <UserCheck size={12} className="inline" />
                  <span>{currentReciter.name} ({currentReciter.type})</span>
                </p>
              </div>
            </div>

            {/* Middle Playback Buttons */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Previous Ayah */}
              <button
                onClick={onPrevAyah}
                disabled={playbackState.currentAyahNumber <= 1}
                className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-slate-200 disabled:opacity-30 transition-colors"
                title="الآية السابقة"
              >
                <SkipForward size={18} />
              </button>

              {/* Main Play / Pause */}
              <button
                onClick={() => onUpdateState({ isPlaying: !playbackState.isPlaying })}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] text-[#0F382C] font-bold flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                title={playbackState.isPlaying ? "إيقاف مؤقت" : "تشغيل"}
              >
                {playbackState.isPlaying ? (
                  <Pause size={22} fill="currentColor" />
                ) : (
                  <Play size={22} fill="currentColor" className="mr-0.5" />
                )}
              </button>

              {/* Next Ayah */}
              <button
                onClick={onNextAyah}
                disabled={playbackState.currentAyahNumber >= totalAyahsInSurah && playbackState.currentSurahId >= 114}
                className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-slate-200 disabled:opacity-30 transition-colors"
                title="الآية التالية"
              >
                <SkipBack size={18} />
              </button>

            </div>

            {/* Right Side Options & Expand Toggle */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <span className="hidden sm:inline-block text-[11px] bg-white/10 text-emerald-100 px-2.5 py-1 rounded-lg border border-white/10">
                {getPlayModeLabel(playbackState.playMode)}
              </span>

              <button
                onClick={() => setExpanded(!expanded)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] transition-colors"
                title="خيارات إضافية"
              >
                {expanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
              </button>

              <button
                onClick={() => {
                  setHasEverPlayed(false);
                  onClosePlayer();
                }}
                className="p-2 rounded-xl hover:bg-rose-500/20 text-rose-300 transition-colors"
                title="إغلاق المشغل"
              >
                <X size={18} />
              </button>
            </div>

          </div>

          {/* Expanded Drawer for Speed, Reciter, Repeat, PlayMode */}
          {expanded && (
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs animate-fade-in-up">
              
              {/* Play Mode selector */}
              <div>
                <label className="text-[10px] text-[#D4AF37] block font-bold mb-1">نمط التشغيل:</label>
                <select
                  value={playbackState.playMode}
                  onChange={(e) => onUpdateState({ playMode: e.target.value as PlayMode })}
                  className="w-full bg-[#09221B] border border-[#D4AF37]/30 text-[#FAF7F2] rounded-xl px-2.5 py-1.5 text-xs outline-none"
                >
                  <option value="single_ayah">آية واحدة</option>
                  <option value="surah">تشغيل السورة</option>
                  <option value="continuous">تشغيل مستمر</option>
                </select>
              </div>

              {/* Reciter Selector */}
              <div>
                <label className="text-[10px] text-[#D4AF37] block font-bold mb-1">القارئ:</label>
                <select
                  value={playbackState.reciterId}
                  onChange={(e) => onUpdateState({ reciterId: e.target.value })}
                  className="w-full bg-[#09221B] border border-[#D4AF37]/30 text-[#FAF7F2] rounded-xl px-2.5 py-1.5 text-xs outline-none"
                >
                  {reciters.map((r) => (
                    <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
                  ))}
                </select>
              </div>

              {/* Repeat Ayah count */}
              <div>
                <label className="text-[10px] text-[#D4AF37] block font-bold mb-1">تكرار الآية:</label>
                <button
                  onClick={() => {
                    const nextRepeat = playbackState.repeatCount === 1 ? 3 : playbackState.repeatCount === 3 ? 5 : 1;
                    onUpdateState({ repeatCount: nextRepeat, currentRepeatIndex: 0 });
                  }}
                  className="w-full bg-[#09221B] border border-[#D4AF37]/30 text-[#FAF7F2] rounded-xl px-2.5 py-1.5 text-xs flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <RotateCcw size={12} className="text-[#D4AF37]" />
                    <span>{playbackState.repeatCount} مرات</span>
                  </span>
                  {playbackState.repeatCount > 1 && (
                    <span className="text-[10px] bg-[#D4AF37] text-[#0F382C] px-1.5 rounded-full font-bold">
                      {playbackState.currentRepeatIndex + 1}/{playbackState.repeatCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Speed rate */}
              <div>
                <label className="text-[10px] text-[#D4AF37] block font-bold mb-1">سرعة التلاوة:</label>
                <button
                  onClick={() => {
                    const nextSpeed = playbackState.playbackRate === 1 ? 1.25 : playbackState.playbackRate === 1.25 ? 0.75 : 1;
                    onUpdateState({ playbackRate: nextSpeed });
                  }}
                  className="w-full bg-[#09221B] border border-[#D4AF37]/30 text-[#FAF7F2] rounded-xl px-2.5 py-1.5 text-xs flex items-center justify-between"
                >
                  <span className="flex items-center gap-1">
                    <Gauge size={12} className="text-[#D4AF37]" />
                    <span>السرعة:</span>
                  </span>
                  <span className="font-mono font-bold text-[#D4AF37]">{playbackState.playbackRate}x</span>
                </button>
              </div>

            </div>
          )}

          {/* Time indicator and status error footer */}
          <div className="flex justify-between items-center text-[10px] text-[#D4AF37]/80 pt-0.5">
            <span className="font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
            {audioError && <span className="text-rose-300 font-bold">{audioError}</span>}
            <span className="hidden sm:inline">تطبيق الفرقان (القرآن الكريم)</span>
          </div>

        </div>

      </div>
    </div>
  );
}
