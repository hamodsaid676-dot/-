package com.alfurqan.quran

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
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontFamily
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

data class SurahItem(
    val id: Int,
    val name: String,
    val englishName: String,
    val versesCount: Int,
    val type: String,
    val sampleVerse: String
)

data class DhikrItem(
    val title: String,
    val text: String,
    val countTarget: Int,
    val virtue: String
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AlFurqanSingleScreenApp() {
    var selectedTab by remember { mutableStateOf(0) }
    var tasbeehCount by remember { mutableStateOf(0) }
    var tasbeehTarget by remember { mutableStateOf(33) }
    var activeDhikrName by remember { mutableStateOf("سبحان الله وبحمده") }
    var isSalawatActive by remember { mutableStateOf(true) }

    val context = LocalContext.current

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
                actions = {
                    IconButton(onClick = { /* Haptic or settings */ }) {
                        Icon(
                            imageVector = Icons.Default.Mosque,
                            contentDescription = "Mosque",
                            tint = GoldAccent
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
            // Prophet blessing banner
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(12.dp),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = LightEmerald)
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(12.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(
                            imageVector = Icons.Default.VolumeUp,
                            contentDescription = "تذكير الصلاة",
                            tint = GoldAccent,
                            modifier = Modifier.padding(end = 8.dp)
                        )
                        Column {
                            Text(
                                text = "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَآلِ مُحَمَّدٍ",
                                color = Color.White,
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                            Text(
                                text = "تذكير الصلاة على النبي وآله يعمل تلقائياً",
                                color = GoldAccent,
                                fontSize = 11.sp
                            )
                        }
                    }
                    Switch(
                        checked = isSalawatActive,
                        onCheckedChange = { isSalawatActive = it },
                        colors = SwitchDefaults.colors(
                            checkedThumbColor = EmeraldGreen,
                            checkedTrackColor = GoldAccent
                        )
                    )
                }
            }

            // Screen Content based on Selected Tab
            when (selectedTab) {
                0 -> QuranView()
                1 -> TasbeehView(
                    count = tasbeehCount,
                    target = tasbeehTarget,
                    dhikrName = activeDhikrName,
                    onIncrement = {
                        tasbeehCount++
                        val vibrator = context.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
                        vibrator?.vibrate(VibrationEffect.createOneShot(30, VibrationEffect.DEFAULT_AMPLITUDE))
                    },
                    onReset = { tasbeehCount = 0 },
                    onSelectDhikr = { name, trg ->
                        activeDhikrName = name
                        tasbeehTarget = trg
                        tasbeehCount = 0
                    }
                )
                2 -> QunutView()
            }
        }
    }
}

@Composable
fun QuranView() {
    val surahs = listOf(
        SurahItem(1, "الفاتحة", "Al-Fatiha", 7, "مكية", "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"),
        SurahItem(36, "يس", "Ya-Sin", 83, "مكية", "يس ﴿١﴾ وَالْقُرْآنِ الْحَكِيمِ ﴿٢﴾ إِنَّكَ لَمِنَ الْمُرْسَلِينَ"),
        SurahItem(67, "الملك", "Al-Mulk", 30, "مكية", "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ"),
        SurahItem(18, "الكهف", "Al-Kahf", 110, "مكية", "الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا"),
        SurahItem(55, "الرحمن", "Ar-Rahman", 78, "مدنية", "الرَّحْمَٰنُ ﴿١﴾ عَلَّمَ الْقُرْآنَ ﴿٢﴾ خَلَقَ الْإِنسَانَ"),
        SurahItem(56, "الواقعة", "Al-Waqi'a", 96, "مكية", "إِذَا وَقَعَتِ الْوَاقِعَةُ ﴿١﴾ لَيْسَ لِوَقْعَتِهَا كَاذِبَةٌ"),
        SurahItem(112, "الإخلاص", "Al-Ikhlas", 4, "مكية", "قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ"),
        SurahItem(113, "الفلق", "Al-Falaq", 5, "مكية", "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ"),
        SurahItem(114, "الناس", "An-Nas", 6, "مكية", "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ")
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 12.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        items(surahs) { surah ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Box(
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(EmeraldGreen),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = "${surah.id}",
                                    color = GoldAccent,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 12.sp
                                )
                            }
                            Spacer(modifier = Modifier.width(12.dp))
                            Column {
                                Text(
                                    text = "سُورَةُ ${surah.name}",
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 18.sp,
                                    color = EmeraldGreen
                                )
                                Text(
                                    text = "${surah.type} • ${surah.versesCount} آية",
                                    fontSize = 12.sp,
                                    color = Color.Gray
                                )
                            }
                        }

                        IconButton(onClick = { /* Play audio */ }) {
                            Icon(
                                imageVector = Icons.Default.PlayCircle,
                                contentDescription = "قراءة صوتیة",
                                tint = GoldAccent,
                                modifier = Modifier.size(32.dp)
                            )
                        }
                    }

                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = surah.sampleVerse,
                        fontSize = 16.sp,
                        color = DarkText,
                        textAlign = TextAlign.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(ParchmentBg, RoundedCornerShape(8.dp))
                            .padding(10.dp)
                    )
                }
            }
        }
    }
}

