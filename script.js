let startTime, updatedTime, difference, running = false, lapCount = 0;
let timerInterval;

const timeDisplay = document.getElementById('timeDisplay');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(() => {
            updatedTime = new Date().getTime();
            difference = updatedTime - startTime;
            timeDisplay.innerHTML = formatTime(difference);
        }, 1000);
        running = true;
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = "00:00:00";
    lapList.innerHTML = '';
    lapCount = 0;
}

function displayLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(lapElement);
    }
}

// Event listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('lapBtn').addEventListener('click', displayLap);