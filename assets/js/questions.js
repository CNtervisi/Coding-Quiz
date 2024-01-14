const startButton = document.getElementById("start");
const timerElement = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const questionsContainer = document.getElementById("questions");

// Initialize variables
let timer;
let timeRemaining;
let currentQuestionIndex = 0;
let userAnswers = [];

// Define questions for the quiz
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
    choices: [
      "alertBox('Hello World');",
      "alert('Hello World');",
      "msg('Hello World');",
      "msgBox('Hello World');",
    ],
    correctAnswer: "alert('Hello World');",
  },
  {
    title: "Which is the correct way to write a comment in JavaScript?",
    choices: ["{# ... #}", "<!--- .... ---!>", "// ....", "\\ ..."],
    correctAnswer: "// ....",
  },
  {
    title: "In JavaScript, 'break' is used to _____",
    choices: [
      "Terminate a loop",
      "Break the code into multiple lines",
      "Exit a function",
      "Pause the debugger",
    ],
    correctAnswer: "Terminate a loop",
  },
];
// Start the Quiz
function startQuiz() {
  // Hide the start screen and show the questions container
  startScreen.classList.add("hide");
  questionsContainer.classList.remove("hide");
  timeRemaining = 60;
  displayTime();
  timer = setInterval(function () {
    timeRemaining--;
    displayTime();
    // End the quiz if time runs out
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
  showQuestion();
}
// Display a question and its choices
function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const questionTitle = document.getElementById("question-title");
  const choicesContainer = document.getElementById("choices");
  questionTitle.textContent = currentQuestion.title;
  choicesContainer.innerHTML = "";
  // Create buttons for each choice and attach click handlers
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
// End the quiz and calculate the score
function endQuiz() {
  clearInterval(timer);

  const score = calculateScore();
  const finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = +score + " out of " + questions.length;

  // Hide the questions container and show the end screen
  questionsContainer.classList.add("hide");
  const endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("hide");

  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", function () {
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;

    // Check if initials were entered and add to local storage
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
// Add an event listener to the start button
startButton.addEventListener("click", startQuiz);