// constant variables 
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');
const timerContainer = document.getElementById('timer');
const timeRemaining = document.getElementById('time-remaining');
const scoreContainer = document.getElementById('score');
const currentScore = document.getElementById('current-score');
const finalScoreDisplay = document.getElementById('final-score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score-btn');
const viewHighscoresButton = document.getElementById('view-highscores-btn');
const highscoresContainer = document.getElementById('highscores');
const highscoreList = document.getElementById('highscore-list');

const questionTimePenalty = 10; // time penalty of 10 seconds 
let currentQuestion = 0; // represents the index of the current question being displayed 
let score = 0; // score that will be updated during the quiz
let timeLeft = 90; // 90 seconds for the quiz

