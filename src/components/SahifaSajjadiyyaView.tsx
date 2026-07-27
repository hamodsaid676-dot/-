import React, { useState } from 'react';
import { 
  Home, 
  Scroll, 
  Search, 
  Copy, 
  Check, 
  BookOpen, 
  Heart, 
  ChevronLeft,
  Sparkles
} from 'lucide-react';

interface SahifaDuaa {
  id: number;
  title: string;
  subtitle: string;
  duaaNumber: string;
  text: string;
}

interface SahifaSajjadiyyaViewProps {
  onBackToHome: () => void;
  onCopyText: (text: string) => void;
}

export default function SahifaSajjadiyyaView({
  onBackToHome,
  onCopyText
}: SahifaSajjadiyyaViewProps) {
  const [activeDuaaId, setActiveDuaaId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const sahifaDuaas: SahifaDuaa[] = [
    {
      id: 1,
      title: 'دعاء مكارم الأخلاق ومرضي الأفعال',
      subtitle: 'من أجلّ وأعظم أدعية الصحيفة السجادية المباركة في صلاح النفوس والسلوك',
      duaaNumber: 'الدعاء العشرون (20)',
      text: `اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَبَلِّغْ بِإِيمَانِي أَكْمَلَ الإِيمَانِ، وَاجْعَلْ يَقِينِي أَفْضَلَ الْيَقِينِ، وَانْتَهِ بِنِيَّتِي إِلَى أَحْسَنِ النِّيَّاتِ، وَبِعَمَلِي إِلَى أَحْسَنِ الأَعْمَالِ.

اللَّهُمَّ وَفِّرْ بِلُطْفِكَ نِيَّتِي، وَصَحِّحْ بِمَا عِنْدَكَ يَقِينِي، وَاسْتَصْلِحْ بِقُدْرَتِكَ مَا فَسَدَ مِنِّي.

اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَاكْفِنِي مَا يَشْغَلُنِي الاِهْتِمَامُ بِهِ، وَاسْتَعْمِلْنِي بِمَا تَسْأَلُنِي غَداً عَنْهُ، وَأَفْرِغْ أَيَّامِي فِيمَا خَلَقْتَنِي لَهُ، وَأَغْنِنِي وَأَوْسِعْ عَلَيَّ فِي رِزْقِكَ، وَلاَ تَفْتِنِّي بِالنَّظَرِ، وَأَعِزَّنِي وَلاَ تَبْتَلِيَنِّي بِالْكِبْرِ، وَعَبِّدْنِي لَكَ وَلاَ تُفْسِدْ عِبَادَتِي بِالْعُجْبِ، وَأَجْرِ لِلنَّاسِ عَلَى يَدِيَ الْخَيْرَ وَلاَ تَمْحَقْهُ بِالْمَنِّ، وَهَبْ لِي مَعَالِيَ الأَخْلاَقِ، وَاعْصِمْنِي مِنَ الْفَخْرِ.

اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَلاَ تَرْفَعْنِي فِي النَّاسِ دَرَجَةً إِلاَّ حَطَطْتَنِي عِنْدَ نَفْسِي مِثْلَهَا، وَلاَ تُحْدِثْ لِي عِزّاً ظَاهِراً إِلاَّ أَحْدَثْتَ لِي ذِلَّةً بَاطِنَةً عِنْدَ نَفْسِي بِقَدَرِهَا.

اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ، وَمَتِّعْنِي بِهُدىً صَالِحٍ لاَ أَسْتَبْدِلُ بِهِ، وَطَرِيقَةِ حَقٍّ لاَ أَزِيغُ عَنْهَا، وَنِيَّةِ رُشْدٍ لاَ أَشُكُّ فِيهَا.`
    },
    {
      id: 2,
      title: 'دعاء لأهل الثغور والحماة',
      subtitle: 'دعاء الإمام زين العابدين لحفظ الأمن والمرابطين في سبيل الله',
      duaaNumber: 'الدعاء السابع والعشرون (27)',
      text: `اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَحَصِّنْ ثُغُورَ الْمُسْلِمِينَ بِعِزَّتِكَ، وَأَيِّدْ حُمَاتَهَا بِقُوَّتِكَ، وَأَسْبِغْ عَطَايَاهُمْ مِنْ جِدَتِكَ.

اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَكَثِّرْ عِدَّتَهُمْ، وَاشْحَذْ أَسْلِحَتَهُمْ، وَاحْرُسْ حَوْزَتَهُمْ، وَامْنَعْ حُومَتَهُمْ، وَأَلِّفْ جَمْعَهُمْ، وَدَبِّرْ أَمْرَهُمْ، وَوَاتِرْ بَيْنَ أَمْدَادِهِمْ، وَوَحِّدْ سَرَايَاهُمْ، وَأَنْزِلِ النَّصْرَ عَلَيْهِمْ.

اللَّهُمَّ وَأَيُّمَا مُسْلِمٍ خَلَفَ غَازِياً أَوْ مُرَابِطاً فِي دَارِهِ، أَوْ خَلَفَهُ فِي أَهْلِهِ، أَوْ أَعَانَهُ بِمَالٍ، أَوْ أَمَدَّهُ بِعِتَادٍ، أَوْ شَجَّعَهُ عَلَى جِهَادٍ، أَوْ أَتْبَعَهُ فِي وَجْهِهِ دَعْوَةً، أَوْ رَعَى لَهُ مِنْ وَرَائِهِ حُرْمَةً، فَأَجْرِ لَهُ مِثْلَ أَجْرِهِ وَزِنَةَ عَمَلِهِ، وَعَوِّضْهُ عَنْ فِعْلِهِ عِوَضاً عَاجِلاً يَتَعَجَّلُ بِهِ نَفْعَ مَا قَدَّمَ، وَفَرَحَ مَا أَتَى بِهِ.`
    },
    {
      id: 3,
      title: 'دعاء في التوبة وطلب الإقالة',
      subtitle: 'مناجاة خاشعة في الإنابة إلى الله وغفران الذنوب',
      duaaNumber: 'الدعاء الحادي والثلاثون (31)',
      text: `اللَّهُمَّ يَا مَنْ لاَ يَصِفُهُ نَعْتُ الْوَاصِفِينَ، وَيَا مَنْ لاَ يُجَاوِزُهُ رَجَاءُ الرَّاجِينَ، وَيَا مَنْ لاَ يَضِيعُ عِنْدَهُ أَجْرُ الْمُحْسِنِينَ، وَيَا مَنْ هُوَ مُنْتَهَى خَوْفِ الْعَابِدِينَ.

هَذَا مَقَامُ مَنْ تَدَاوَلَتْهُ ذُنُوبُهُ، وَقَادَتْهُ خَطَايَاهُ، وَاسْتَحْوَذَ عَلَيْهِ الشَّيْطَانُ، فَقَصَّرَ عَمَّا أَمَرْتَ بِهِ تَفْرِيطاً، وَنَهَضَ إِلَى مَا نَهَيْتَ عَنْهُ تََعَزُّراً.

فَهَا أَنَا ذَا بَيْنَ يَدَيْكَ صَاغِراً ذَلِيلاً، خَاضِعاً خَاشِعاً، أَرْجُو رَحْمَتَكَ، وَأَخَافُ عَذَابَكَ.

اللَّهُمَّ فَصَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَاغْفِرْ لِي مَا صَنَعْتُ، وَتَبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ.`
    },
    {
      id: 4,
      title: 'دعاء الصباح والمساء',
      subtitle: 'دعاء الإمام ع عند الإصباح والإمساء وشكر نعم اليوم والليل',
      duaaNumber: 'الدعاء السادس (6)',
      text: `الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ اللَّيْلَ وَالنَّهَارَ بِقُوَّتِهِ، وَمَيَّزَ بَيْنَهُمَا بِقُدْرَتِهِ، وَجَعَلَ لِكُلِّ وَاحِدٍ مِنْهُمَا حَدّاً مَحْدُوداً، وَأَمَداً مَمْدُوداً.

اللَّهُمَّ فَكَمَا أَبْقَيْتَنَا لِهَذَا الْيَوْمِ، فَأَبْقِنَا لأَمْثَالِهِ، وَصَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَلاَ تَفْجَعْنَا فِيهِ وَفِي غَيْرِهِ مِنَ اللَّيَالِي وَالأَيَّامِ بِارْتِكَابِ الْمَحَارِمِ، وَاكْتِسَابِ الآثَامِ، وَارْزُقْنَا خَيْرَهُ وَخَيْرَ مَا فِيهِ وَخَيْرَ مَا بَعْدَهُ.`
    },
    {
      id: 5,
      title: 'دعاء عند الشدة والكرَب والمهمات',
      subtitle: 'دعاء تفريج الهموم وكشف الغموم وقضاء الحوائج',
      duaaNumber: 'الدعاء السابع (7)',
      text: `يَا مَنْ تُحَلُّ بِهِ عُقَدُ الْمَكَارِهِ، وَيَا مَنْ يُفْثَأُ بِهِ حَدُّ الشَّدَائِدِ، وَيَا مَنْ يُلْتَمَسُ مِنْهُ الْمَخْرَجُ إِلَى رَوْحِ الْفَرَجِ.

ذَلَّتْ لِقُدْرَتِكَ الصِّعَابُ، وَتَسَبَّبَتْ بِلُطْفِكَ الأَسْبَابُ، وَجَرَى بِقُدْرَتِكَ الْقَضَاءُ، وَمَضَتْ عَلَى إِرَادَتِكَ الأَشْيَاءُ.

فَأَنْتَ الْمَدْعُوُّ لِلْمُهِمَّاتِ، وَأَنْتَ الْمَفْزَعُ فِي الْمُلِمَّاتِ، لاَ يَنَدَفِعُ مِنْهَا إِلاَّ مَا دَفَعْتَ، وَلاَ يَنْكَشِفُ مِنْهَا إِلاَّ مَا كَشَفْتَ.

فَصَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَافْتَحْ لِي يَا رَبِّ بَابَ الْفَرَجِ بِطَوْلِكَ، وَاكْسِرْ عَنِّي سُلْطَانَ الْهَمِّ بِحَوْلِكَ.`
    },
    {
      id: 6,
      title: 'دعاء في طلب العافية وشكرها',
      subtitle: 'دعاء السلامة والشفاء والتعافي في الدين والدنيا',
      duaaNumber: 'الدعاء الخامس عشر (15)',
      text: `اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَأَلْبِسْنِي عَافِيَتَكَ، وَجَلِّلْنِي عَافِيَتَكَ، وَحَصِّنِّي بِعَافِيَتِكَ، وَأَكْرِمْنِي بِعَافِيَتِكَ، وَأَغْنِنِي بِعَافِيَتِكَ، وَتَصَدَّقْ عَلَيَّ بِعَافِيَتِكَ.

اللَّهُمَّ وَاهَبْ لِي الصِّحَّةَ فِي الْعِبَادَةِ، وَالْفَرَاغَ فِي الزَّهَادَةِ، وَالْعِلْمَ فِي الاسْتِعْمَالِ، وَالْوَرَعَ فِي الابْتِهَالِ.`
    },
    {
      id: 7,
      title: 'دعاء للوالدين وإظهار البر لهما',
      subtitle: 'مناجاة مباركة في رعاية حق الأبوين وشكرهما',
      duaaNumber: 'الدعاء الرابع والعشرون (24)',
      text: `اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ عَبْدِكَ وَرَسُولِكَ، وَأَهْلِ بَيْتِهِ الطَّاهِرِينَ، وَاخْصُصْ أَبَوَيَّ بِأَفْضَلِ مَا خَصَصْتَ بِهِ آَبَاءَ عِبَادِكَ الْمُؤْمِنِينَ وَأُمَّهَاتِهِمْ.

اللَّهُمَّ لاَ تُنْسِنِي ذِكْرَهُمَا فِي أَدْبَارِ صَلَوَاتِي، وَفِي إِﻧًﻰ مِنْ آَنَاءِ لَيْلِي، وَفِي كُلِّ سَاعَةٍ مِنْ سَاعَاتِ نَهَارِي.

اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِهِ، وَاغْفِرْ لَهُمَا بِرَحْمَتِكَ، وَارْحَمْهُمَا بِرِضْوَانِكَ، وَبَلِّغْهُمَا أَعْلَى مَنَازِلِ الكَرَامَةِ.`
    }
  ];

  const currentDuaa = sahifaDuaas.find(d => d.id === activeDuaaId) || sahifaDuaas[0];

  const handleCopy = () => {
    const textToCopy = `﴿ ${currentDuaa.title} ﴾\n[من أدعية الصحيفة السجادية المباركة - ${currentDuaa.duaaNumber}]\n\n${currentDuaa.text}\n\n(من تطبيق الفرقان - القرآن الكريم والأدعية)`;
    onCopyText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in" dir="rtl">
      
      {/* HEADER BANNER WITH HOME BUTTON */}
      <div className="flex items-center justify-between bg-[#0F382C] text-[#FAF7F2] p-4 sm:p-5 rounded-3xl border border-[#D4AF37]/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Heart size={22} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-quran-amiri">أدعية الصحيفة السجادية</h2>
            <p className="text-xs text-[#D4AF37]/90 font-sans">
              مختارات مباركة من أدعية الإمام زين العابدين علي بن الحسين (عليهما السلام)
            </p>
          </div>
        </div>

        {/* PRIMARY HOME BUTTON */}
        <button
          onClick={onBackToHome}
          className="px-3.5 py-2 rounded-2xl bg-[#D4AF37] text-[#0F382C] hover:bg-[#e2bd46] font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer"
        >
          <Home size={18} />
          <span>الرئيسية</span>
        </button>
      </div>

      {/* DUAAS SELECTION HORIZONTAL BAR */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sahifaDuaas.map((d) => (
          <button
            key={d.id}
            onClick={() => setActiveDuaaId(d.id)}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeDuaaId === d.id
                ? 'bg-[#0F382C] text-[#D4AF37] border border-[#D4AF37] shadow-lg scale-102'
                : 'bg-white dark:bg-[#141C18] text-slate-700 dark:text-emerald-100 border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]'
            }`}
          >
            <Scroll size={14} className={activeDuaaId === d.id ? 'text-[#D4AF37]' : 'text-slate-400'} />
            <span>{d.title}</span>
          </button>
        ))}
      </div>

      {/* ACTIVE DUA CARD DISPLAY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/40 shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Top Title Banner */}
        <div className="bg-gradient-to-r from-[#0F382C] via-[#174D3D] to-[#0F382C] text-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/30 text-center space-y-2">
          <span className="text-xs bg-[#D4AF37] text-[#0F382C] px-3 py-0.5 rounded-full font-bold">
            {currentDuaa.duaaNumber}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-quran-amiri text-[#FAF7F2]">
            {currentDuaa.title}
          </h3>
          <p className="text-xs text-[#D4AF37]/90 font-sans max-w-lg mx-auto">
            {currentDuaa.subtitle}
          </p>
        </div>

        {/* Full Duaa Text */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2]/60 dark:bg-[#0D1410]/60 rounded-2xl border border-[#D4AF37]/20">
          <p className="font-quran-amiri text-2xl sm:text-3xl leading-loose text-[#0F382C] dark:text-[#FAF7F2] text-justify whitespace-pre-line">
            {currentDuaa.text}
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-emerald-200/70 font-sans">
            من كتاب الصحيفة السجادية الكاملة
          </span>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-[#0F382C] text-[#D4AF37] hover:bg-[#164D3C] text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            {isCopied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span>{isCopied ? 'تم نسخ الدعاء المبارك' : 'نسخ نص الدعاء'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