@Composable
fun TasbeehView(
    count: Int,
    target: Int,
    dhikrName: String,
    onIncrement: () -> Unit,
    onReset: () -> Unit,
    onSelectDhikr: (String, Int) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        // Selection chips
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            FilterChip(
                selected = dhikrName == "سبحان الله وبحمده",
                onClick = { onSelectDhikr("سبحان الله وبحمده", 33) },
                label = { Text("التسبيح") }
            )
            FilterChip(
                selected = dhikrName == "الحمد لله رب العالمين",
                onClick = { onSelectDhikr("الحمد لله رب العالمين", 33) },
                label = { Text("التحميد") }
            )
            FilterChip(
                selected = dhikrName == "الله أكبر",
                onClick = { onSelectDhikr("الله أكبر", 34) },
                label = { Text("التكبير") }
            )
        }

        Text(
            text = dhikrName,
            fontSize = 22.sp,
            fontWeight = FontWeight.Bold,
            color = EmeraldGreen,
            textAlign = TextAlign.Center
        )

        // Counter Ring
        Box(
            modifier = Modifier
                .size(200.dp)
                .clip(CircleShape)
                .background(
                    Brush.radialGradient(
                        colors = listOf(LightEmerald, EmeraldGreen)
                    )
                )
                .border(6.dp, GoldAccent, CircleShape)
                .clickable { onIncrement() },
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "$count",
                    fontSize = 52.sp,
                    fontWeight = FontWeight.Bold,
                    color = GoldAccent
                )
                Text(
                    text = "الهدف: $target",
                    fontSize = 14.sp,
                    color = Color.White.copy(alpha = 0.8f)
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = "اضغط للتسبيح",
                    fontSize = 12.sp,
                    color = SoftGold
                )
            }
        }

        Row(
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            OutlinedButton(
                onClick = onReset,
                colors = ButtonDefaults.outlinedButtonColors(contentColor = EmeraldGreen)
            ) {
                Icon(Icons.Default.Refresh, contentDescription = "إعادة ضبط")
                Spacer(modifier = Modifier.width(4.dp))
                Text("إعادة ضبط")
            }
        }
    }
}

@Composable
fun QunutView() {
    val qunutList = listOf(
        "اللَّهُمَّ اهْدِنَا فِيمَنْ هَدَيْتَ، وَعَافِنَا فِيمَنْ عَافَيْتَ، وَتَوَلَّنَا فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لَنَا فِيمَا أَعْطَيْتَ، وَقِنَا شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، وَإِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ.",
        "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
        "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ وَلَا نَكْفُرُكَ، وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ."
    )

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(
                text = "آيات وأدعية القنوت المأثورة",
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
                color = EmeraldGreen
            )
        }
        items(qunutList) { prayer ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = prayer,
                        fontSize = 16.sp,
                        lineHeight = 26.sp,
                        color = DarkText,
                        textAlign = TextAlign.Right
                    )
                }
            }
        }
    }
}
