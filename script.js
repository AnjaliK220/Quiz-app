// Questions array with different types as per task requirement
const quizData = [
    {
        type: "single",
        question: "1. Web page ko structure dene ke liye kis language ka use kiya jata hai?",
        options: ["CSS", "HTML", "JavaScript", "PHP"],
        answer: "HTML"
    },
    {
        type: "multi",
        question: "2. Inmein se kaun-kaun se Front-End Frameworks/Libraries hain? (Multiple Select)",
        options: ["React", "Django", "Vue", "Laravel"],
        answer: ["React", "Vue"]
    },
    {
        type: "fill",
        question: "3. HTML tags ko style karne ke liye use hone wali language ka short name _____ hai.",
        answer: "CSS"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitBtn = document.getElementById("submit-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    // Clear previous options
    optionsContainer.innerHTML = "";
    
    if (currentQuestionIndex >= quizData.length) {
        showFinalScore();
        return;
    }

    const currentQuiz = quizData[currentQuestionIndex];
    questionEl.innerText = currentQuiz.question;

    // Render HTML based on question type
    if (currentQuiz.type === "single") {
        currentQuiz.options.forEach(option => {
            const label = document.createElement("label");
            label.className = "option-wrapper";
            label.innerHTML = `<input type="radio" name="quiz-opt" value="${option}"> ${option}`;
            optionsContainer.appendChild(label);
        });
    } 
    else if (currentQuiz.type === "multi") {
        currentQuiz.options.forEach(option => {
            const label = document.createElement("label");
            label.className = "option-wrapper";
            label.innerHTML = `<input type="checkbox" name="quiz-opt" value="${option}"> ${option}`;
            optionsContainer.appendChild(label);
        });
    } 
    else if (currentQuiz.type === "fill") {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "text-input";
        input.placeholder = "Type your answer here...";
        input.id = "fill-answer";
        optionsContainer.appendChild(input);
    }
}

function checkAnswer() {
    const currentQuiz = quizData[currentQuestionIndex];
    let isCorrect = false;

    if (currentQuiz.type === "single") {
        const selected = document.querySelector('input[name="quiz-opt"]:checked');
        if (!selected) {
            alert("Kripya ek option select karein!");
            return;
        }
        if (selected.value === currentQuiz.answer) isCorrect = true;
    } 
    else if (currentQuiz.type === "multi") {
        const checkedBoxes = document.querySelectorAll('input[name="quiz-opt"]:checked');
        const selectedOptions = Array.from(checkedBoxes).map(cb => cb.value);
        
        if (selectedOptions.length === 0) {
            alert("Kripya kam se kam ek option select karein!");
            return;
        }
        
        // Checking if both arrays have the same elements
        const match = selectedOptions.length === currentQuiz.answer.length && 
                      selectedOptions.every(val => currentQuiz.answer.includes(val));
        if (match) isCorrect = true;
    } 
    else if (currentQuiz.type === "fill") {
        const inputVal = document.getElementById("fill-answer").value.trim();
        if (inputVal === "") {
            alert("Kripya answer type karein!");
            return;
        }
        if (inputVal.toLowerCase() === currentQuiz.answer.toLowerCase()) isCorrect = true;
    }

    // Process Score and feedback
    if (isCorrect) {
        score++;
        scoreEl.innerText = score;
        alert("Sahi Jawaab! 🎉");
    } else {
        alert(`Galat Jawaab! ❌ Sahi answer tha: ${currentQuiz.answer}`);
    }

    currentQuestionIndex++;
    loadQuestion();
}

function showFinalScore() {
    questionEl.innerText = "Quiz Completed! 🏁";
    optionsContainer.innerHTML = `<h3>Aapka total score raha: ${score} / ${quizData.length}</h3>`;
    submitBtn.style.display = "none";
}

// Event Listeners
submitBtn.addEventListener("click", checkAnswer);

// Initial Load
loadQuestion();