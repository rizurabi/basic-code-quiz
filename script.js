const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container');
const timeLeft = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');
const resultContainer = document.getElementById('result');
const highScoreBtn = document.getElementById('high-score-btn');
const submitScoreBtn = document.getElementById('submit-score');

let currentQuestion = 0;
let score = 0;
let timer;
const highScores = [];

const questions = [
    {
        question: 'Question 1: What does HTML stand for?',
        options: ['Home Tool Markup Language', 'Hyper Text Markup Language', 'Hyperlink Text Markup Language'],
        answer: 'Hyper Text Markup Language'
    },
    {
        question: 'Question 2: What does CSS stand for?',
        options: ['Colorful Style Sheets', 'Creative Style Sheets', 'Cascading Style Sheets'],
        answer: 'Cascading Style Sheets'
    },
    {
        question: 'Question 3: Inside which HTML element do we put the JavaScript?',
        options: ['<javascript>', '<js>>', '<script>'],
        answer: '<script>'
    },
    {
        question: 'Question 4: Which character is used to indicate an end tag in HTML?',
        options: ['^', '*',  '/'],
        answer: '/'
    },
    {
        question: 'Question 5: How do you insert a comment in a CSS file?',
        options: ['/*comment */', '// comment //', '// this is a comment'],
        answer: '/*comment */'
    },
];

startBtn.addEventListener('click', startQuiz);
highScoreBtn.addEventListener('click', showHighScores);
submitScoreBtn.addEventListener('click', submitScore);

function startQuiz() {
    startBtn.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', checkAnswer);
            optionsContainer.appendChild(button);
        });

        startTimer();
    } else {
        endQuiz();
    }
}

function checkAnswer(event) {
    clearInterval(timer);
    const selectedOption = event.target.textContent;
    const question = questions[currentQuestion];

    optionsContainer.innerHTML = '';

    const feedbackButton = document.createElement('button');
    feedbackButton.disabled = true;
    feedbackButton.style.backgroundColor = selectedOption === question.answer ? '#27ae60' : '#c0392b';
    feedbackButton.textContent = selectedOption === question.answer ? 'Correct!' : 'Wrong!';
    feedbackContainer.appendChild(feedbackButton);

    if (selectedOption === question.answer) {
        score++;
    }

    currentQuestion++;
    setTimeout(loadQuestion, 1000);
}

function startTimer() {
    let time = 60;
    timeLeft.textContent = time;

    timer = setInterval(() => {
        time--;
        if (time < 0) {
            clearInterval(timer);
            checkAnswer({ target: { textContent: '' } });
        } else {
            timeLeft.textContent = time;
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreDisplay.textContent = score;
}

function submitScore() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value;

    if (username && score > 0) {
        highScores.push({ username, score });
        usernameInput.value = '';
        score = 0; 
        loadQuestion(); 
    }
}

function showHighScores() {
    let highScoresHTML = '<h2>High Scores</h2>';
    highScores.sort((a, b) => b.score - a.score);

    if (highScores.length === 0) {
        highScoresHTML += '<p>No high scores yet.</p>';
    } else {
        highScoresHTML += '<ul>';
        for (let i = 0; i < Math.min(10, highScores.length); i++) {
            highScoresHTML += `<li>${highScores[i].username}: ${highScores[i].score}</li>`;
        }
        highScoresHTML += '</ul>';
    }

    resultContainer.innerHTML = highScoresHTML;
    highScoreBtn.style.display = 'none';
}

