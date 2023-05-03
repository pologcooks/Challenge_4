const startButton = document.getElementById('startBtn');
const quizContainer = document.getElementById('quizContainer');
const scoreContainer = document.getElementById('scoreResult');
const highScoresContainer = document.getElementById('highScores');
const finalScoreElement = document.getElementById('finalScore');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('saveScore');
const timerSpan = document.getElementById('timer');
const highScoresDiv = document.getElementById('viewHighScoresDiv');
const scoresDiv = document.getElementById('scores');
const clearScoresBtn = document.getElementById('clearScores');
const goBackButton = document.getElementById('goBack');

const questions = [
    {
        question: 'What is JS an abbreviation for?',
        options: ['Javascript', 'Java', 'JQuery', 'Javascripts'],
        answer: 0
    },
    {
        question: 'Can you put CSS and JSS in a html file?',
        options: ['Yes', 'No'],
        answer: 0
    },
   
    {question: 'What does CCS stand for?',
    options: ['Cascading Style Sheet ', '* Class Style Sheet ', '// Comment Style Sheet', 'Crazy Style Sheet'],
    answer: 0
    },

    {question: 'What does HTML stand for?',
    options: ['Hyper Truck Main Language ', 'Hyper Text Markup Language', 'HTML', 'Horse Train Money Language'],
    answer: 1
    },
];

let currentQuestionIndex = 0;
let timeRemaining = 100;
let timer;
let lastAnswerResult;

function startQuiz() {
    startButton.classList.add('hidden');
    showQuestion();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeRemaining--;
    updateSpan();
    if (timeRemaining <= 0) {
        endQuiz();
    }
}

function updateSpan() {
    timerSpan.textContent = "Time: " + timeRemaining
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const question = questions[currentQuestionIndex];
    let questionHtml = question.options.map((option, i) => `${i}. <button class='answerButton' onclick="answerQuestion(${i})">${option}</button></br>`).join('');
    if (lastAnswerResult) {
        questionHtml += `Last Answer: ${lastAnswerResult}`
    }
    quizContainer.innerHTML = `
        <h2>${question.question}</h2>${questionHtml}`;
}

function answerQuestion(selectedOption) {
    if (selectedOption !== questions[currentQuestionIndex].answer) {
        timeRemaining -= 10;
        lastAnswerResult = "Wrong!"
    } else {
        lastAnswerResult = "Correct!"
    }

    currentQuestionIndex++;
    showQuestion();
    updateSpan();
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    finalScoreElement.textContent = timeRemaining;
}

function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials) {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        const newScore = { initials, score: timeRemaining };
        scores.push(newScore);
        localStorage.setItem('scores', JSON.stringify(scores));

        alert('Your score has been saved!');
        viewHighScores();
    } else {
        alert('Please enter your initials!');
    }
}

function viewHighScores() {
    if (highScoresContainer.classList.contains("hidden")) {
        highScoresContainer.classList.remove("hidden")
    }

    if (!quizContainer.classList.contains("hidden")) {
        quizContainer.classList.add("hidden");
    }

    if(!scoreContainer.classList.contains("hidden")){
        scoreContainer.classList.add("hidden");
    }

    scoresDiv.innerHTML = "";

    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b.score - a.score);

    scores.forEach((score, index) => {
        const scoreText = document.createElement('div');
        scoreText.textContent = `${index + 1}. ${score.initials}  - ${score.score}`;
        scoresDiv.appendChild(scoreText);
    });
}

function clearScores() {
    localStorage.clear();
    viewHighScores();
}

function goBack() {
    window.location.reload();
}

startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveScore);
highScoresDiv.addEventListener('click', viewHighScores)
clearScoresBtn.addEventListener('click', clearScores)
goBackButton.addEventListener('click',goBack)