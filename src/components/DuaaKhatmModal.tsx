import React from 'react';
import { X, Book, Heart, Copy, Sparkles } from 'lucide-react';

interface DuaaKhatmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyDuaa: (text: string) => void;
}

export default function DuaaKhatmModal({ isOpen, onClose, onCopyDuaa }: DuaaKhatmModalProps) {
  if (!isOpen) return null;

  const duaaText = `صدق الله العظيم الذي لا إله إلا هو المتوحد في جلاله بكمال أوصافه، المطلع على خفيات الأمور بجميل ألطافه.

اللهم ارحمني بالقرآن واجعله لي إماماً ونوراً وهدى ورحمة.
اللهم ذكرني منه ما نسيت وعلمني منه ما جهلت وارزقني تلاوته آناء الليل وأطراف النهار واجعله لي حجة يا رب العالمين.

اللهم أصلح لي ديني الذي هو عصمة أمري، وأصلح لي دنياي التي فيها معاشي، وأصلح لي آخرتي التي فيها معادي، واجعل الحياة زيادة لي في كل خير، واجعل الموت راحة لي من كل شر.

اللهم اجعل خير عمري آخره وخير عملي خواتمه وخير أيامي يوم ألقاك فيه.

اللهم إني أسألك عيشة هنيئة وميتة سوية ومرداً غير مخز ولا فاضح.

اللهم إني أسألك خير المسألة وخير الدعاء وخير النجاح وخير العلم وخير العمل وخير الثواب وخير الحياة وخير الممات وثبتني وثقل موازيني وحقق إيماني وارفع درجتي وتقبل صلاتي واغفر خطيئاتي وأسألك الدرجات العلى من الجنة.

اللهم أحسن عاقبتنا في الأمور كلها وأجرنا من خزي الدنيا وعذاب الآخرة.

اللهم لا تدع لنا ذنباً إلا غفرته ولا هماً إلا فرجته ولا ديناً إلا قضيته ولا حاجة من حوائج الدنيا والآخرة هي لك رضا ولنا فيها صلاح إلا قضيتها يا أرحم الراحمين.

ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.
وصلى الله على سيدنا ونبينا محمد وعلى آله وصحبه أجمعين.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in-up" dir="rtl">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#FAF7F2] dark:bg-[#121814] rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] p-5 text-[#FAF7F2] flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#FAF7F2]">
                دعاء ختم القرآن الكريم
              </h3>
              <p className="text-xs text-[#D4AF37]">
                دعاء مبارك ومأثور عقب الفراغ من تلاوة كتاب الله
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

        {/* Body Text */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow bg-[#F3EFE6] dark:bg-[#18201B]">
          <div className="bg-white dark:bg-[#121814] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-xs">
            <p className="font-quran-amiri text-lg sm:text-xl leading-[2.2] text-slate-900 dark:text-emerald-100 text-justify whitespace-pre-line">
              {duaaText}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF7F2] dark:bg-[#121814] border-t border-[#D4AF37]/20 flex justify-between items-center shrink-0">
          <span className="text-xs text-[#0F382C] dark:text-[#D4AF37] font-bold">
            تقبل الله طاعتكم وصالح أعمالكم
          </span>

          <button
            onClick={() => {
              onCopyDuaa(duaaText);
              onClose();
            }}
            className="px-5 py-2.5 bg-[#0F382C] hover:bg-[#174D3D] text-[#D4AF37] font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md"
          >
            <Copy size={16} />
            <span>نسخ الدعاء المأثور</span>
          </button>
        </div>

      </div>
    </div>
  );
}
