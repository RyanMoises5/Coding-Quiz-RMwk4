var storedScores = JSON.parse(localStorage.getItem("Scores"));

function compareByScore(a, b) {
    return a.score - b.score;
}

var sorted = storedScores.sort(compareByScore);
var highLow = sorted.reverse();

var backBtn = document.querySelector(".back");
var clearBtn = document.querySelector(".clear");








backBtn.addEventListener("click", function () { // Reloads index.html
    window.location.href = "index.html";
});

clearBtn.addEventListener("click", function () {  // Clears the local storage of initials and scores
    scoreList = [];
    localStorage.setItem("Scores", JSON.stringify(scoreList));
})