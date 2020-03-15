//pseudocode:
//display screen with maintitle displayed, brief description and start button only
//user clicks start button, timer begins from 20 seconds and decrements
//user must make selection by end of 20 seconds or question is automatically wrong
//if user selects correct answer, popup shows alerting user of correct choice, and funfact, correct answer count goes up
//if user selects incorrectly or does not make selection within 20 seconds, user is alerted to incorrect guess, incorrect answer count goes up
//message screen goes away, a few seconds pass then next randomly chosen question shows 
//process repeats until all 10 questions have been answered
$(document).ready(function () {
    //questions, questions, questions
    var questionsArray = [

        {
            question: "Who was the 2008 World Series MVP?",
            choicesArray: ["A. Ryan Howard", "B. Brad Lidge", "C. Evan Longoria", "D. Cole Hamels"],
            finalAnswer: 3,
            image: "assets/images/colehamels.jpg",
            funFact: "Cole Hamels is married to reality TV star Heidi Strobel from Survivor since 2006.  I met them once at an Audi dealership.  Nice people.",
        },
        {
            question: "How many seats are in Citizens Bank Park?",
            choicesArray: ["A. 43035", "B. 69176", "C. 19500", "D. 53035"],
            finalAnswer: 0,
            image: "assets/images/citizensbankpark.jpg",
            funFact: "On average, there are 22 seats in each row at Citizens Bank Park.  They also have dollar-hotdog-night every once in awhile.  I love hot dogs.",
        },
        {
            question: "Who holds the record for most touchdowns scored for the Eagles?",
            choicesArray: ["A. Tommy Mcdonald", "B. Lesean McCoy", "C. Brian Westbrook", "D. Wilbert Montgomery"],
            finalAnswer: 2,
            image: "assets/images/brianwestbrook.jpg",
            funFact: "Brian Westbrook spent his final NFL year playing for the 49ers in 2010, totaling only 150 yards. I once liked the 49ers. Once. I was 2 years old and didn't know right from wrong.",
        },
        {
            question: "Who is the Philadelphia Flyers All-Time Leading Goal Scorer?",
            choicesArray: ["A. Bobby Clarke", "B. Eric Lindros", "C. Bill Barber", "D. Tim Kerr"],
            finalAnswer: 2,
            image: "assets/images/billbarber.jpg",
            funFact: "With 420 career goals and a total of 883 points, Barber trails Bobby Clarke for All-Time Leading Point Scorer, who has 1210 career points. They also had wonderful mullets when they played.",
        },
        {
            question: "What year did the Eagles join the NFL?",
            choicesArray: ["A. 1945", "B. 1933", "C. 1960", "D. 1930"],
            finalAnswer: 1,
            image: "assets/images/1933eagles.jpg",
            funFact: "The Eagles were an expansion team in 1933, and took the slot of the Frankford Yellow Jackets, a team that folded in 1931. I don't care what you say, those baby-blue/yellow jerseys were awful.", 
        },

    ];

    //list of variables to use
    var currentQuestion;
    var correctAnswer;
    var incorrectAnswer;
    var seconds;
    var time;
    var answered;
    var userSelect;
    var questionCount = questionsArray.length;

    var messages = {
        correct: "Nice!",
        incorrect: "Wrong!",
        outOfTime: "Time's up!",
        finished: "Here's how you did:"
    }
    $("#main-game-section").hide();

    $("#start-button").on("click", function () {
        $("#start-button").hide();
        $("#reset-button").hide();
        newGame();
    });

    $("#reset-button").on("click", function () {
        $("#reset-button").hide();
        newGame();
    });


    function newGame() {
        $("#main-game-section").show();
        $("#last-message").empty();
        $("#correct-total").empty();
        $("#incorrect-total").empty();
        $("#image").hide();
        $("#fun-fact").hide();
        
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        newQuestion();
    }

    function newQuestion() {
        $("#message").empty();
        $("#correct-answer").empty();
        $("#image").hide();
        $("#fun-fact").hide();
        $("#timer-counter").show();
        answered = true;

        //sets up new questions
        $("#current-question").html("Question " + (currentQuestion + 1) + " of " + questionsArray.length);
        $(".question").html(questionsArray[currentQuestion].question);



        for (var i = 0; i < 4; i++) {
            var choices = $("<div>");
            choices.text(questionsArray[currentQuestion].choicesArray[i]);
            choices.attr({"data-index": i});
            choices.addClass("thisChoice");
            $(".answer-choices").append(choices);
        }
        countdown();
        //clicking an answer will pause the time 
        $(".thisChoice").on("click", function () {
            userSelect = $(this).data("index");
            clearInterval(time);
            $("#timer-counter").hide();
            answers();
        });
    }

    function countdown() {
        seconds = 15;
        $("#timer-counter").html(":" + seconds);
        answered = true;
        time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
        seconds--;
        if (seconds < 15) {
            $("#timer-counter").html(":" + seconds);
        } else {
            $("#timer-counter").html(":" + seconds);
        }
        if (seconds < 1) {
            clearInterval(time);
            answered = false;
            answers();
        }
    }

    function answers() {
        $("#current-question").empty();
        $(".thisChoice").empty();
        $(".question").empty();
        $("#image").show();
        $("#fun-fact").show();


        var rightAnswerText = questionsArray[currentQuestion].choicesArray[questionsArray[currentQuestion].finalAnswer];
        var rightAnswerIndex = questionsArray[currentQuestion].finalAnswer;

        //add image to each question
        var imageLink = questionsArray[currentQuestion].image;
        var newImage = $("<img>");
        newImage.attr("src", imageLink);
        newImage.addClass("factImage");
        $("#image").html(newImage);


        var funFactLink = questionsArray[currentQuestion].funFact;
        var factCaption = $("<div>");
        factCaption.html(`${funFactLink}`);
        factCaption.addClass("imageCaption");
        $("#fun-fact").html(factCaption);





        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $("#message").html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correct-answer").html("The correct answer was: " + rightAnswerText);
        } else {
            incorrectAnswer++;
            $("#message").html(messages.outOfTime);
            $("#correct-answer").html("The correct answer was: " + rightAnswerText);
            answered = true;
        }

        if ((correctAnswer + incorrectAnswer) == (questionCount)) {
            setTimeout(scoreBoard, 9000);
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 9000);
        }
    }

    function scoreBoard() {      
        
        $("#timer-counter").empty();
        $("#message").empty();
        $("#correct-answer").empty();
        $("#image").hide();
        $("#fun-fact").hide();
        $("#last-message").html(messages.finished);
        $("#correct-total").html("Right: " + correctAnswer);
        $("#incorrect-total").html("Wrong: " + incorrectAnswer);
        $("#reset-button").addClass("reset");
        $("#reset-button").show();
        $("#reset-button").html("Play Again?");
    }

    scoreBoard();
});