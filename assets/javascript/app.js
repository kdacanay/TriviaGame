//pseudocode:
//display screen with maintitle displayed, brief description and start button only
//user clicks start button, timer begins from 20 seconds and decrements
//user must make selection by end of 20 seconds or question is automatically wrong
//if user selects correct answer, popup shows alerting user of correct choice, and funfact, correct answer count goes up
//if user selects incorrectly or does not make selection within 20 seconds, user is alerted to incorrect guess, incorrect answer count goes up
//message screen goes away, a few seconds pass then next randomly chosen question shows 
//process repeats until all 10 questions have been answered


    var questionsArray = [
        
        {question: "Who was the 2008 World Series MVP?",
        choicesArray: ["Ryan Howard", "Brad Lidge", "Evan Longoria", "Cole Hamels"],
        finalAnswer: 3,
        image: "assets/images/colehamels.jpg",
        funFact: "Fun Fact! Cole has been married to reality TV star Heidi Strobel from Survivor since 2006."
        },
        {
             question: "How many seats are in Citizens Bank Park?",
             choicesArray: ["43035", "69176", "19500", "53035"],
             finalAnswer: 0,
             image: "",
             funFact: "On average, there are 22 seats in each row at Citizens Bank Park.",
        },
         {
             question: "Who holds the record for most touchdowns scored for the Eagles?",
             choicesArray: ["Tommy Mcdonald", "Lesean McCoy", "Brian Westbrook", "Wilbert Montgomery"],
             finalAnswer: 2,
             image: "",
             funFact: "Brian Westbrook spent his final NFL year playing for the 49ers in 2010, totalling only 150 yards. ",
         },
        ];

    //imageArray corresponds with each question
    var imageArray = ['colehamels', 'citizensbankpark','brianwestbrook'];
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var seconds;
    var time;
    var answered;
    var userSelect;

    var messages = {
        correct: "Correct!",
        incorrect: "Incorrect!",
        outOfTime: "Time's up!",
        finished: "Here's how you did:"
    }
    
    $("#start-button").on("click", function() {
        $("#start-button").hide();
        newGame();
    });
    
    $("#reset-button").on("click", function() {
        $("#reset-button").hide();
        newGame();
    });
    
    
    function newGame() {
        $("#last-message").empty();
        $("#correct-total").empty();
        $("#incorrect-total").empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        newQuestion();
    }

    function newQuestion () {
        $("#message").empty();
        $("#correct-answer").empty();
        $("#image").empty();
        answered = true;

        //sets up new questions
        $("#current-question").html("Question #" + (currentQuestion+1) + questionsArray.length);
        $(".question").html("<h2>" + questionsArray[currentQuestion].question + "</h2>");
        for (var i = 0; i < 4; i++) {
            var choices = $("div");
            choices.text(questionsArray[currentQuestion].choicesArray[i]);
            choices.attr({"data-index": i });
            choices.addClass("thisChoice");
            $(".answer-choices").append(choices);
        }
        countdown();
        //clicking an answer will pause the time 
        $(".thisChoice").on("click", function() {
            userSelect = $(this).data("index");
            clearInterval(time);
            answers();
        });
    }

    function countdown() {
        seconds = 10;
        $("#timer-counter").html("<h3> Time Remaining: " + seconds + "</h3>");
        answered = true;
        //sets timer to decrement
        time = setInterval(showCountdown, 1000);
    }
    function showCountdown () {
        seconds--;
        $("timer-counter").html("<h3> Time Remaining: " + seconds + "</h3>");
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answers();
        }
    }

    function answers () {
        $("#current-question").empty();
        $(".thisChoice").empty();
        $(".question").empty();

        var rightAnswerText = questionsArray[currentQuestion].choicesArray[questionsArray[currentQuestion].finalAnswer];
        var rightAnswerIndex = questionsArray[currentQuestion].finalAnswer;
        $("#image").html('<img src = "assets/images/' + imageArray[currentQuestion] + '.jpg"/>');
        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $("#message").html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correct-answer").html("The correct answer was: " + rightAnswerText);
        } else {
            $("#message").html(messages.outOfTime);
            $("#correct-answer").html("The correct answer was: " + rightAnswerText);
            answered = true;
        }

        if(currentQuestion == (questionsArray.length-1)) {
            setTimeout(scoreBoard, 3000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 3000);
        }
    }

    function scoreBoard () {
        $("#timer-counter").empty();
        $("message").empty();
        $("answer-choices").empty();
        $("#image").empty();

        $("#last-message").html(messages.finished);
        $("#correct-total").html("Correct Answers: " + correctAnswer);
        $("#incorrect-total").html("Incorrect Answers: " + incorrectAnswer);
        $("reset-button").addClass("reset");
        $("reset-button").show();
        $("reset-button").html("Play Again?");
    }

