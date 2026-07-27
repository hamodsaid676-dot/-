import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:archive/archive.dart';
import 'package:path_provider/path_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AlFurqanApp());
}

class AlFurqanApp extends StatelessWidget {
  const AlFurqanApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'تطبيق الفرقان',
      debugShowCheckedModeBanner: false,
      locale: const Locale('ar', 'AE'),
      supportedLocales: const [
        Locale('ar', 'AE'),
      ],
      theme: ThemeData(
        fontFamily: 'Cairo',
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF105D42),
          primary: const Color(0xFF105D42),
          secondary: const Color(0xFFC5A059),
          surface: const Color(0xFFFCFBF7),
          background: const Color(0xFFFAF8F5),
        ),
      ),
      home: const TafsirHomeScreen(),
    );
  }
}

class TafsirHomeScreen extends StatefulWidget {
  const TafsirHomeScreen({super.key});

  @override
  State<TafsirHomeScreen> createState() => _TafsirHomeScreenState();
}

class _TafsirHomeScreenState extends State<TafsirHomeScreen> {
  // Database map containing JSON structures
  Map<String, dynamic> _tafsirDb = {};
  List<String> _surahList = [];
  
  bool _isLoading = true;
  String _loadingMessage = "انتظر جاري تشغيل التطبيق...";
  
  String? _selectedSurah;
  final TextEditingController _ayahController = TextEditingController(text: "1");
  String _displayedTafsir = "";
  double _fontSize = 18.0;

  @override
  void initState() {
    super.initState();
    _loadAndDecompressTafsir();
  }

  @override
  void dispose() {
    _ayahController.dispose();
    super.dispose();
  }

  // Load gzip file, unpack, and cache to locally saved documents directory
  Future<void> _loadAndDecompressTafsir() async {
    try {
      setState(() {
        _isLoading = true;
        _loadingMessage = "جاري التحقق من قواعد البيانات المحفوظة...";
      });

      final directory = await getApplicationDocumentsDirectory();
      final cacheFile = File('${directory.path}/tafsir_cache.json');

      if (await cacheFile.exists()) {
        setState(() {
          _loadingMessage = "جاري تعبئة بيانات تفاسير التيسير...";
        });
        final content = await cacheFile.readAsString();
        _tafsirDb = json.decode(content);
      } else {
        setState(() {
          _loadingMessage = "أول تشغيل: جاري قراءة ملف tafsir.json.gz...";
        });

        // Load packed .gz from Assets directory
        final ByteData assetBytes = await rootBundle.load('assets/tafsir.json.gz');
        final List<int> compressedBytes = assetBytes.buffer.asUint8List();

        setState(() {
          _loadingMessage = "جاري فك ضغط 3.2MB برمجياً وبكفاءة...";
        });

        // Decompress using gzip decoder
        final gZipDecoder = GZipDecoder();
        final List<int> decompressedBytes = gZipDecoder.decodeBytes(compressedBytes);

        setState(() {
          _loadingMessage = "جاري بناء هياكل الفهرسة الداخلية...";
        });

        // Parse JSON content from uncompressed bytes
        final jsonText = utf8.decode(decompressedBytes);
        _tafsirDb = json.decode(jsonText);

        // Save content to local path for future instant loads
        await cacheFile.writeAsString(jsonText);
      }

      // Convert keys to string array
      _surahList = _tafsirDb.keys.toList();

      setState(() {
        _isLoading = false;
        if (_surahList.isNotEmpty) {
          _selectedSurah = _surahList.first;
        }
      });
    } catch (e, stacktrace) {
      if (kDebugMode) {
        print("Error details: $e\n$stacktrace");
      }
      setState(() {
        _isLoading = true;
        _loadingMessage = "حدث خطأ أثناء فك ملف التفسير:\n$e\nتأكد من إرفاق ملف tafsir.json.gz في مجلد assets بنجاح.";
      });
    }
  }

  // Retrieve tafsir text from selected Surah and input Ayah number
  void _searchAndDisplayTafsir() {
    FocusScope.of(context).unfocus();
    
    if (_selectedSurah == null) {
      _showSnackbar("يرجى تحديد السورة من القائمة المتاحة");
      return;
    }

    final ayahNumberInput = _ayahController.text.trim();
    if (ayahNumberInput.isEmpty) {
      _showSnackbar("يرجى إدخال رقم آية صحيح");
      return;
    }

    final Map<String, dynamic>? surahContent = _tafsirDb[_selectedSurah];
    if (surahContent == null) {
      _showSnackbar("بيانات هذه السورة غير مضافة");
      return;
    }

    final dynamic tafsirText = surahContent[ayahNumberInput];
    if (tafsirText != null) {
      setState(() {
        _displayedTafsir = tafsirText.toString();
      });
    } else {
      // Find range of Ayahs
      final keys = surahContent.keys.map(int.tryParse).whereType<int>().toList();
      keys.sort();
      final maxAyah = keys.isNotEmpty ? keys.last : 0;
      
      setState(() {
        _displayedTafsir = "";
      });

      _showSnackbar(
        "تنبيه: الآية رقم $ayahNumberInput غير متوفرة في $_selectedSurah.\n(المتوفر من 1 إلى $maxAyah)",
      );
    }
  }

