document.addEventListener("DOMContentLoaded", function () {
    // Get DOM element
    const highscoresList = document.getElementById("highscores");
  
    // Fetch high scores from local storage
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    // Populate the high scores list
    highScores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${score.initials} - ${score.score}`;
      highscoresList.appendChild(listItem);
    });
  
    // Event listener for the clear button
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", function () {
      // Clear high scores from local storage
      localStorage.removeItem("highScores");
      // Clear the high scores list on the page
      highscoresList.innerHTML = "Highscores Cleared!";
    });
  });
  