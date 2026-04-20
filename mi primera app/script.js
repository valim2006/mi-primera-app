const questions = [
    {
        question: "¿Boca Juniors fue fundado en el año 1905?",
        answer: true,
        explanation: "Fue fundado el 3 de abril de 1905."
    },
    {
        question: "¿El estadio de Boca Juniors se llama 'El Monumental'?",
        answer: false,
        explanation: "El estadio es popularmente conocido como 'La Bombonera'."
    },
    {
        question: "¿Diego Armando Maradona jugó y fue campeón con Boca Juniors?",
        answer: true,
        explanation: "Ganó el Campeonato Metropolitano en 1981 con el club."
    },
    {
        question: "¿Boca Juniors ha ganado 6 Copas Libertadores en su historia?",
        answer: true,
        explanation: "Ganó en 1977, 1978, 2000, 2001, 2003 y 2007."
    },
    {
        question: "¿Juan Román Riquelme es el máximo goleador en la historia del club?",
        answer: false,
        explanation: "El máximo goleador es Martín Palermo."
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionTextElement = document.getElementById("question-text");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const finalScoreValue = document.getElementById("final-score-value");
const questionCard = document.querySelector(".question-card");

document.addEventListener("DOMContentLoaded", () => {
    totalQuestionsElement.textContent = questions.length;
    loadQuestion();
});

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;
    questionCard.className = "question-card"; // Reset classes
}

function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // Disable buttons temporarily
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => btn.style.pointerEvents = "none");

    if (userAnswer === currentQuestion.answer) {
        score++;
        scoreElement.textContent = score;
        questionCard.classList.add("correct-anim");
    } else {
        questionCard.classList.add("incorrect-anim");
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
            buttons.forEach(btn => btn.style.pointerEvents = "auto");
        } else {
            showResult();
        }
    }, 600); // Wait for animation to finish
}

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    finalScoreValue.textContent = `${score} / ${questions.length}`;

    if (score === questions.length) {
        resultTitle.textContent = "¡DALE BOCA! ¡PUNTAJE PERFECTO! 🏆💙💛💙";
        resultMessage.textContent = "¡Felicitaciones! Demostraste que sos un verdadero Xeneize. ¡La mitad más uno está orgullosa de vos!";
        createConfetti();
    } else if (score >= questions.length / 2) {
        resultTitle.textContent = "¡MUY BIEN! 👏";
        resultMessage.textContent = "Sabés bastante sobre el club más grande, pero todavía podés mejorar.";
    } else {
        resultTitle.textContent = "¡HAY QUE ESTUDIAR MÁS! 😅";
        resultMessage.textContent = "Parece que te falta repasar la historia azul y oro. ¡Intentalo de nuevo!";
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    quizContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    
    // Remove confetti if exists
    const oldConfetti = document.getElementById("confetti-container");
    if(oldConfetti) oldConfetti.remove();

    loadQuestion();
    
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(btn => btn.style.pointerEvents = "auto");
}

function createConfetti() {
    const container = document.createElement('div');
    container.id = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#001f5b', '#ffcc00']; // Blue and yellow

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(confetti);
    }
}
