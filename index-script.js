var buttonContainer = document.createElement("div");
var questionLine = document.createElement("h2")
var line1 = document.createElement("button");
var line2 = document.createElement("button");
var line3 = document.createElement("button");
var line4 = document.createElement("button");
var gameOverHeader = document.createElement("h2");
var gameOverText = document.createElement("p");
var gameOverInput = document.createElement("input");
var gameOverSubmit = document.createElement("button");
var startQuiz = document.querySelector(".start-button");
var timerEl = document.querySelector(".time");
var secondsLeft = 75;
var feedbackLeft;
var timerinterval;
var feedbackTimer;
timerEl.textContent = "Time: " + secondsLeft;
var quizIndex = 0;
var scoreList = [];
var feedbackP = document.createElement("p");
feedbackP.setAttribute("class", "feedback");

var quizQuestions = [ // List of questions, answers, and right/wrong states for each answer
    {
        question: "Question 1: Commonly used data types DO NOT include:",
        answer1: "1. strings",
        answer2: "2. booleans",
        answer3: "3. alerts",
        answer4: "4. numbers",
        state1: "wrong",
        state2: "wrong",
        state3: "right",
        state4: "wrong",
    },
    {
        question: "Question 2: The condition in an if/else statement is enclosed within ___.",
        answer1: "1. quotes",
        answer2: "2. curly brackets",
        answer3: "3. parentheses",
        answer4: "4. square brackets",
        state1: "wrong",
        state2: "wrong",
        state3: "right",
        state4: "wrong",
    },
    {
        question: "Question 3: Arrays in Javascript can be used to store ___.",
        answer1: "1. numbers and strings",
        answer2: "2. other arrays",
        answer3: "3. booleans",
        answer4: "4. all of the above",
        state1: "wrong",
        state2: "wrong",
        state3: "wrong",
        state4: "right",
    },
    {
        question: "Question 4: String values must be enclosed within ___ when being assigned to variables",
        answer1: "1. commas",
        answer2: "2. curly brackets",
        answer3: "3. quotes",
        answer4: "4. parentheses",
        state1: "wrong",
        state2: "wrong",
        state3: "right",
        state4: "wrong",
    },
    {
        question: "Question 5: A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: "1. Javascript",
        answer2: "2. terminal / bash",
        answer3: "3. for loops",
        answer4: "4. console.log",
        state1: "wrong",
        state2: "wrong",
        state3: "wrong",
        state4: "right",
    }
]

startQuiz.addEventListener("click", function() {    // When clicking the button to start quiz, removes the starting elements, renders the elements for the quiz questions and answer buttons, and starts the timer from 75 seconds
    var startH1 = document.querySelector(".start-h1");
    var startP = document.querySelector(".start-p");
    var startButton = document.querySelector(".start-button");
    startH1.remove();
    startP.remove();
    startButton.remove();

    renderQuizComponents();
    setTime();
})

function setTime() { // Starts timer from initial 75seconds
    timerinterval = setInterval(function() {

        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft <= 0) { // If timer hits 0 or below, the game ends
            gameOver();
        }
    }, 1000);
}

function renderQuizComponents() {       // Appends quiz components, updates the text and classes for the questions and answers
    questionLine.textContent = quizQuestions[quizIndex].question;

    line1.textContent = quizQuestions[quizIndex].answer1;
    line1.setAttribute("class", quizQuestions[quizIndex].state1);
    line2.textContent = quizQuestions[quizIndex].answer2;
    line2.setAttribute("class", quizQuestions[quizIndex].state2);
    line3.textContent = quizQuestions[quizIndex].answer3;
    line3.setAttribute("class", quizQuestions[quizIndex].state3);
    line4.textContent = quizQuestions[quizIndex].answer4;
    line4.setAttribute("class", quizQuestions[quizIndex].state4);

    document.body.appendChild(questionLine);  // Append H2 line for quiz question

    document.body.appendChild(buttonContainer);  // Append container for all buttons to be contained in
    buttonContainer.setAttribute("class", "container");

    buttonContainer.appendChild(line1);  // Appends all four answer buttons
    buttonContainer.appendChild(line2);
    buttonContainer.appendChild(line3);
    buttonContainer.appendChild(line4);
}

function replaceItems () { // Replaces question line, answer choices, and right/wrong states for the next question

    questionLine.textContent = quizQuestions[quizIndex].question;

    line1.setAttribute("class", quizQuestions[quizIndex].state1)
    line1.textContent = quizQuestions[quizIndex].answer1;
    line1.setAttribute("class", quizQuestions[quizIndex].state1);
    line2.textContent = quizQuestions[quizIndex].answer2;
    line2.setAttribute("class", quizQuestions[quizIndex].state2);
    line3.textContent = quizQuestions[quizIndex].answer3;
    line3.setAttribute("class", quizQuestions[quizIndex].state3);
    line4.textContent = quizQuestions[quizIndex].answer4;
    line4.setAttribute("class", quizQuestions[quizIndex].state4);
}

buttonContainer.addEventListener("click", function (event) {    // If a button with a class of either right/wrong is clicked, the next set of questions/answers will be updated
    if (event.target.classList.contains("wrong") || event.target.classList.contains("right")) {
        
        if (event.target.classList.contains("wrong")) {  // If answer is wrong, 10 seconds is deducted from the time
            secondsLeft = secondsLeft - 10;
            timerEl.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                gameOver();
            }
        }

        quizIndex += 1; // Moves onto the next question/answer set
        if (quizIndex >= quizQuestions.length) {  // Ends game once all the questions have been answered
            quizIndex = 0;
            gameOver();
        } 

        feedback(event);
        replaceItems(); 
    }
})

function feedback(event) {  // Gives the user feedback on whether the last answer was right/wrong, disappears after 2 seconds
    if (event.target.classList.contains("wrong")) {
        feedbackP.textContent = "Incorrect! Penalized 10 seconds."
        document.body.appendChild(feedbackP);
    } else if (event.target.classList.contains("right")) {
        feedbackP.textContent = "Correct!"
        document.body.appendChild(feedbackP);
    }

    clearInterval(feedbackTimer);
    feedbackLeft = 2;

    feedbackTimer = setInterval(function() {
        feedbackLeft--; 
        if (feedbackLeft <= 0) {
            clearInterval(feedbackTimer);
            feedbackP.remove();
        }
    }, 1000)
}

function gameOver() { // Removes quiz components and appends end screen elements with score and input box for name/initials
    clearInterval(timerinterval);
    questionLine.remove();
    buttonContainer.remove();

    gameOverHeader.textContent = "All done!";
    gameOverText.textContent = "Your final score is " + secondsLeft + ". Enter initials:";
    gameOverSubmit.textContent = "Submit"
    gameOverSubmit.setAttribute("class", "submit");
    document.body.appendChild(gameOverHeader);
    document.body.appendChild(gameOverText);
    document.body.appendChild(gameOverInput);
    document.body.appendChild(gameOverSubmit);
}

gameOverSubmit.addEventListener("click", storeScores);

function storeScores() {  // Loads initials/score array from local storage and pushes in the inputed initial and final score
    
    var storedScores = JSON.parse(localStorage.getItem("Scores"));

    if (storedScores !== null) {
        scoreList = storedScores;
    }

    var NameWithScore = {
        initials: gameOverInput.value.trim(),
        score: secondsLeft
    }

    scoreList.push(NameWithScore);
    localStorage.setItem("Scores", JSON.stringify(scoreList));

    window.location.href = "./highscores.html";
}