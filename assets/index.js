var startButton =  document.querySelector(".start-button");
var clearButton = document.querySelector(".clear-highscores");
var timerEl = document.querySelector(".timer");
var question = document.querySelector(".question");
var answerBank = document.querySelector(".answer-bank");
var options = document.querySelectorAll(".option");
var interface = document.querySelector("#interface");
var submitBtn = document.querySelector(".submit")
var results = document.querySelector(".results");
var finalScore = document.querySelector(".final-score");
var highscoreName =  document.querySelector("#highscore-name");
var highscoresList = document.querySelector(".highscores-list");
var op1 = document.querySelector(".op1");
var op2 = document.querySelector(".op2");
var op3 = document.querySelector(".op3");
var op4 = document.querySelector(".op4");

var correct = document.querySelector(".correct");

let timerCount = 60;
let score = 0;

highScores();
var questions = [
  {
    question: "What is the proper syntax for logging information to the console?",
    op1: "console.log",
    op2: "console.table",
    op3: "log console",
    op4: "console;log",
    answer: op1
  },
  {
    question: "What is JavaScript?",
    op1: "It makes websites pretty.",
    op2: "It allows users to interact with websites.",
    op3: "It is the structure of a website.",
    op4: "It is where you can host websites.",
    answer: op2
  },
  {
    question: "Which HTML element does JavaScript code go inside?",
    op1: "<java>",
    op2: "<code>",
    op3: "<js>",
    op4: "<script>",
    answer: op4,
  },
  {
    question: "Which is a correct for loop?",
    op1: "for i = 5 then",
    op2: "i++",
    op3: "for (i=0; i <= 5; i++)",
    op4: "for (i++)",
    answer: op3
  }
  
]


let questionNumber = 0;
//when i press srtart a timer begins

startButton.addEventListener("click", startGame);
clearButton.addEventListener("click", clearHighScores);
function startGame() {
  askQuestion();
  answerBank.style.display = "block";
  startButton.disabled = true;
  startButton.style.display = "none";
  timerEl.style.color = "black";
  startTimer();
  timerEl.textContent = `${timerCount} seconds remaining`;
}



function askQuestion() {
  //if there are questions left
  if(questions.length > questionNumber) {
    question.innerHTML = questions[questionNumber].question;

    op1.innerText = questions[questionNumber].op1;
    op2.innerText = questions[questionNumber].op2;
    op3.innerText = questions[questionNumber].op3;
    op4.innerText = questions[questionNumber].op4;

    questionNumber++;
  } else {
    displayResults();

  }
}

  options.forEach(option => {
    option.addEventListener("click", e => {
      var selectedOption = e.target;
      console.log(selectedOption)
      if(questions.length > questionNumber) {
      
        if(selectedOption = questions[questionNumber].answer) {
          console.log("correct!");
          correct.innerHTML = "Correct!";
          askQuestion();
        } else {
          console.log("false!");
          correct.innerHTML = "False";
          timerCount -= 10;

          askQuestion();
        }
      } else {
        displayResults();
      }
    })
  
  })

function checkAnswer() {

}

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = `${timerCount} seconds remaining`;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (questionNumber > questions[questionNumber] && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        displayResults();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      displayResults();
    }
  }, 1000);
}


function displayResults() {
  interface.style.display = "none";
  results.style.display = "block";
  finalScore.innerHTML = `final score: ${timerCount}`
  submitBtn.onclick = saveHighScore;

}

function saveHighScore() {
  var hsName = highscoreName.value;

 
  if (hsName !== "") {
    //get saved scores or create empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

   
    var newScore = {
      score: timerCount,
      name: hsName
    };

    // save
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    highScores();
  }
}

function highScores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  console.log(highscores);
  highscores.forEach(function(score) {
    var liTag = document.createElement("li");
    liTag.textContent = "Name: " + score.name + " |   " + score.score;

    highscoresList.appendChild(liTag);
  })

}


function clearHighScores() {
  //requires reload
  window.localStorage.removeItem("highscores");
}