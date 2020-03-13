$(document).ready(function() {
    var questions = [
        {
            question: "Who was the 2008 World Series MVP?",
            choices: ["Ryan Howard", "Brad Lidge", "Evan Longoria", "Cole Hamels"],
            answer:3,
            image: "assets/images/colehamels.jpg",
            funFact: "Fun Fact! Cole has been married to reality TV star Heidi Strobel from Survivor since 2006."
        },
        {
            question: "",
            choices: [],
            answer:,
            image: "",
            funFact: "",
        },
        {
            question: "",
            choices: [],
            answer:,
            image: "",
            funFact: "",
        },
        {
            question: "",
            choices: [],
            answer:,
            image: "",
            FunFact: "",
        },
        {
            question: "",
            choices: [],
            answer:,
            image: "",
            funFact: "",
        }];
        
        var correctTotal = 0;
        var wrongTotal = 0;
        var unansweredTotal = 0;
        var timer = 10;
        var intervalId;
        var playerAnswer = "";
        var timerRunning = false;
        var questionCount = questions.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];


        $("reset-button").hide();
        $("start-button").on("click", function () {
            $("start-button").hide();
            showQuestion();
            startTimer();
            for (var i = 0; i < questions.length; i++) {

            }
        }

}