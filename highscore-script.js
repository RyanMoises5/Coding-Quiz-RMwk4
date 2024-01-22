var backBtn = document.querySelector(".back");
var clearBtn = document.querySelector(".clear");
var listEl = document.querySelector("ul");

var storedScores = JSON.parse(localStorage.getItem("Scores"));  // Loads initial/score arrays from local storage

function compareByScore(a, b) { // Sorts initial/score pairs by score value, from lowest to highest
    return a.score - b.score;
}

var sorted = storedScores.sort(compareByScore);
var highLow = sorted.reverse(); // Sorts initial/score pairs by score value, from to highest to lowest

for (let index = 0; index < highLow.length; index++) {  // For each initial/score, appends a new line onto the high score list
    if (index > 9) { // Displays only top 10 scores and exits the for loop if index exceeds
        break;
        }
        
    var liEl = document.createElement("li");
    liEl.textContent = highLow[index].score + " - " + highLow[index].initials
    listEl.appendChild(liEl);
}

backBtn.addEventListener("click", function () { // Reloads index.html
    window.location.href = "./index.html";
});

clearBtn.addEventListener("click", function () {  // Clears the local storage of initials and scores
    scoreList = [];
    localStorage.setItem("Scores", JSON.stringify(scoreList));
    window.location.href = "./highscores.html";
})