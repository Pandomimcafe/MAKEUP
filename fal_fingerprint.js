// Kullanıcıyı tanımlamak için fingerprint değişkeni
let fingerprint = null;

// Gösterilecek fal cümleleri
let fallar = [
  "🧿 Bugün sezgilerine güven, seni doğru yola götürecek.",
  "🌙 Geçmişin yüklerinden sıyrıldıkça ruhun hafifleyecek.",
  "🔥 Kalbindeki tutku, seni hiç beklemediğin bir yere taşıyabilir.",
  "🌸 Yeni başlangıçlar için doğru zamandasın.",
  "☕ Bir dost sohbeti sana ilaç gibi gelecek.",
  "💫 Hayat, sana beklenmedik güzellikler hazırlıyor.",
  "🦋 Küçük bir değişiklik, büyük bir huzur getirebilir."
];

// Fal metnini sayfada göster
function showFal(text) {
  const box = document.getElementById("falText");
  if (box) box.innerText = text;
}

// Fal verisini Sheet.best'e gönder
function sendFalToSheet(fal) {
  fetch("https://api.sheetbest.com/sheets/057a0181-a151-48c6-98f9-cbff6fdc4bf3", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      fingerprint: fingerprint,
      fal: fal
    })
  });
}

// UTC tarih karşılaştırması için gün formatı
function getDateKey(date) {
  const d = new Date(date);
  return d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate();
}

// Daha önce bugün fal alınmış mı kontrol eder
function checkFalHistory() {
  fetch("https://api.sheetbest.com/sheets/057a0181-a151-48c6-98f9-cbff6fdc4bf3")
    .then(res => res.json())
    .then(data => {
      const todayKey = getDateKey(new Date());
      const bugunkuFal = data.find(row =>
        row.fingerprint === fingerprint &&
        getDateKey(row.timestamp) === todayKey
      );

      if (bugunkuFal) {
        showFal(bugunkuFal.fal); // Daha önceki falı göster
      } else {
        const randomFal = fallar[Math.floor(Math.random() * fallar.length)];
        showFal(randomFal);           // Yeni fal göster
        sendFalToSheet(randomFal);    // Ve tabloya kaydet
      }
    });
}

// FingerprintJS yüklenip ziyaretçi tanımlandığında işlemi başlat
FingerprintJS.load().then(fp => {
  fp.get().then(result => {
    fingerprint = result.visitorId;
    checkFalHistory();
  });
});
