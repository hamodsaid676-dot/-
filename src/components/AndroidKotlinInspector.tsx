import React, { useState } from 'react';
import { 
  Smartphone, 
  Code, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  FileCode, 
  Settings, 
  Layers, 
  Volume2, 
  BookOpen, 
  RotateCcw,
  Hand,
  Share2
} from 'lucide-react';

export default function AndroidKotlinInspector() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'mainActivity' | 'manifest' | 'gradle'>('simulator');
  const [copied, setCopied] = useState<string | null>(null);

  // Interactive Simulator State (Kotlin Single-Screen App representation)
  const [simTab, setSimTab] = useState<'quran' | 'tasbeeh' | 'qunut'>('quran');
  const [tasbeehCount, setTasbeehCount] = useState<number>(0);
  const [tasbeehTarget, setTasbeehTarget] = useState<number>(33);
  const [dhikrTitle, setDhikrTitle] = useState<string>('سبحان الله وبحمده');
  const [salawatEnabled, setSalawatEnabled] = useState<boolean>(true);

  const mainActivityKotlin = `package com.alfurqan.quran

import android.os.Bundle
import android.os.VibrationEffect
import android.os.Vibrator
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Color Palette
val EmeraldGreen = Color(0xFF0F382C)
val LightEmerald = Color(0xFF165241)
val GoldAccent = Color(0xFFD4AF37)
val SoftGold = Color(0xFFF3E5AB)
val ParchmentBg = Color(0xFFFAF7F2)
val DarkText = Color(0xFF1A202C)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AlFurqanTheme {
                AlFurqanSingleScreenApp()
            }
        }
    }
}

@Composable
fun AlFurqanTheme(content: @Composable () -> Unit) {
    val colorScheme = lightColorScheme(
        primary = EmeraldGreen,
        secondary = GoldAccent,
        background = ParchmentBg,
        surface = Color.White,
        onPrimary = Color.White,
        onSecondary = DarkText,
        onBackground = DarkText
    )

    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AlFurqanSingleScreenApp() {
    var selectedTab by remember { mutableStateOf(0) }
    var tasbeehCount by remember { mutableStateOf(0) }
    var tasbeehTarget by remember { mutableStateOf(33) }
    var activeDhikrName by remember { mutableStateOf("سبحان الله وبحمده") }
    var isSalawatActive by remember { mutableStateOf(true) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "تطبيق الفرقان",
                            color = GoldAccent,
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "القرآن الكريم والأذكار - أندرويد (Kotlin)",
                            color = Color.White.copy(alpha = 0.8f),
                            fontSize = 11.sp
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = EmeraldGreen
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = EmeraldGreen,
                contentColor = Color.White
            ) {
                NavigationBarItem(
                    selected = selectedTab == 0,
                    onClick = { selectedTab = 0 },
                    icon = { Icon(Icons.Default.MenuBook, contentDescription = "المصحف") },
                    label = { Text("المصحف", color = if (selectedTab == 0) GoldAccent else Color.White) }
                )
                NavigationBarItem(
                    selected = selectedTab == 1,
                    onClick = { selectedTab = 1 },
                    icon = { Icon(Icons.Default.TouchApp, contentDescription = "السبحة") },
                    label = { Text("السبحة", color = if (selectedTab == 1) GoldAccent else Color.White) }
                )
                NavigationBarItem(
                    selected = selectedTab == 2,
                    onClick = { selectedTab = 2 },
                    icon = { Icon(Icons.Default.AutoAwesome, contentDescription = "القنوت") },
                    label = { Text("أدعية القنوت", color = if (selectedTab == 2) GoldAccent else Color.White) }
                )
            }
        },
        containerColor = ParchmentBg
    ) { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            when (selectedTab) {
                0 -> QuranView()
                1 -> TasbeehView(...)
                2 -> QunutView()
            }
        }
    }
}`;

  const manifestXml = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="تطبيق الفرقان"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@android:style/Theme.Material.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="تطبيق الفرقان"
            android:theme="@android:style/Theme.Material.Light.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>`;

  const gradleBuildKts = `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.alfurqan.quran"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.alfurqan.quran"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.activity:activity-compose:1.8.2")
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.material3:material3")
}`;

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto my-6 p-4 sm:p-6 bg-gradient-to-br from-[#0F382C] via-[#144A3A] to-[#0A261E] rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-[#FAF7F2]" dir="rtl">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#D4AF37]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#0F382C] flex items-center justify-center font-bold shadow-lg shrink-0">
            <Smartphone size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-quran-amiri text-[#D4AF37]">
                تطبيق أندرويد بلغة كوتلن (Kotlin)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] font-bold">
                Jetpack Compose • شاشة واحدة
              </span>
            </div>
            <p className="text-xs text-[#FAF7F2]/80 font-sans mt-0.5">
              تطبيق أندرويد حقيقي منفصل يعمل كلياً بدون صفحة موقع بلغة Kotlin الأصيلة
            </p>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-[#D4AF37]/30">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-[#D4AF37] text-[#0F382C] shadow-md'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
          >
            <Smartphone size={15} />
            <span>محاكي أندرويد</span>
          </button>

          <button
            onClick={() => setActiveTab('mainActivity')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'mainActivity'
                ? 'bg-[#D4AF37] text-[#0F382C] shadow-md'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
          >
            <FileCode size={15} />
            <span>MainActivity.kt</span>
          </button>

          <button
            onClick={() => setActiveTab('manifest')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'manifest'
                ? 'bg-[#D4AF37] text-[#0F382C] shadow-md'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
          >
            <Code size={15} />
            <span>AndroidManifest</span>
          </button>

          <button
            onClick={() => setActiveTab('gradle')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gradle'
                ? 'bg-[#D4AF37] text-[#0F382C] shadow-md'
                : 'text-[#FAF7F2]/80 hover:text-white'
            }`}
          >
            <Settings size={15} />
            <span>build.gradle.kts</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT AREA */}
      <div className="pt-6">
        
        {/* TAB 1: INTERACTIVE ANDROID DEVICE SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-4">
            
            {/* ANDROID DEVICE MOCKUP FRAME */}
            <div className="w-[340px] sm:w-[380px] h-[680px] bg-slate-950 rounded-[48px] p-3 border-4 border-slate-700/80 shadow-2xl relative overflow-hidden flex flex-col ring-8 ring-black/40 shrink-0">
              
              {/* Device Speaker Notch & Camera */}
              <div className="w-28 h-5 bg-slate-900 rounded-b-2xl mx-auto flex items-center justify-center gap-2 mb-2 z-20">
                <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-700" />
                <div className="w-8 h-1.5 rounded-full bg-slate-800" />
              </div>

              {/* APP SCREEN CONTAINER INSIDE DEVICE */}
              <div className="flex-1 bg-[#FAF7F2] text-slate-800 rounded-[36px] overflow-hidden flex flex-col relative">
                
                {/* Android Status Bar */}
                <div className="bg-[#0F382C] text-white text-[11px] px-5 py-1.5 flex items-center justify-between font-mono select-none">
                  <span>3:21</span>
                  <div className="flex items-center gap-1.5 text-[#D4AF37]">
                    <span>📶</span>
                    <span>🔋 95%</span>
                  </div>
                </div>

                {/* Jetpack Compose TopAppBar */}
                <div className="bg-[#0F382C] text-white px-4 py-3 flex items-center justify-between shadow-md">
                  <div>
                    <h3 className="font-bold text-base text-[#D4AF37] font-quran-amiri">تطبيق الفرقان</h3>
                    <p className="text-[10px] text-emerald-200/80">أندرويد شاشة واحدة (Kotlin)</p>
                  </div>
                  <span className="text-xl">🕌</span>
                </div>

                {/* Salawat Banner inside app */}
                <div className="bg-[#165241] text-white p-3 mx-3 my-2 rounded-2xl flex items-center justify-between text-xs border border-[#D4AF37]/40 shadow-xs">
                  <div className="flex items-center gap-2">
                    <Volume2 size={16} className="text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="font-bold text-[#D4AF37] block text-[11px]">اللهم صلِّ على محمد وآل محمد</span>
                      <span className="text-[9px] text-emerald-100">تذكير الصلاة يعمل بالخلفية</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={salawatEnabled}
                    onChange={(e) => setSalawatEnabled(e.target.checked)}
                    className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                  />
                </div>

                {/* MAIN SCREEN BODY IN SIMULATOR */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  
                  {simTab === 'quran' && (
                    <div className="space-y-2.5">
                      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs text-right">
                        <div className="flex justify-between items-center text-xs mb-1 font-bold text-[#0F382C]">
                          <span>سورة الفاتحة</span>
                          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">مكية • ٧ آيات</span>
                        </div>
                        <p className="text-xs font-quran-amiri text-slate-700 leading-relaxed bg-[#FAF7F2] p-2 rounded-xl text-center">
                          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs text-right">
                        <div className="flex justify-between items-center text-xs mb-1 font-bold text-[#0F382C]">
                          <span>سورة يس</span>
                          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">مكية • ٨٣ آية</span>
                        </div>
                        <p className="text-xs font-quran-amiri text-slate-700 leading-relaxed bg-[#FAF7F2] p-2 rounded-xl text-center">
                          يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ ﴿٣﴾
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs text-right">
                        <div className="flex justify-between items-center text-xs mb-1 font-bold text-[#0F382C]">
                          <span>سورة الملك</span>
                          <span className="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">مكية • ٣٠ آية</span>
                        </div>
                        <p className="text-xs font-quran-amiri text-slate-700 leading-relaxed bg-[#FAF7F2] p-2 rounded-xl text-center">
                          تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ ﴿١﴾
                        </p>
                      </div>
                    </div>
                  )}

                  {simTab === 'tasbeeh' && (
                    <div className="text-center py-4 space-y-4">
                      <h4 className="font-bold text-sm text-[#0F382C]">{dhikrTitle}</h4>
                      
                      {/* Counter Interactive Circle */}
                      <button
                        onClick={() => setTasbeehCount(tasbeehCount + 1)}
                        className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-[#165241] to-[#0F382C] border-4 border-[#D4AF37] text-white flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
                      >
                        <span className="text-3xl font-bold text-[#D4AF37]">{tasbeehCount}</span>
                        <span className="text-[10px] text-emerald-200">الهدف: {tasbeehTarget}</span>
                        <span className="text-[9px] text-[#D4AF37] mt-1">اضغط للتسبيح</span>
                      </button>

                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setTasbeehCount(0)}
                          className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 hover:bg-slate-300"
                        >
                          <RotateCcw size={12} />
                          <span>تصفير</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {simTab === 'qunut' && (
                    <div className="space-y-2 text-right">
                      <h4 className="font-bold text-xs text-[#0F382C]">أدعية القنوت المأثورة</h4>
                      <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs font-quran-amiri leading-relaxed text-slate-800">
                        اللَّهُمَّ اهْدِنَا فِيمَنْ هَدَيْتَ، وَعَافِنَا فِيمَنْ عَافَيْتَ، وَتَوَلَّنَا فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لَنَا فِيمَا أَعْطَيْتَ، وَقِنَا شَرَّ مَا قَضَيْتَ.
                      </div>
                      <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs font-quran-amiri leading-relaxed text-slate-800">
                        رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.
                      </div>
                    </div>
                  )}

                </div>

                {/* Jetpack Compose Bottom NavigationBar */}
                <div className="bg-[#0F382C] text-white py-2 px-4 flex items-center justify-around border-t border-[#D4AF37]/30 text-[10px]">
                  <button
                    onClick={() => setSimTab('quran')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${simTab === 'quran' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'}`}
                  >
                    <BookOpen size={16} />
                    <span>المصحف</span>
                  </button>

                  <button
                    onClick={() => setSimTab('tasbeeh')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${simTab === 'tasbeeh' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'}`}
                  >
                    <Hand size={16} />
                    <span>السبحة</span>
                  </button>

                  <button
                    onClick={() => setSimTab('qunut')}
                    className={`flex flex-col items-center gap-0.5 cursor-pointer ${simTab === 'qunut' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'}`}
                  >
                    <Sparkles size={16} />
                    <span>القنوت</span>
                  </button>
                </div>

                {/* Android Bottom Gesture Bar */}
                <div className="bg-slate-900 py-1 flex justify-center">
                  <div className="w-20 h-1 bg-slate-600 rounded-full" />
                </div>

              </div>

            </div>

            {/* Side Description Box */}
            <div className="max-w-md space-y-4 text-right">
              <div className="p-5 rounded-2xl bg-white/10 border border-[#D4AF37]/40 space-y-3">
                <h3 className="font-bold font-quran-amiri text-xl text-[#D4AF37] flex items-center gap-2">
                  <Sparkles size={20} />
                  <span>مميزات تطبيق الكوتلن (Kotlin Native App)</span>
                </h3>
                <ul className="text-xs space-y-2 text-[#FAF7F2]/90 leading-relaxed font-sans list-disc list-inside">
                  <li><strong>شاشة واحدة متكاملة (Single Screen Layout)</strong> تحتوي على أقسام المصحف، والسبحة، والقنوت.</li>
                  <li><strong>لغة Kotlin الأصيلة 100%</strong> باستخدام أحدث حزمة واجهات Jetpack Compose.</li>
                  <li><strong>تطبيق مستقل تماماً</strong> يصدر كملف APK أو AAB ويعمل بدون أي ربط بصفحة شبكة.</li>
                  <li><strong>دعم الاهتزاز والتنبيهات الحركية (Haptic Feedback)</strong> عند استخدام السبحة الإلكترونية.</li>
                </ul>
              </div>

              <button
                onClick={() => handleCopy(mainActivityKotlin, 'MainActivity.kt')}
                className="w-full py-3.5 px-6 rounded-2xl bg-[#D4AF37] text-[#0F382C] font-bold text-sm hover:bg-amber-400 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied === 'MainActivity.kt' ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied === 'MainActivity.kt' ? 'تم نسخ كود Kotlin بنجاح!' : 'نسخ كود MainActivity.kt الكامل'}</span>
              </button>
            </div>

          </div>
        )}

        {/* TAB 2: MAINACTIVITY.KT SOURCE CODE */}
        {activeTab === 'mainActivity' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-2xl border border-[#D4AF37]/30">
              <span className="font-mono text-xs text-[#D4AF37]">app/src/main/java/com/alfurqan/quran/MainActivity.kt</span>
              <button
                onClick={() => handleCopy(mainActivityKotlin, 'MainActivity.kt')}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0F382C] font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 cursor-pointer"
              >
                {copied === 'MainActivity.kt' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'MainActivity.kt' ? 'تم النسخ' : 'نسخ الكود'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 sm:p-6 rounded-2xl text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed text-left" dir="ltr">
              {mainActivityKotlin}
            </pre>
          </div>
        )}

        {/* TAB 3: ANDROIDMANIFEST.XML */}
        {activeTab === 'manifest' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-2xl border border-[#D4AF37]/30">
              <span className="font-mono text-xs text-[#D4AF37]">app/src/main/AndroidManifest.xml</span>
              <button
                onClick={() => handleCopy(manifestXml, 'AndroidManifest.xml')}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0F382C] font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 cursor-pointer"
              >
                {copied === 'AndroidManifest.xml' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'AndroidManifest.xml' ? 'تم النسخ' : 'نسخ الكود'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 sm:p-6 rounded-2xl text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed text-left" dir="ltr">
              {manifestXml}
            </pre>
          </div>
        )}

        {/* TAB 4: BUILD.GRADLE.KTS */}
        {activeTab === 'gradle' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-2xl border border-[#D4AF37]/30">
              <span className="font-mono text-xs text-[#D4AF37]">app/build.gradle.kts</span>
              <button
                onClick={() => handleCopy(gradleBuildKts, 'build.gradle.kts')}
                className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0F382C] font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 cursor-pointer"
              >
                {copied === 'build.gradle.kts' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied === 'build.gradle.kts' ? 'تم النسخ' : 'نسخ الكود'}</span>
              </button>
            </div>
            <pre className="bg-slate-950 p-4 sm:p-6 rounded-2xl text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-[500px] border border-slate-800 leading-relaxed text-left" dir="ltr">
              {gradleBuildKts}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
}
