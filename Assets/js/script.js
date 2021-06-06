var startButton = document.getElementById("startButton");
var button = document.getElementById("button");
var timer = document.getElementById("timer");
var questionCard = document.getElementById("questionCard");
var h2quest = document.getElementById("h2quest");
var answerList = document.getElementById("answerList");
var firstAnswer = document.getElementById("firstAnswer");
var secondAnswer = document.getElementById("secondAnswer");
var thirdAnswer = document.getElementById("thirdAnswer");
var fourthAnswer = document.getElementById("fourthAnswer");
var alert = document.getElementById("alert");
var finalScore = document.getElementById("finalScore");
var finalScoreForm = document.getElementById("finalScoreForm");
var userFinal = document.getElementById("userFinal"); 
var initialsInput = document.getElementById("initialsInput");
var formSubmission = document.getElementById("formSubmission");
var header = document.getElementById("header");

var questionCount = 0; 
var answerCount = 0; 
var correctCount = 0;

var questionArray = [
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        
        
        firstAnswer: {
            content: "commas", 
            correct: false
        }, 

        secondAnswer: {
            content: "curly brackets",
            correct: false
        },

        thirdAnswer: {
            content: "quotes", 
            correct: true
        },

        fourthAnswer: {
            content: "parentheses", 
            correct: false
        },
    
    
        
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        
        firstAnswer: {
            content: "Javascript", 
            correct: false
        }, 

        secondAnswer: {
            content: "terminal/bash",
            correct: false
        },

        thirdAnswer: {
            content: "for loops", 
            correct: false
        },

        fourthAnswer: {
            content: "console.log", 
            correct: true
        },
    
    
        
    },
    {
        question: "Commonly used data types DO NOT include:",
        
        firstAnswer: {
            content: "strings", 
            correct: false
        }, 

        secondAnswer: {
            content: "booleans",
            correct: false
        },

        thirdAnswer: {
            content: "alerts", 
            correct: true
        },

        fourthAnswer: {
            content: "numbers", 
            correct: false
        },
    
    
        },
    {
        question: "The condition in an if/else statement is enclosed within ____",
        
        firstAnswer: {
            content: "quotes", 
            correct: false
        }, 

        secondAnswer: {
            content: "parentheses",
            correct: true
        },

        thirdAnswer: {
            content: "curly brackets", 
            correct: false
        },

        fourthAnswer: {
            content: "square brackets", 
            correct: false
        },
    
    
        },
    {
        question: "Arrays in JavaScript can be used to store:",
        
        firstAnswer: {
            content: "numbers and strings", 
            correct: false
        }, 

        secondAnswer: {
            content: "booleans",
            correct: false
        },

        thirdAnswer: {
            content: "other arrays", 
            correct: false
        },

        fourthAnswer: {
            content: "all of the above", 
            correct: true
        },
    
    
        },
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
       
        firstAnswer: {
            content: "commas", 
            correct: false
        }, 

        secondAnswer: {
            content: "curly brackets",
            correct: true
        },

        thirdAnswer: {
            content: "quotes", 
            correct: false
        },

        fourthAnswer: {
            content: "parentheses", 
            correct: false
        },
    
    
        },
    ]

var timeRemaining = 25; 

function countDown(){
    var timeInterval = setInterval(function (){
        timeRemaining -- 
        timer.textContent = `${timeRemaining} seconds remaining`
        if (timeRemaining <= 0) {
            clearInterval(timeInterval)
            timer.textContent = "You lost, loser"
            endGame();
        } else if (answerCount == questionArray.length){
            clearInterval(timeInterval)
            timer.textContent = " ";
            endGame();
        }
        }, 1000)
    }

    function pageLoad() {
        questionCard.style.display = "none"; 
        alert.style.display = "none";
        finalScore.style.display = "none";
    }; 

    startButton.addEventListener("click", () => {
        header.style.display = "none";
        startGame();
        countDown();
    } 
    );

    function startGame() {
        questionCard.style.display = "block"
        loadQuestion()
    }

    pageLoad();

    function loadQuestion(){
        h2quest.innerHTML = `${questionArray[questionCount].question}`
        firstAnswer.innerHTML = `${questionArray[questionCount].firstAnswer.content}`
        firstAnswer.setAttribute(
            "data correct", 
            questionArray[questionCount].firstAnswer.correct
        )
        secondAnswer.innerHTML = `${questionArray[questionCount].secondAnswer.content}`
        secondAnswer.setAttribute(
            "data correct", 
            questionArray[questionCount].secondAnswer.correct
        )
        thirdAnswer.innerHTML = `${questionArray[questionCount].thirdAnswer.content}`

        thirdAnswer.setAttribute(
            "data correct", 
            questionArray[questionCount].thirdAnswer.correct
        )
        fourthAnswer.innerHTML = `${questionArray[questionCount].fourthAnswer.content}`
        fourthAnswer.setAttribute(
            "data correct", 
            questionArray[questionCount].fourthAnswer.correct
        )

        questionCount += 1
    };

    function removeAlert() {
        alert.style.display = "none"
    }; 

    function answerAlert(truefalse) {
        if (truefalse) {
            alert.style.display = "block"
            alert.setAttribute("class", "right")
            alert.textContent = "CORRECT!"
        }else if (!truefalse) {
            alert.style.display = "block"
            alert.setAttribute("class", "wrong")
            alert.textContent= "WRONG!"
        }
    };

    function answerHandler(event) {
        var answerChosen = event.target.dataset.correct
        if (answerChosen === "true") {
            correctCount++
            answerCount +=1 
            answerAlert(true)
            setTimeout(removeAlert, 500)

            if (questionCount != questionArray.length) {
                loadQuestion()
            } else {
                setTimeout(endGame, 500)
            }
        }else if (answerChosen === "false") {
            correctCount --
            timeRemaining -= 2
            answerCount += 1
            answerAlert(false)
            setTimeout(removeAlert, 500)

            if (questionCount != questionArray.length) {
                loadQuestion()
            }else {
                setTimeout(endGame, 500)
            }
        }
    };

    function endGame() {
        questionCard.style.display = "none";
        alert.style.display = "none";
        finalScore.style.display = "none";
        userFinal.innerHTML = `Your score is ${correctCount}`
    }