  void _showSnackbar(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg, textDirection: TextDirection.rtl, style: const TextStyle(fontFamily: 'Cairo')),
        backgroundColor: Colors.amber[800],
        duration: const Duration(seconds: 4),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'تطبيق الفُـرقَان لعلوم التفسير',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: Color(0xFFFCFBF7),
          ),
        ),
        centerTitle: true,
        backgroundColor: const Color(0xFF105D42),
        elevation: 4,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh, color: Colors.white),
            tooltip: 'إعادة تهيئة مخزن الملف وبنائه',
            onPressed: () async {
              final directory = await getApplicationDocumentsDirectory();
              final cacheFile = File('${directory.path}/tafsir_cache.json');
              if (await cacheFile.exists()) {
                await cacheFile.delete();
              }
              _loadAndDecompressTafsir();
            },
          )
        ],
      ),
      body: _isLoading
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const CircularProgressIndicator(
                      color: Color(0xFF105D42),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      _loadingMessage,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF105D42),
                      ),
                    ),
                  ],
                ),
              ),
            )
          : SafeArea(
              child: Directionality(
                textDirection: TextDirection.rtl,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(18.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Traditional Header Ornament Text Card
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: const Color(0xFF105D42).withOpacity(0.08),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFF105D42).withOpacity(0.12)),
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: const Color(0xFF105D42),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: const Icon(Icons.book, color: Color(0xFFC5A059), size: 24),
                            ),
                            const SizedBox(width: 14),
                            const Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    "تفسير السيد العلامة بدر الدين الحوثي",
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                      color: Color(0xFF105D42),
                                    ),
                                  ),
                                  SizedBox(height: 2),
                                  Text(
                                    "كتاب التيسير في التفسير — بدون نت 100٪",
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: Colors.grey,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Surah Dropdown selector
                      const Text(
                        "اختر السورة المباركة:",
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey),
                      ),
                      const SizedBox(height: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            value: _selectedSurah,
                            isExpanded: true,
                            icon: const Icon(Icons.keyboard_arrow_down, color: Color(0xFF105D42)),
                            onChanged: (newValue) {
                              setState(() {
                                _selectedSurah = newValue;
                              });
                            },
                            items: _surahList.map<DropdownMenuItem<String>>((String value) {
                              return DropdownMenuItem<String>(
                                value: value,
                                child: Text(
                                  value,
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                                ),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),

                      // Ayah input TextField
                      const Text(
                        "أدخل رقم الآية الكريمة:",
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey),
                      ),
                      const SizedBox(height: 6),
                      TextField(
                        controller: _ayahController,
                        keyboardType: TextInputType.number,
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, letterSpacing: 1.2),
                        decoration: InputDecoration(
                          hintText: "أدخل رقم الآية هنا...",
                          hintStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.normal),
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(14),
                            borderSide: const BorderSide(color: Color(0xFF105D42), width: 1.5),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Trigger View Tafsir button
                      ElevatedButton.icon(
                        icon: const Icon(Icons.menu_book, size: 18),
                        label: const Text(
                          "عرض التفسير الموقر",
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        onPressed: _searchAndDisplayTafsir,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF105D42),
                          foregroundColor: const Color(0xFFFCFBF7),
                          shadowColor: const Color(0xFF105D42).withOpacity(0.3),
                          elevation: 3,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),

                      // Slider with user friendly styling for elderly custom scaling
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: Colors.grey.shade200),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.between,
                              children: [
                                const Text(
                                  "حجم خط القراءة والبيان:",
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                    color: Color(0xFF105D42),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF105D42).withOpacity(0.08),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    "${_fontSize.toInt()} نقطة",
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12,
                                      color: Color(0xFF105D42),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Row(
                              children: [
                                const Text("أ", style: TextStyle(fontSize: 12, color: Colors.grey, fontWeight: FontWeight.bold)),
                                Expanded(
                                  child: Slider(
                                    value: _fontSize,
                                    min: 14.0,
                                    max: 32.0,
                                    divisions: 18,
                                    activeColor: const Color(0xFF105D42),
                                    inactiveColor: const Color(0xFF105D42).withOpacity(0.12),
                                    onChanged: (double newValue) {
                                      setState(() {
                                        _fontSize = newValue;
                                      });
                                    },
                                  ),
                                ),
                                const Text("أ", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF105D42))),
                              ],
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),

                      // Large Tafsir Output box
                      const Text(
                        "بيان وتفسير التيسير للعلامة بدر الدين الحوثي:",
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.grey),
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.all(22),
                        minHeight: 250,
                        decoration: BoxDecoration(
                          color: const Color(0xFFFCFBF7),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: const Color(0xFFC5A059).withOpacity(0.32)),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.02),
                              blurRadius: 10,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        child: _displayedTafsir.isNotEmpty
                            ? Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(Icons.bookmark, color: Color(0xFFC5A059), size: 16),
                                      const SizedBox(width: 6),
                                      Text(
                                        "آية $_selectedSurah المباركة [$_selectedSurah - آية ${_ayahController.text}]:",
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 12,
                                          color: Color(0xFFC5A059),
                                        ),
                                      ),
                                    ],
                                  ),
                                  const Divider(height: 24, thickness: 0.5),
                                  Text(
                                    _displayedTafsir,
                                    style: TextStyle(
                                      fontSize: _fontSize,
                                      height: 1.8,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black87,
                                    ),
                                    textAlign: TextAlign.justify,
                                  ),
                                ],
                              )
                            : Center(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.menu_book,
                                      size: 38,
                                      color: const Color(0xFFC5A059).withOpacity(0.4),
                                    ),
                                    const SizedBox(height: 12),
                                    const Text(
                                      "اضبط خيارات السورة والآية، ثم انقر على\n«عرض التفسير الموقر» لتظهر النتائج هنا.",
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                        color: Colors.grey,
                                        fontSize: 12,
                                        height: 1.5,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                      ),
                      const SizedBox(height: 32),
                    ],
                  ),
                ),
              ),
            ),
    );
  }
}
