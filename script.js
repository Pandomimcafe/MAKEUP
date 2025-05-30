async function kontrolEtMakeupParola() {
  const parola = document.getElementById("makeupParolaInput").value.trim().toLowerCase();
  const sonuc = document.getElementById("makeupSonucu");

  try {
    const res = await fetch("makeup_parola.json");
    const data = await res.json();
    const gecerli = data.parola.toLowerCase();
    if (parola === gecerli) {
      const iltifatlar = data.iltifatlar;
      const random = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];
      sonuc.innerText = "💗 " + random;
      sonuc.style.color = "green";
    } else {
      sonuc.innerText = "❌ Parola yanlış.";
      sonuc.style.color = "red";
    }
  } catch (e) {
    sonuc.innerText = "⚠️ Parola kontrol edilemedi.";
    sonuc.style.color = "orange";
  }
}