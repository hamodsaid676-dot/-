import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  app.use(express.json());

  // Initialize server-side Gemini client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
  });

  // API 1: Expand / Explore any specific ayah or search by topics
  app.post("/api/quran/explore", async (req, res) => {
    const { query } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "مفتاح API الخاص بـ Gemini غير متوفر. يرجى إضافته في الإعدادات." 
      });
    }

    if (!query) {
      return res.status(400).json({ error: "يرجى إدخال نص البحث أو الآية المراد استكشافها" });
    }

    console.log("Searching and parsing Quran query:", query);

    try {
      const prompt = `
        أنت "مستكشف الفرقان الذكي"، عالم تفسير متخصص في القرآن الكريم وعلومه ومفسر سني موثوق.
        المستخدم يبصم أو يبحث عن آية أو سورة أو مفهوم في القرآن الكريم. العبارة المدخلة هي: "${query}".
        مهمتك هي البحث واستخراج أو تفسير هذه الآية القرآنية أو تقديم الآية الأكثر علاقة بالمفهوم المدخل وتوفير النص القرآني الصحيح المضبوط بالتشكيل الكامل، ومعه ترجمته الإنجليزية، والتقاط تفسيرها الميسر الموثوق من تفسير ابن كثير أو السعدي، مع كتابة 3 نقاط تدبر وفوائد عملية تعزز الإيمان.
        
        يرجى الالتزام بالتعليمات التالية:
        1. إذا حدد المستخدم سورة ورقم آية (مثلا: البقرة آية 153)، استخرج تلك الآية بعينها.
        2. إذا حدد المستخدم موضوعاً (مثلاً: الصبر، الصلاة، التوكل)، فابحث عن آية بارزة تعبر عن هذا الموضوع، واستخرج بياناتها وتفسيرها ولطائفها.
        3. تأكد أن نص الآية "ayahText" مضبوط بالتشكيل القرآني الصحيح وتجنب أي أخطاء إملائية.
        4. وفر تفسيراً واضحاً ومبسطاً "tafsir" يعبر عن المعنى الحقيقي السليم.
        5. اكتب "reflections" مكونة من 3 فوائد ولطائف تربوية إيمانية عملية للمسلم في حياته العصرية بشكل رائع ومؤثر.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              surahName: { type: Type.STRING, description: "اسم السورة باللغة العربية مع المعرف 'سورة' (مثلاً: سورة البقرة)" },
              surahId: { type: Type.INTEGER, description: "رقم السورة في المصحف الشريف من 1 إلى 114" },
              ayahNumber: { type: Type.INTEGER, description: "رقم الآية المطلوبة" },
              ayahText: { type: Type.STRING, description: "النص القرآني الكامل والدقيق للآية مضبوطاً بالتشكيل التام" },
              translation: { type: Type.STRING, description: "ترجمة معاني الآية إلى اللغة الإنجليزية بشكل دقيق وموثوق" },
              tafsir: { type: Type.STRING, description: "التفسير الميسر والموثوق للآية باللغة العربية" },
              reflections: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "ثلاث فوائد ولطائف عملية وتدبرية إيمانية مستنبطة من الآية الشريفة"
              }
            },
            required: ["surahName", "surahId", "ayahNumber", "ayahText", "translation", "tafsir", "reflections"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("لم يتم استلام استجابة صحيحة من الذكاء الاصطناعي");
      }

      const quranResult = JSON.parse(responseText.trim());
      res.json(quranResult);
    } catch (e) {
      console.error("Explore API Error:", e);
      res.status(500).json({ error: "فشل استكشاف الآية وتفسيرها، يرجى المحاولة بصياغة أخرى أو تحديد السورة ورقم الآية بدقة." });
    }
  });

  // API 2: Chat scholar bot for counseling / guidance / answering questions
  app.post("/api/scholar/chat", async (req, res) => {
    const { messages } = req.body; // Array of { role: 'user'|'assistant', content: string }
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "مفتاح API الخاص بـ Gemini غير متوفر. يرجى إضافته في الإعدادات." 
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "سجل المحادثة مطلوب وصيغته غير صالحة" });
    }

    try {
      // Map frontend messages into Gemini contents format
      const mappedContents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const systemInstruction = `
        أنت مفسر وعالم مسلم متخصص في علوم القرآن بلقب "الشيخ مفسر الفرقان".
        تتحدث بوقار وعلم وأسلوب دافئ رحيم ومبسط مستوحى من كبار المفسرين.
        تجيب على تساؤلات المستخدم حول معاني الآيات، والقصص القرآنية، وأسباب النزول، وتساعده على تدبر وحفظ كتاب الله.
        - احرص دائماً على صياغة ردودك مقتبساً الآيات الشريفة ومقدماً معانيها وتفسيرها الموثوق.
        - شجع المستخدم على القراءة والتدبر والعمل بالقرآن وتعليمه.
        - ابتعد عن الجدليات الفقهية وعن التعقيدات التفسيرية، ركز على الجوانب الروحانية والإيمانية والعملية والأخلاقية.
        - رد بمسحة أدبية بليغة وجميلة باللغة العربية الفصحى.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: mappedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (e) {
      console.error("Scholar Chat API Error:", e);
      res.status(500).json({ error: "حدث خطأ أثناء المحادثة مع المفسر، يرجى إعادة المحاولة." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
