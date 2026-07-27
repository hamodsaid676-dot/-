// Salawat Male Voice & Audio Synthesis Engine with Browser Autoplay Unlocker

let globalAudioCtx: AudioContext | null = null;
let isAudioUnlocked = false;

// Pre-load and unlock audio context on first user interaction
export function unlockAudioSystem() {
  if (isAudioUnlocked) return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass && !globalAudioCtx) {
      globalAudioCtx = new AudioContextClass();
    }

    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      // Pre-fetch voices
      window.speechSynthesis.getVoices();
    }

    isAudioUnlocked = true;
  } catch (e) {
    console.warn("Audio unlock failed or already initialized:", e);
  }
}

// Attach global event listener to auto-unlock audio on any user tap/click
if (typeof window !== 'undefined') {
  const unlockEvents = ['click', 'touchstart', 'keydown'];
  const handleFirstInteraction = () => {
    unlockAudioSystem();
    unlockEvents.forEach(evt => window.removeEventListener(evt, handleFirstInteraction));
  };
  unlockEvents.forEach(evt => window.addEventListener(evt, handleFirstInteraction, { passive: true }));

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

export function playSalawatAudio(onStart?: () => void, onEnd?: () => void) {
  // Ensure audio context is resumed
  unlockAudioSystem();

  if (onStart) onStart();

  // 1. Play Peaceful Chime Sound (Tone synthesis)
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      if (!globalAudioCtx) {
        globalAudioCtx = new AudioContextClass();
      }
      if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
      }

      const audioCtx = globalAudioCtx;
      const now = audioCtx.currentTime;

      // Soft Islamic chime: A4 (440Hz) and E5 (659.25Hz)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 1.2);

      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.2);
      gain2.gain.setValueAtTime(0.2, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.2);
      osc2.stop(now + 1.5);
    }
  } catch (e) {
    console.warn("Chime AudioContext error:", e);
  }

  // 2. Male Voice Pronunciation "اللهم صلِّ على محمد وآل محمد"
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance('اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّد');
      utterance.lang = 'ar-SA';
      utterance.rate = 0.8; // Reverent, calm pace
      utterance.pitch = 0.75; // Male voice pitch resonance

      // Select Arabic voice (male preferred)
      const getArabicVoice = () => {
        const voices = window.speechSynthesis.getVoices();
        return voices.find(v => 
          v.lang.startsWith('ar') && (
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('maged') ||
            v.name.toLowerCase().includes('tarik') ||
            v.name.toLowerCase().includes('majed') ||
            v.name.toLowerCase().includes('naayf') ||
            v.name.toLowerCase().includes('saudi') ||
            v.name.toLowerCase().includes('zayed')
          )
        ) || voices.find(v => v.lang.startsWith('ar'));
      };

      const arabicVoice = getArabicVoice();
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };

      utterance.onerror = (err) => {
        console.warn("SpeechSynthesis error:", err);
        if (onEnd) onEnd();
      };

      // Delay speech slightly to let chime play clearly first
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 350);

    } catch (err) {
      console.warn("SpeechSynthesis execution failed:", err);
      if (onEnd) setTimeout(onEnd, 2000);
    }
  } else {
    if (onEnd) setTimeout(onEnd, 2000);
  }
}
