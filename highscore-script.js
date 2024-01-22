var backBtn = document.querySelector(".back");
var clearBtn = document.querySelector(".clear");
var listEl = document.querySelector("ul");

var storedScores = JSON.parse(localStorage.getItem("Scores"));

function compareByScore(a, b) {
    return a.score - b.score;
}

var sorted = storedScores.sort(compareByScore);
var highLow = sorted.reverse();

for (let index = 0; index < highLow.length; index++) {

    if (index > 9) {
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