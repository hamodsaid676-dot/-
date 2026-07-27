import React, { useState } from 'react';
import { 
  Home, 
  Copy, 
  Sparkles, 
  Check, 
  Volume2, 
  Filter,
  ChevronDown,
  BookOpen
} from 'lucide-react';

interface QunutVerse {
  id: number;
  category: 'rabana' | 'rabbi' | 'alhamd';
  categoryLabel: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  text: string;
  tafsirShort: string;
}

interface QunutVersesViewProps {
  onBackToHome: () => void;
  onPlayAyah: (surahId: number, ayahNumber: number) => void;
  onCopyText: (text: string) => void;
}

export default function QunutVersesView({
  onBackToHome,
  onPlayAyah,
  onCopyText
}: QunutVersesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Complete List of Quranic Supplications (All Complete Rabbana Verses + Rabbi + Al-Hamd)
  const qunutVersesList: QunutVerse[] = [
    // === 1. فئة آيات رَبَّنَا (كاملة ومستوفاة من القرآن الكريم) ===
    {
      id: 1,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 2,
      surahName: 'البقرة',
      ayahNumber: 127,
      text: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
      tafsirShort: 'دعاء إبراهيم وإسماعيل عليهما السلام عند بناء البيت الحرام لطلب قبول الأعمال.'
    },
    {
      id: 2,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 2,
      surahName: 'البقرة',
      ayahNumber: 128,
      text: 'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِنْ ذُرِّيَّتِنَا أُمَّةً مُسْلِمَةً لَكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ',
      tafsirShort: 'دعاء بالإخلاص في الإسلام وصلاح الذرية والهداية إلى مناسك الطاعة والتوبة.'
    },
    {
      id: 3,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 2,
      surahName: 'البقرة',
      ayahNumber: 201,
      text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
      tafsirShort: 'أجمع دعاء في القرآن الكريم يجمع خيري الدنيا والآخرة والسلامة من العقاب.'
    },
    {
      id: 4,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 2,
      surahName: 'البقرة',
      ayahNumber: 250,
      text: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
      tafsirShort: 'دعاء طالوت والمؤمنين بالصبر والتثبيت والنصر في مواجهة الشدائد.'
    },
    {
      id: 5,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 2,
      surahName: 'البقرة',
      ayahNumber: 285,
      text: 'رَبَّنَا لا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا',
      tafsirShort: 'دعاء المؤمنين بطلب العفو عن الخطأ والنسيان بفضل رحمة الله.'
    },
    {
      id: 6,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 2,
      surahName: 'البقرة',
      ayahNumber: 286,
      text: 'رَبَّنَا وَلا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا * رَبَّنَا وَلا تُحَمِّلْنَا مَا لا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
      tafsirShort: 'دعاء رفع الآصار والأغلال وطلب الرحمة والمغفرة والنصر الإلهي.'
    },
    {
      id: 7,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 8,
      text: 'رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ',
      tafsirShort: 'دعاء الراسخين في العلم بالثبات على الهداية وطلب الرحمة من الله الوهاب.'
    },
    {
      id: 8,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 9,
      text: 'رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لا رَيْبَ فِيهِ إِنَّ اللَّهَ لا يُخْلِفُ الْمِيعَادَ',
      tafsirShort: 'إقرار بالمعاد واليوم الآخر والتوسل بالإيمان بيوم القيامة.'
    },
    {
      id: 9,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 16,
      text: 'رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ',
      tafsirShort: 'دعاء المتقين بالتوسل بالإيمان لغفران الذنوب والحماية من النار.'
    },
    {
      id: 10,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 53,
      text: 'رَبَّنَا آمَنَّا بِمَا أَنْزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ',
      tafsirShort: 'دعاء الحواريين بالإيمان بما أنزل الله والتصديق بالرسل.'
    },
    {
      id: 11,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 147,
      text: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
      tafsirShort: 'دعاء الربانيين والصالحين في مواطن الجبهات لغفران التقصير والتثبيت.'
    },
    {
      id: 12,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 191,
      text: 'رَبَّنَا مَا خَلَقْتَ هَذَا بَاطِلا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ',
      tafsirShort: 'دعاء أولي الألباب المتفكرين في خلق السموات والأرض.'
    },
    {
      id: 13,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 192,
      text: 'رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ',
      tafsirShort: 'التضرع الخاشع للسلامة من الخزي والعذاب الأليم.'
    },
    {
      id: 14,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 193,
      text: 'رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الأَبْرَارِ',
      tafsirShort: 'دعاء الاستجابة لمنادي الحق وطلب التكفير عن السيئات والموت مع الأبرار.'
    },
    {
      id: 15,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 3,
      surahName: 'آل عمران',
      ayahNumber: 194,
      text: 'رَبَّنَا وَآتِنَا مَا وَعَدْتَنَا عَلَى رُسُلِكَ وَلا تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لا تُخْلِفُ الْمِيعَادَ',
      tafsirShort: 'دعاء بالفوز بالوعد الإلهي بالرحمة والسلامة من الخزي يوم القيامة.'
    },
    {
      id: 16,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 5,
      surahName: 'المائدة',
      ayahNumber: 83,
      text: 'رَبَّنَا آمَنَّا فَاكْتُبْنَا مَعَ الشَّاهِدِينَ',
      tafsirShort: 'دعاء الذين يفيضون من الدمع عند سماع القرآن خشوعاً وإيماناً.'
    },
    {
      id: 17,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 5,
      surahName: 'المائدة',
      ayahNumber: 114,
      text: 'رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ',
      tafsirShort: 'دعاء عيسى ابن مريم عليه السلام بطلب الرزق والبركة والآية المباركة.'
    },
    {
      id: 18,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 7,
      surahName: 'الأعراف',
      ayahNumber: 23,
      text: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
      tafsirShort: 'دعاء آدم وحواء عليهما السلام في الاعتراف بالذنب وطلب الغفران والرحمة.'
    },
    {
      id: 19,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 7,
      surahName: 'الأعراف',
      ayahNumber: 47,
      text: 'رَبَّنَا لا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ',
      tafsirShort: 'دعاء أهل الأعراف والسلامة من مصير أهل النار.'
    },
    {
      id: 20,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 7,
      surahName: 'الأعراف',
      ayahNumber: 89,
      text: 'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنْتَ خَيْرُ الْفَاتِحِينَ',
      tafsirShort: 'دعاء شعيب عليه السلام بالفتح بين أهل الحق والباطل.'
    },
    {
      id: 21,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 7,
      surahName: 'الأعراف',
      ayahNumber: 126,
      text: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ',
      tafsirShort: 'دعاء السحرة التائبين بالصبر على الأذى والثبات على الإسلام.'
    },
    {
      id: 22,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 10,
      surahName: 'يونس',
      ayahNumber: 85,
      text: 'رَبَّنَا لا تَجْعَلْنَا فِتْنَةً لِلْقَوْمِ الظَّالِمِينَ * وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ',
      tafsirShort: 'دعاء قوم موسى عليه السلام بالسلامة من تسلط الظلمة والنجاة بالرحمة.'
    },
    {
      id: 23,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 14,
      surahName: 'إبراهيم',
      ayahNumber: 38,
      text: 'رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ وَمَا يَخْفَى عَلَى اللَّهِ مِن شَيْءٍ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ',
      tafsirShort: 'دعاء إبراهيم بتفويض الأمر واليقين بعلم الله المحيط لكل نجوى.'
    },
    {
      id: 24,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 14,
      surahName: 'إبراهيم',
      ayahNumber: 41,
      text: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
      tafsirShort: 'دعاء إبراهيم الخليل عليه السلام بالمغفرة الجامعة له ولوالديه ولجميع المؤمنين.'
    },
    {
      id: 25,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 18,
      surahName: 'الكهف',
      ayahNumber: 10,
      text: 'رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
      tafsirShort: 'دعاء فتية الكهف بالرحمة الخاصة والتوفيق والرشاد في أمرهم.'
    },
    {
      id: 26,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 23,
      surahName: 'المؤمنون',
      ayahNumber: 109,
      text: 'رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ',
      tafsirShort: 'دعاء فريق المؤمنين بالتوسل بالإيمان والمغفرة والرحمة.'
    },
    {
      id: 27,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 25,
      surahName: 'الفرقان',
      ayahNumber: 65,
      text: 'رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
      tafsirShort: 'دعاء عباد الرحمن الخاشعين بالسلامة من النوازل والمكاره.'
    },
    {
      id: 28,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 25,
      surahName: 'الفرقان',
      ayahNumber: 74,
      text: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
      tafsirShort: 'دعاء صلاح الذرية والأهل وأن يكون المؤمن قدوة في المتقين.'
    },
    {
      id: 29,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 40,
      surahName: 'غافر',
      ayahNumber: 7,
      text: 'رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ',
      tafsirShort: 'دعاء حملة العرش والملائكة للمؤمنين التائبين المغفرة والوقاية.'
    },
    {
      id: 30,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 59,
      surahName: 'الحشر',
      ayahNumber: 10,
      text: 'رَبَّنَا اغْفِرْ لَنَا وَلإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالإِيمَانِ وَلا تَجْعَلْ فِي قُلُوبِنَا غِلا لِلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَحِيمٌ',
      tafsirShort: 'دعاء المؤمنين التابعين للترحم على السابقين وسلامة القلوب من الغل.'
    },
    {
      id: 31,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 60,
      surahName: 'الممتحنة',
      ayahNumber: 4,
      text: 'رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ',
      tafsirShort: 'دعاء إبراهيم والذين معه بالتوكل على الله والإنابة إليه.'
    },
    {
      id: 32,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 60,
      surahName: 'الممتحنة',
      ayahNumber: 5,
      text: 'رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا إِنَّكَ أَنتَ الْعَزِيزُ الْحَكِيمُ',
      tafsirShort: 'دعاء بالسلامة من الفتن والمغفرة الجامعة والتوسل بعزة الله وحكمته.'
    },
    {
      id: 33,
      category: 'rabana',
      categoryLabel: 'دعاء (رَبَّنَا...)',
      surahId: 66,
      surahName: 'التحريم',
      ayahNumber: 8,
      text: 'رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
      tafsirShort: 'دعاء المؤمنين في المحشر بتمام النور والغفران.'
    },

    // === 2. فئة آيات رَبِّ ===
    {
      id: 34,
      category: 'rabbi',
      categoryLabel: 'دعاء (رَبِّ...)',
      surahId: 14,
      surahName: 'إبراهيم',
      ayahNumber: 40,
      text: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',
      tafsirShort: 'دعاء الخليل عليه السلام بطلب المحافظة على الصلاة وصلاح الذرية.'
    },
    {
      id: 35,
      category: 'rabbi',
      categoryLabel: 'دعاء (رَبِّ...)',
      surahId: 20,
      surahName: 'طه',
      ayahNumber: 25,
      text: 'رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي * يَفْقَهُوا قَوْلِي',
      tafsirShort: 'دعاء موسى الكليم عليه السلام بانشراح الصدر وتيسير الأمور والتسديد.'
    },
    {
      id: 36,
      category: 'rabbi',
      categoryLabel: 'دعاء (رَبِّ...)',
      surahId: 27,
      surahName: 'النمل',
      ayahNumber: 19,
      text: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ',
      tafsirShort: 'دعاء سليمان عليه السلام للتوفيق لشكر النعم والعمل الصالح.'
    },
    {
      id: 37,
      category: 'rabbi',
      categoryLabel: 'دعاء (رَبِّ...)',
      surahId: 28,
      surahName: 'القصص',
      ayahNumber: 24,
      text: 'رَبِّ إِنِّي لِمَا أَنْزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ',
      tafsirShort: 'دعاء موسى عليه السلام عند ظلال الشجرة يطلب الفضل الإلهي والرزق.'
    },

    // === 3. فئة آيات الْحَمْدُ لِلَّهِ ===
    {
      id: 38,
      category: 'alhamd',
      categoryLabel: 'آيات (الْحَمْدُ لِلَّهِ...)',
      surahId: 1,
      surahName: 'الفاتحة',
      ayahNumber: 2,
      text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      tafsirShort: 'الثناء المطلق الكامل لله عز وجل رب العالمين.'
    },
    {
      id: 39,
      category: 'alhamd',
      categoryLabel: 'آيات (الْحَمْدُ لِلَّهِ...)',
      surahId: 7,
      surahName: 'الأعراف',
      ayahNumber: 43,
      text: 'الْحَمْدُ لِلَّهِ الَّذِي هَدَانَا لِهَذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلا أَنْ هَدَانَا اللَّهُ',
      tafsirShort: 'حمد أهل الجنة والشكر الإلهي على نعمة الإيمان والهداية.'
    }
  ];

  const categoriesMap = [
    { id: 'all', label: 'جميع آيات القنوت والأدعية القرآنية', count: qunutVersesList.length },
    { id: 'rabana', label: 'آيات (رَبَّنَا...) كاملة', count: qunutVersesList.filter(v => v.category === 'rabana').length },
    { id: 'rabbi', label: 'آيات (رَبِّ...)', count: qunutVersesList.filter(v => v.category === 'rabbi').length },
    { id: 'alhamd', label: 'آيات (الْحَمْدُ لِلَّهِ...)', count: qunutVersesList.filter(v => v.category === 'alhamd').length }
  ];

  const currentCategoryObj = categoriesMap.find(c => c.id === selectedCategory) || categoriesMap[0];

  const filteredVerses = selectedCategory === 'all' 
    ? qunutVersesList 
    : qunutVersesList.filter(v => v.category === selectedCategory);

  const handleCopy = (verse: QunutVerse) => {
    const textToCopy = `﴿ ${verse.text} ﴾\n[سورة ${verse.surahName} - الآية ${verse.ayahNumber}]\n(من آيات القنوت المباركة - تطبيق الفرقان)`;
    onCopyText(textToCopy);
    setCopiedId(verse.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in" dir="rtl">
      
      {/* TOP HEADER WITH HOME BUTTON */}
      <div className="flex items-center justify-between bg-[#0F382C] text-[#FAF7F2] p-4 sm:p-5 rounded-3xl border border-[#D4AF37]/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
            <Sparkles size={22} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-quran-amiri">آيات القنوت في الصلاة</h2>
            <p className="text-xs text-[#D4AF37]/90 font-sans">
              موسوعة أدعية القرآن الكريم الكامِلة (آيات "رَبَّنَا..." وسائر الأدعية)
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

      {/* SINGLE FILTER ICON BUTTON DROPDOWN MENU (زر أيقونة خيارات القنوت) */}
      <div className="relative z-20 flex items-center justify-between bg-white dark:bg-[#141C18] p-3 px-5 rounded-2xl border border-slate-200 dark:border-[#D4AF37]/30 shadow-md">
        
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-emerald-200/70">تصفية القائمة:</span>
          <span className="text-xs font-bold text-[#0F382C] dark:text-[#D4AF37]">
            {currentCategoryObj.label} ({filteredVerses.length} آية)
          </span>
        </div>

        {/* SINGLE FILTER ICON BUTTON WITH DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-4 py-2 rounded-xl bg-[#0F382C] text-[#D4AF37] hover:bg-[#164D3C] text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
          >
            <Filter size={16} />
            <span>خيارات تصنيف القنوت</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* DROPDOWN POPUP MENU */}
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#18221C] rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-white/10 text-[11px] font-bold text-[#D4AF37]">
                اختر نوع الدعاء المطلوب:
              </div>

              {categoriesMap.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-right text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0F382C] text-[#D4AF37]'
                      : 'text-slate-800 dark:text-emerald-100 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    selectedCategory === cat.id ? 'bg-[#D4AF37] text-[#0F382C]' : 'bg-slate-100 dark:bg-white/10'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* VERSES CARDS LIST */}
      <div className="space-y-4">
        {filteredVerses.map((item) => (
          <div
            key={item.id}
            className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-[#141C18] border border-slate-200 dark:border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all space-y-4 relative"
          >
            {/* Header info */}
            <div className="flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-[#0F382C]/10 dark:bg-[#D4AF37]/15 text-[#0F382C] dark:text-[#D4AF37] font-bold border border-[#D4AF37]/30">
                {item.categoryLabel}
              </span>

              <span className="font-bold text-slate-500 dark:text-emerald-200/80">
                سورة {item.surahName} • آية {item.ayahNumber}
              </span>
            </div>

            {/* Uthmani Quranic Text */}
            <p className="font-quran-amiri text-2xl sm:text-3xl leading-relaxed text-[#0F382C] dark:text-[#FAF7F2] text-justify pt-1">
              ﴿ {item.text} ﴾
            </p>

            {/* Brief Explanation */}
            <div className="bg-[#0F382C]/5 dark:bg-[#D4AF37]/5 p-3 rounded-2xl text-xs text-slate-600 dark:text-emerald-100/90 leading-relaxed font-sans border border-[#D4AF37]/20">
              <strong className="text-[#0F382C] dark:text-[#D4AF37] ml-1">المناسبة والمعنى:</strong>
              {item.tafsirShort}
            </div>

            {/* Control Actions Row */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => onPlayAyah(item.surahId, item.ayahNumber)}
                className="px-4 py-2 rounded-xl bg-[#0F382C] text-[#D4AF37] hover:bg-[#164D3C] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Volume2 size={16} />
                <span>استماع بصوت المنشاوي</span>
              </button>

              <button
                onClick={() => handleCopy(item)}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-emerald-100 hover:bg-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedId === item.id ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                <span>{copiedId === item.id ? 'تم النسخ' : 'نسخ النص'}</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
