window.addEventListener("load", () => {
  typeSound.play().then(() => typeSound.pause());
});

const items = document.querySelectorAll(".item");
const talkie = document.getElementById("talkie");
const typeSound = document.getElementById("typeSound");

let typingInterval;

function typeText(text) {
  clearInterval(typingInterval);
  talkie.textContent = "";
  let i = 0;

  typingInterval = setInterval(() => {
    talkie.textContent += text[i];

    // Перезапускаем звук на каждую букву
    typeSound.currentTime = 0.25;
    typeSound.play();

    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);
    }
  }, 40); // скорость печати
}

items.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const text = item.dataset.talkie;
    typeText(text);
  });

  item.addEventListener("mouseleave", () => {
    clearInterval(typingInterval);
    talkie.textContent = "";
  });
});

// плеер

const bgm = document.getElementById("bgm");
const trackName = document.getElementById("trackName");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

bgm.volume = 0.4;

// Твой плейлист — просто добавляй mp3 рядом с HTML
const playlist = [
  {
    name: "clario - pretty girl",
    file: "../music/clario - pretty girl [audiovk.com].mp3",
  },
  { name: "fnaf-1-music-box", file: "../music/fnaf-1-music-box 2.mp3" },
  {
    name: "Lana Del Rey - Young And Beautiful",
    file: "../music/Lana Del Rey - Young And Beautiful [audiovk.com].mp3",
  },
  {
    name: "we fell in love in october",
    file: "../music/we fell in love in october - thats why i love fall [audiovk.com].mp3",
  },
  {
    name: "? ? ?",
    file: "../music/Crossing Bridges - they're hiding in plain sight. can't you see [audiovk.com].mp3",
  },
];

let currentTrack = 0;
let started = false;

// Загружаем трек
function loadTrack(index) {
  currentTrack = index;
  bgm.src = playlist[index].file;
  trackName.textContent = playlist[index].name;

  if (started) {
    bgm.play();
    playPauseBtn.textContent = "⏸️";
  }
}

// Автозапуск после первого взаимодействия
function startMusic() {
  if (!started) {
    started = true;
    bgm.play();
    playPauseBtn.textContent = "⏸️";
  }
  document.removeEventListener("mousemove", startMusic);
  document.removeEventListener("click", startMusic);
}

document.addEventListener("mousemove", startMusic);
document.addEventListener("click", startMusic);

// Play / Pause
playPauseBtn.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    bgm.pause();
    playPauseBtn.textContent = "▶️";
  }
});

// Следующий трек
nextBtn.addEventListener("click", () => {
  let next = (currentTrack + 1) % playlist.length;
  loadTrack(next);
});

// Предыдущий трек
prevBtn.addEventListener("click", () => {
  let prev = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(prev);
});

// Автопереход к следующему треку
bgm.addEventListener("ended", () => {
  let next = (currentTrack + 1) % playlist.length;
  loadTrack(next);
});

// Загружаем первый трек
loadTrack(0);
