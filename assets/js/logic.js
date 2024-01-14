// Function to handle user's answer
// Set 2 audio objects for the right or wrong answers wav files
const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

function handleAnswer(selectedChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  const feedbackContainer = document.getElementById("feedback");

  // Check if the selected choice is correct
  if (selectedChoice === currentQuestion.correctAnswer) {
    feedbackContainer.textContent = "Correct!";
    correctSound.play();
  } else {
    // If incorrect, update feedback, play incorrect sound, reduce time, and update display
    feedbackContainer.textContent = "Wrong!";
    incorrectSound.play();
    timeRemaining -= 10;
    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
    displayTime();
  }
  // Add the selected choice to the user's answers
  userAnswers.push(selectedChoice);
  // Remove the hide class from the feedback container to make it visible
  feedbackContainer.classList.remove("hide");

  setTimeout(() => {
    feedbackContainer.classList.add("hide");
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }, 1000);
}
// Function to calculate the score based on correct answers
function calculateScore() {
  let correctAnswers = 0;
  userAnswers.forEach((selectedChoice, index) => {
    const currentQuestion = questions[index];
    if (selectedChoice === currentQuestion.correctAnswer) {
      correctAnswers++;
    }
  });
  return correctAnswers;
}
