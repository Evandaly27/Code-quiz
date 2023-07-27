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

function buildQuiz() { // display the current quiz question
    const questionData = quizData[currentQuestion];  // retrieves the questions and answers data for the current question
    const { question, answers } = questionData;

    // Declare a constant variable `answersHTML` to store the generated HTML for the answer options
    const answersHTML = answers.map(answer => `
    <label>
    <input tyoe="radio" name="question" value="${answer}">
    ${answer}
    </label>
    `).join('');
    //    - For each answer in the 'answers' list, we create a button with its label using a special way called 'template string'.
    //    - We also create a 'radio' button, so the user can choose only one answer.
    //    - Each button will have its own label and text (answer text).
    //    - We do this for all the answers and store them as a string in the 'answersHTML' variable.
    //    - The 'answersHTML' variable will contain all the buttons together.


    quizContainer.innerHTML = `
    <div class="question">
    <h3>${question}</h3>
    ${answersHTML}
    </div>
    `;

//     - We create a container to hold everything, and inside it, we create a section for the question and another for the answer buttons.
//    - The 'question' will be shown as a big heading (h3) on the screen.
//    - The 'answersHTML' will have all the buttons we made earlier.
//    - When we put them together and show the container, the user will see the question and buttons to choose from.

    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';
    resultContainer.style.display = 'none';
    timerContainer.style.display = 'block';
    scoreContainer.style.display = 'block';
    currentScore.textContent = score;
}

function showNextQuestion() { // Function to show the next question or final results after the user submits an answer
    const selectedOption = document.querySelector('input[name=question]:checked');   // Get the selected answer option for the current question

    // Check if an answer option is selected
    if (selectedOption) {
        // Retrieve the user's answer and the correct answer for the current question
        const userAnswer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].correctAnswer;

        // Check if the user's answer matches the correct answer
        if (userAnswer === correctAnswer) {
            // Increase the score and show the answer as green (for correct)
            score++;
            selectedOption.parentElement.style.color = 'green';
        } else {
            // Show the answer as red (for incorrect) and deduct time for penalty
            selectedOption.parentElement.style.color = 'red';
            timeLeft -= questionTimePenalty; // Subtract 10 seconds for an incorrect answer
        }

        // Move to the next question
        currentQuestion++;
        // Uncheck the selected answer for the next question
        selectedOption.checked = false;

        // Check if there are more questions to show
        if (currentQuestion < quizData.length) {
            // If there are more questions, display the next question
            buildQuiz();
        } else {
            // If all questions are answered, show the final results
            showResults();
        }
    }
}