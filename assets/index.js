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
// var questions = [
//   "Do you like JavaScript",
//   "Who is hog kisser",
//   "Do ya love me",
//   "What is jQuery?"
// ];

// var answers = [
//   [
//     "a. Yes I love JavaScript",
//     "b. No I hate JavaScript",
//     "c. What is JavaScript",
//     "d. Who is JavaScript?"
//   ]

// ]
highScores();
var questions = [
  {
    question: "Do you like JavaScript?",
    op1: "Yes",
    op2: "No",
    op3: "What is JavaScript",
    op4: "Who is JavaScript",
    answer: op1
  },
  {
    question: "Do ysssssou like JavaScript?",
    op1: "YeSneks",
    op2: "No",
    op3: "What is JasddasavaScript",
    op4: "Who iddddddds JavaScript",
    answer: op1
  },
  {
    question: "Do you aaaaalike JavaScript?",
    op1: "Yeqqqqqqqs",
    op2: "No",
    op3: "Whaddddadwwwrrrt is JavaScript",
    op4: "Who is JavaScript",
    answer: op1,
  },
  {
      question: "Do you aaaaalikdddddde JavaScript?",
      op1: "Yeqqqqqqqs",
      op2: "No",
      op3: "Whaddddadwwwrrrt is JavaScript",
      op4: "Who is JavaSsadsadcript",
      answer: op1
  }
  
]


let questionNumber = 0;
//when i press start a timer begins

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
    //populate an answer based on the option number
    // op1.append(answers[questionNumber][0]);
    // op2.append(answers[questionNumber][1]);
    // op3.append(answers[questionNumber][2]);
    // op4.append(answers[questionNumber][3]);
    //increment question number so it can move to the next question
    questionNumber++;
    // console.log("question number: " + questionNumber);
  } else {
    displayResults();

  }
}

  options.forEach(option => {
    option.addEventListener("click", e => {
      // console.log("does this shit work")
      var selectedOption = e.target;
      console.log(selectedOption)
      if(questions.length > questionNumber) {
      
        if(selectedOption === questions[questionNumber].answer) {
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