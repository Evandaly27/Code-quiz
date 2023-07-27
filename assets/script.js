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
    <input type="radio" name="question" value="${answer}">
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

function showResults() {
    quizContainer.style.display = 'none'; // hide the part that shows the questions and answers
    submitButton.style.display = 'none'; // hides the submit button 
    timerContainer.style.display = 'none'; // hides the timer
    scoreContainer.style.display = 'none'; // hides the users score

    finalScoreDisplay.textContent = score; // shows the users final score
    totalQuestionsDisplay.textContent = quizData.length; // shows the total number of questions

    resultContainer.style.display = 'block'; // shows the final scores after the quiz

    const initialsForm = document.getElementById('initials-form'); // grabs the element where the user enters their initials 
    initialsForm.style.display = 'block'; // makes the form visible  

    saveScoreButton.addEventListener('click', function () {
        const initials = initialsInput.value.trim(); // get the initials entered and removes extra spaces

        if (initials !== '') { // if the user enters their initials it will save the score 
            const highScores = JSON.parse(localStorage.getItem('highscores')) || []; // retrieves the prevouse highscores
            highScores.push({ initials, score }); // adds the users initials to the list of highscores
            localStorage.setItem('highScores', JSON.stringify(highScores)); // sasves the updated scores to local storage

            alert('Score saved successfully!'); // tells the user their initials were saved 
        } else {
            alert('Please enter your initials to save your score.'); // if users does not enter initials it shows this alert
        }
    });
}

function showHighscores() { // displays the list of high scores on the page 
    const highScores = JSON.parse(localStorage.getItem('highScores')) || []; // retrieves high scores from local storage 
    if (highScores.length === 0) { // checks if there are no high scores
        alert('No high scores found.'); // if no high scores this alert will pop up
    } else {
        highscoreList.innerHTML = ''; // if no high scores this will clear the current list of displays 
        highScores.forEach((entry, index) => { // loops through the high score entries and displays them
            const listItem = document.createElement('li'); // creates new list item for the high scores
            listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`; // shows the list of initials and scores
            highscoreList.appendChild(listItem); //adds the high score to the list
        });
        highscoresContainer.style.display = 'block'; // displays the list 
    }
}

viewHighscoresButton.addEventListener('click', showHighscores);

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timeRemaining.textContent = timeLeft;
        currentScore.textContent = score;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

startButton.addEventListener('click', function () {
    this.style.display = 'none';
    buildQuiz();
    startTimer();
});

submitButton.addEventListener('click', showNextQuestion);