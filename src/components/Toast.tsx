import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-[#0F382C] text-[#FAF7F2] px-6 py-3.5 rounded-2xl border border-[#D4AF37]/60 shadow-2xl z-50 animate-fade-in-up flex items-center gap-2.5 text-xs sm:text-sm font-bold backdrop-blur-md" dir="rtl">
      <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0" />
      <span>{message}</span>
    </div>
  );
}
