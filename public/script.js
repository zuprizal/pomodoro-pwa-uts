let isRunning = false;
let timerInterval;
let workMinutes = 25;  // Waktu default sesi kerja (menit)
let breakMinutes = 5;  // Waktu default sesi istirahat (menit)
let seconds = 0;
let sessionCount = 0;
let isWorkSession = true;  // Menentukan apakah sesi kerja atau istirahat

// Referensi elemen DOM
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionCountDisplay = document.getElementById("session-count");

const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");

const alarmSound = document.getElementById("alarm-sound");  // Elemen audio

// Mengupdate tampilan timer
function updateDisplay() {
    const formattedMinutes = (isWorkSession ? workMinutes : breakMinutes).toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    timerDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Fungsi untuk memulai timer
function startTimer() {
    if (isRunning) return;  // Jika timer sudah berjalan, jangan jalankan lagi
    isRunning = true;

    // Mengambil waktu yang diatur pengguna
    workMinutes = parseInt(workTimeInput.value);
    breakMinutes = parseInt(breakTimeInput.value);

    timerInterval = setInterval(() => {
        if (seconds === 0) {
            if (isWorkSession) {
                // Jika waktu kerja selesai
                if (workMinutes === 0) {
                    sessionCount++;
                    sessionCountDisplay.textContent = sessionCount;
                    alert("Sesi kerja selesai! Saatnya istirahat.");
                    alarmSound.play();  // Putar suara saat sesi kerja selesai
                    isWorkSession = false;  // Beralih ke sesi istirahat
                    seconds = 0;  // Reset detik
                } else {
                    workMinutes--;
                    seconds = 59;  // Mulai hitung mundur dari detik 59
                }
            } else {
                // Jika waktu istirahat selesai
                if (breakMinutes === 0) {
                    alert("Istirahat selesai! Kembali bekerja.");
                    alarmSound.play();  // Putar suara saat sesi istirahat selesai
                    isWorkSession = true;  // Beralih ke sesi kerja
                    breakMinutes = parseInt(breakTimeInput.value);  // Reset durasi istirahat
                    workMinutes = parseInt(workTimeInput.value);    // Reset durasi kerja
                    seconds = 0;  // Reset detik
                } else {
                    breakMinutes--;
                    seconds = 59;  // Mulai hitung mundur dari detik 59
                }
            }
        } else {
            seconds--;  // Hitung mundur detik
        }
        updateDisplay();  // Perbarui tampilan timer setiap detik
    }, 1000);
}

// Fungsi untuk reset timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    workMinutes = parseInt(workTimeInput.value);  // Ambil waktu kerja dari input
    breakMinutes = parseInt(breakTimeInput.value);  // Ambil waktu istirahat dari input
    seconds = 0;
    isWorkSession = true;  // Mulai dari sesi kerja
    updateDisplay();  // Perbarui tampilan timer
}

// Event listener untuk tombol Start
startBtn.addEventListener("click", () => {
    startTimer();
});

// Event listener untuk tombol Reset
resetBtn.addEventListener("click", () => {
    resetTimer();
});

// Mendaftarkan service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker berhasil didaftarkan:', registration);
            })
            .catch((error) => {
                console.log('Service Worker gagal didaftarkan:', error);
            });
    });
}
