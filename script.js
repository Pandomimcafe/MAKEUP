
const iltifatlar = ["Güzelliğin bu sayfaya fazla geldi!", "Gülüşün kahveye bile gerek bırakmıyor.", "Bugün ışığın her yeri aydınlatıyor ✨", "Kendine yakışanı yapmışsın, yine çok güzelsin.", "Zarafet sende vücut bulmuş.", "Aynaya bakmayı unutma, sanat eserisin!", "Bugün, bu şehir biraz daha güzel… çünkü sen varsın.", "Stilin olay yaratıyor 🔥", "Sen yürürken rüzgar bile durup izliyor.", "Güzelliğini anlatmaya kelimeler yetmez."];

const butonIsimleri = [
  "MORAL ŞART 💋",
  "RUHUMU OKŞA 💞",
  "BENİ ŞAŞIRT 🤯",
  "ŞIMART BENİ 😍",
  "GÜZELLİK GELSİN ✨"
];

let sayac = 0;
const btn = document.getElementById("iltifatBtn");
const iltifatYazi = document.getElementById("iltifat");

function yeniIltifat() {
  sayac++;
  if (sayac <= 3) {
    const random = Math.floor(Math.random() * iltifatlar.length);
    iltifatYazi.innerText = iltifatlar[random];
    btn.innerText = butonIsimleri[(sayac - 1) % butonIsimleri.length];
  } else {
    iltifatYazi.innerText = "Bugünlük bu kadar ama yarın yeniden gününüzü güzelleştirmek için bekleriz ❤️❤️";
    btn.style.display = "none";
  }
}
