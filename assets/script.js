// Variables for quiz
var timeLeft = document.getElementById("timeLeft")
var timerEl = document.getElementById("timer")
var startButton = document.getElementById("start")

function timeTick() { // Timer f
    timeLeft--;
    timerEl.textContent = "Time: + timeLeft";
    if (timeLeft <= 0) {
        saveScore();
    }
}