const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");

let timer;
let timeRemaining;
let currentQuestionIndex = 0;
let userAnswers = [];

const questions = [
  {
    title: "JavaScript files can be linked with _____",
    choices: ["<var>", "<script>", "<section>", "<code>"],
    correctAnswer: "<script>",
  },
  {
    title: "We use the _____ operator to assign a value to a variable.",
    choices: ["*", "+", "=", "$"],
    correctAnswer: "=",
  },
  {
    title: "How do you write 'Hello World' in an alert box?",
    choices: ["alertBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "msgBox('Hello World');"],
    correctAnswer: "alert('Hello World');",
  },
  {
    title: "Which is the correct way to write a comment in JavaScript?",
    choices: ["{# ... #}", "<!--- .... ---!>", "// ....", "\\ ..."],
    correctAnswer: "// ...."
  },
  {
    title: "In JavaScript, 'break' is used to _____",
    choices: ["Terminate a loop", "Break the code into multiple lines", "Exit a function", "Pause the debugger"],
    correctAnswer: "Terminate a loop"
  },
];

function startQuiz() {
  startScreen.classList.add("hide");
  questionsContainer.classList.remove("hide");
  timeRemaining = 60;
  displayTime();
  timer = setInterval(function () {
    timeRemaining--;
    displayTime();
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
  showQuestion();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  questionTitle.textContent = currentQuestion.title;
  choicesContainer.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");
    choiceButton.textContent = choice;
    choiceButton.addEventListener("click", () => handleAnswer(choice));
    choicesContainer.appendChild(choiceButton);
  });
}

function displayTime() {
  timerElement.textContent = timeRemaining;
}

function endQuiz() {
  clearInterval(timer);

  const score = calculateScore();
  const finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = + score + " out of " + questions.length;

  questionsContainer.classList.add("hide");
  const endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("hide");

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;

    if (initials.trim() !== "") {
      let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

      highScores.push({ initials: initials, score: score });

      highScores.sort((a, b) => b.score - a.score);

      localStorage.setItem("highScores", JSON.stringify(highScores));

      window.location.href = "highscores.html";
    } else {
      console.log("Please enter initials!");
    }
  });
}

startButton.addEventListener("click", startQuiz);
