var startButton = document.getElementById("start-button");
startButton.addEventListener("click", setTime);

var timerElement = document.querySelector(".timer-count"); 
var cardQuestion = document.querySelector(".cardQuestion");
var cardAnswer = document.querySelector(".cardAnswer");
var resultAlert = document.querySelector(".resultAlert"); 
var finalScore = document.querySelector(".finalScore");
var scoreCard = document.querySelector(".finalScoreCard");
// var submitButton = document.querySelector(".submit-button"); 
// submitButton.addEventListener("click", toStorage);

let timer= document.getElementById("timer-count");
let storedArray = [];

let emptyArray = [];

let timeLeft = 80;

let scoresArray = []; 

let storedScore = JSON.parse(window.localStorage.getItem("highScores"));

var questionCount = 0;

var score = 0;

var choices = document.getElementById("choices");

function setTime() {
    displayQuestions(); 
    var timerInterval = setInterval(function() {
        timeLeft --;
        timerElement.textContent = "";
        timerElement.textContent = "Time: " + timeLeft; 
        if (timeLeft <= 0 || questionCount === questions.length) {
            clearInterval(timerInterval); 
            getUserScore();
        }
    }, 1000);
}

function displayQuestions () {
    // removeEls(startButton); 

    if (questionCount < questions.length){
        cardQuestion.innerHTML = questions[questionCount].title; 
        choices.textContent = "";

        for (let i=0; i < questions[questionCount].multipleChoice.length; i++) {
            let el = document.createElement("button");
            el.innerText = questions[questionCount].multipleChoice[i]; 
            el.setAttribute("data-id", i);
            el.addEventListener("click", function(event){
                event.stopPropagation();

                if (el.innerText === questions[questionCount].answer) {
                    score += timeLeft; 
                } else {
                    score -= 10;
                    timeLeft = timeLeft - 15
                }

                cardQuestion.innerHTML = "";

                if (questionCount === questions.length){
                    return;
                } else {
                    questionCount++;
                    displayQuestions()
                }
            }); 
            choices.append(el);
        }
    }
}

function getUserScore () {
    // timer.remove(); 
    choices.textContent = "";

    var initialsContainer = document.createElement("input");
    var postScore = document.createElement("input"); 

    results.innerHTML = `You scored ${score} points! Please Enter your Initials:`; 
    initialsContainer.setAttribute("type", "text");
    postScore.setAttribute("type", "button");
    postScore.setAttribute("value", "Post Score");
    postScore.addEventListener("click", function(event){
        event.preventDefault(); 

        var scoresArray = defineScoresArray(storedArray, emptyArray); 

        let initials = initialsContainer.value; 
        let userAndScore = {
            initials: initials, 
            score: score
        }; 

        scoresArray.push(userAndScore);
        saveScores(scoresArray); 
        displayScores();
        clearScores();
        goBack();
        viewScores().remove();
    }); 

    results.append(initialsContainer);
    results.append(postScore)
};

const saveScores = (array) => {
    window.localStorage.setItem("highScores", JSON.stringify(array));
}

const defineScoresArray = (arr1, arr2) => {
    if (arr1 !== null) {
        return arr1
    } else {
        return arr2
    }
}

// const removeEls = (...els) => {
//     for (let el of els) el.remove();
// }

function displayScores () {
    // removeEls(timer, startButton, results); 
    let scoresArray = defineScoresArray(storedArray, emptyArray); 

    scoresArray.forEach(obj =>{
        let initials= obj.initials; 
        let storedScore = obj.score; 
        let results = document.createElement("p");
        results.innerText = `${initials}: ${storedScore}`; 
        scoreCard.appendChild(results)

    })
}

function viewScores() {
    viewScores.addEventListener("click", function (event){
        event.preventDefault();
        removeEls(timer, startButton); 
        displayScores(); 
        removeEls(viewScores); 
        clearScores(); 
        goBack();
    })
}

function clearScores() {
    let clearBtn = document.createElement("input");
    clearBtn.setAttribute("type", "button")
    clearBtn.setAttribute("value", "Clear Scores");
    clearBtn.addEventListener("click", function(event){
        event.preventDefault();
        removeEls(scoreCard); 
        window.localStorage.removeItem("highScores")
    })
    scoreCard.append(clearBtn)
}

function goBack() {
    let backBtn = document.createElement("input");
    backBtn.setAttribute("type", "button")
    backBtn.setAttribute("value", "Go Back")
    backBtn.addEventListener("click", function(event){
        event.preventDefault();
        window.location.reload();
    })

    buttons
}