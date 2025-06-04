let fingerprint = null;
let fallar = [
  "🧿 Bugün sezgilerine güven, seni doğru yola götürecek.",
  "🌙 Geçmişin yüklerinden sıyrıldıkça ruhun hafifleyecek.",
  "🔥 Kalbindeki tutku, seni hiç beklemediğin bir yere taşıyabilir.",
  "🌸 Yeni başlangıçlar için doğru zamandasın.",
  "☕ Bir dost sohbeti sana ilaç gibi gelecek.",
  "💫 Hayat, sana beklenmedik güzellikler hazırlıyor.",
  "🦋 Küçük bir değişiklik, büyük bir huzur getirebilir."
];

// Falı göster
function showFal(text) {
  const box = document.getElementById("falText");
  if (box) box.innerText = text;
}

// Falı sheet.best'e gönder
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

// Daha önce fal bakılmış mı?
function checkFalHistory(fingerprint) {
  const today = new Date().toISOString().split("T")[0];

  fetch("https://api.sheetbest.com/sheets/057a0181-a151-48c6-98f9-cbff6fdc4bf3")
    .then(res => res.json())
    .then(data => {
      const kayitli = data.find(row =>
        row.fingerprint === fingerprint && row.timestamp.startsWith(today)
      );
      if (kayitli) {
        showFal(kayitli.fal);
      } else {
        const randomFal = fallar[Math.floor(Math.random() * fallar.length)];
        showFal(randomFal);
        sendFalToSheet(randomFal);
      }
    });
}

// FingerprintJS yükle
FingerprintJS.load().then(fp => {
  fp.get().then(result => {
    fingerprint = result.visitorId;
    checkFalHistory(fingerprint);
  });
});
