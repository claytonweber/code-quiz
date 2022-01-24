var startButton =  document.querySelector(".start-button");
var timerEl = document.querySelector(".timer-count");
var question = document.querySelector(".question");
var answerBank = document.querySelector(".answer-bank");

var op1 = document.querySelector(".op1");
var op2 = document.querySelector(".op2");
var op3 = document.querySelector(".op3");
var op4 = document.querySelector(".op4");



var questions = [
  "Do you like JavaScript",
  "Who is hog kisser",
  "Do ya love me",
  "What is jQuery?"
];

var answers = [
  [
    "a. Yes I love JavaScript",
    "b. No I hate JavaScript",
    "c. What is JavaScript",
    "d. Who is JavaScript?"
  ]

]

let questionNumber = 0;

//when i press start a timer begins

startButton.addEventListener("click", startGame);

function startGame() {
  askQuestion();
  answerBank.style.display = "block";
  startButton.disabled = true;
  startButton.style.display = "none";
}



function askQuestion() {
  //if there are questions left
  if(questions.length > questionNumber) {
    question.append(questions[questionNumber]);

    //populate an answer based on the option number
    op1.append(answers[questionNumber][0]);
    op2.append(answers[questionNumber][1]);
    op3.append(answers[questionNumber][2]);
    op4.append(answers[questionNumber][3]);
    //increment question number so it can move to the next question
    questionNumber++;
  } 
}
