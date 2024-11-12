const suras = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف",
    "الأنفال", "التوبة", "يونس", "هود", "يوسف", "الرعد", "إبراهيم", "الحجر",
    "النحل", "الإسراء", "الكهف", "مريم", "طه", "الأنبياء", "الحج", "المؤمنون",
    "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم", "لقمان",
    "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
    "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح",
    "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة",
    "الحديد", "المجادلة", "الحشر", "الممتحنة", "الصف", "الجمعة", "المنافقون",
    "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
    "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ",
    "النازعات", "عبس", "التكوير", "الإنفطار", "المطففين", "الإنشقاق", "البروج",
    "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد", "الشمس", "الليل", "الضحى",
    "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات", "القارعة",
    "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون",
    "النصر", "المسد", "الإخلاص", "الفلق", "الناس"
];

const suraList = document.getElementById('sura-list');
const ayaContainer = document.getElementById('aya-container');
const interpretationContent = document.getElementById('interpretation-content');
let audioPlayer = new Audio(); // مشغل الصوت

// إنشاء قائمة السور
suras.forEach((sura, index) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = sura;
    link.href = "#";
    link.addEventListener('click', () => loadSura(index + 1, sura));
    listItem.appendChild(link);
    suraList.appendChild(listItem);
});

// تحميل السورة المختارة
function loadSura(suraNumber, suraName) {
    document.getElementById('sura-name').textContent = suraName;
    ayaContainer.innerHTML = ""; // مسح محتوى الآيات

    // جلب آيات السورة ومعانيها
    fetch(`https://api.alquran.cloud/v1/surah/${suraNumber}`)
        .then(response => response.json())
        .then(data => {
            data.data.ayahs.forEach(ayah => {
                const ayaElement = document.createElement('p');
                ayaElement.textContent = ayah.text;
                ayaElement.className = 'ayah';
                ayaElement.addEventListener('click', () => {
                    loadInterpretation(ayah.number);
                    playAudio(suraNumber, ayah.numberInSurah); // تشغيل صوت الآية
                });
                ayaContainer.appendChild(ayaElement);
            });
        });
}

// تحميل المعنى لآية معينة
function loadInterpretation(ayahNumber) {
    fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/ar.muyassar`)
        .then(response => response.json())
        .then(data => {
            interpretationContent.textContent = data.data.text;
        });
}

// تشغيل صوت الشيخ محمود خليل الحصري
function playAudio(suraNumber, ayaNumber) {
    const audioUrl = `https://everyayah.com/data/Mahmood_AlHusary_128kbps/${suraNumber.toString().padStart(3, '0')}${ayaNumber.toString().padStart(3, '0')}.mp3`;
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}