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

const quizData = [ // questions for quiz 
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers: ['var', 'let', 'Both A and B', 'None of the above'],
        correctAnswer: 'Both A and B'
    },
    {
        question: 'JavaScript is a ___ -side programming language.',
        answers: ['Client', 'Server', 'Both', 'None'],
        correctAnswer: 'Both'
    },
    {
        question: 'Which built-in method returns the calling string value converted to lower case?',
        answers: ['toLowerCase()', 'toLower()', 'changeCase(case)2', 'None of the above.'],
        correctAnswer: 'toLowerCase()'
    },
    {
        question: 'What will the code return? Boolean(3 < 7)',
        answers: ['true', 'false', 'NaN', 'SyntaxError'],
        correctAnswer: 'true'
    },
    {
        question: 'Which of the following function of Array object calls a function for each element in the array?',
        answers: ['concat();', 'every();', 'filter();', 'forEach();'],
        correctAnswer: 'forEach();' 
    }
];